import { config, database } from './dados.js'

const $ = selector => document.querySelector(selector)
const content = $('#view')
const main = $('#conteudo')
const left = $('#left-panel')
const right = $('#right-panel')
const storage = {
  get(key, temporary = false) {
    try { return (temporary ? sessionStorage : localStorage).getItem(key) } catch { return null }
  },
  set(key, value, temporary = false) {
    try { (temporary ? sessionStorage : localStorage).setItem(key, value) } catch {}
  }
}
const html = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const normal = value => String(value ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const safeUrl = (uri, protocols = ['https:', 'http:']) => {
  if (!uri) return ''
  try {
    const result = new URL(uri, location.href)
    return protocols.includes(result.protocol) ? result.href : ''
  } catch { return '' }
}

let settings, db, language, ui, defaultUi
let renderId = 0
let currentRoute = ''
let releaseView
let preserveScroll = 0
const t = key => ui?.[key] ?? defaultUi?.[key] ?? key
const local = (entry, key) => entry?.traducoes?.[language]?.[key] ?? entry?.[key]
const route = (id, entry = db.index[id]) => entry ? `#/${entry.tipo}/${id}/${entry.slug}` : '#/'
const gamesRoute = '#/jogos'
const siteRoot = new URL('../', import.meta.url)
const publicRoutes = !!document.querySelector('meta[name="portal-share-pages"]')
const publicSections = new Set(['jogos', 'bairro', 'pesquisa'])

function publicAddress(key) {
  if (!publicRoutes) return key
  const [path, query] = key.slice(2).split('?')
  if (!path) return siteRoot.pathname
  const [type, id] = path.split('/')
  const page = publicSections.has(path) ? path
    : db?.index[id]?.tipo === type ? id.toLowerCase() : ''
  return page ? new URL(`p/${page}/${query ? '?' + query : ''}`, siteRoot).href : key
}

function routeAttrs(href) {
  if (!href.startsWith('#/')) return `href="${html(href)}"`
  return `href="${html(publicAddress(href))}" data-route="${html(href)}"`
}
const officialOrigins = new Set(['https://777minigames.com.br', 'https://www.777minigames.com.br'])
const linkUrl = id => Object.hasOwn(db.links, id)
  ? safeUrl(db.links[id].url, ['https:', 'http:', 'mailto:']) : ''
const is777 = href => /^https:\/\//.test(href) && officialOrigins.has(new URL(href).origin)
const target = id => id && id === settings.catalogo ? gamesRoute : linkUrl(id) || route(id)
const name = id => local(db.index[id] ?? db.links[id], 'titulo')
const anchor = (label, href, style = '') => href
  ? `<a class="${style}" ${routeAttrs(href)}>${html(label)}</a>` : ''
const button = (label, href, style = '') => anchor(label, href, `button ${style}`)
const externalButton = (label, href, style = '') => href
  ? `<a class="button ${style}" href="${html(href)}" target="_blank" rel="noopener noreferrer">${html(label)}</a>` : ''
const known = ids => (ids ?? []).filter(id => Object.hasOwn(db.index, id))
const image = (path, alt, css = '', eager = false) => {
  const url = path ? safeUrl(db.media(path)) : new URL('../assets/ceu.webp', import.meta.url).href
  return `<img class="${css}" src="${html(url)}" alt="${html(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`
}

function card(item) {
  const title = local(item, 'titulo')
  const art = item.imagens?.[0]
  const style = item.categorias.includes('jogo') ? 'card-art logo-art' : 'card-art'
  return `<a class="card" ${routeAttrs(route(item.id, item))}>
    ${image(art, '', style)}
    <div class="card-copy">
      ${item.rotulo ? `<span class="kicker">${html(local(item, 'rotulo'))}</span>` : ''}
      <h3>${html(title)}</h3>
      <p>${html(local(item, 'resumo'))}</p>
    </div>
  </a>`
}

async function cards(ids) {
  const items = (await Promise.all(known(ids).map(id => db.item(id).catch(() => null)))).filter(Boolean)
  return items.length ? `<div class="cards">${items.map(card).join('')}</div>` : `<p>${html(t('empty'))}</p>`
}

function sectionHead(title, more) {
  return `<div class="section-head"><h2>${html(title)}</h2>${more ? anchor(t('all'), target(more), 'text-link') : ''}</div>`
}

async function homeSection(section) {
  if (section.tipo === 'arcade' || section.tipo === 'perfil') {
    const profile = section.tipo === 'perfil'
    const item = await db.item(section.itens[0]).catch(() => null)
    if (!item) return `<section class="section">${sectionHead(section.titulo)}<p>${html(t('empty'))}</p>
      ${profile ? '' : `<div class="actions">${button(t('catalog'),gamesRoute,'gold')}</div>`}</section>`
    return `<section class="section">${sectionHead(local(section, 'titulo'))}
      <div class="${profile ? 'profile-strip' : 'arcade'}">
        ${profile ? image(item.imagens?.[0], '') : ''}
        <div class="text">${profile ? '' : `<span class="kicker">${html(item.rotulo)}</span>`}
          <h3>${html(local(item, 'titulo'))}</h3><p>${html(local(item, 'resumo'))}</p>
        </div>
        <div class="actions">${button(profile ? t('about') : t('viewGame'), route(item.id))}
          ${profile ? '' : button(t('catalog'), gamesRoute, 'gold')}
          ${section.mais && (profile || section.mais !== settings.catalogo) ? button(name(section.mais),target(section.mais)) : ''}
        </div>
      </div></section>`
  }
  return `<section class="section">${sectionHead(local(section, 'titulo'), section.mais)}${await cards(section.itens)}</section>`
}

async function home() {
  const data = await db.get('home.json')
  const sections = await Promise.all(local(data, 'secoes').map(homeSection))
  const [first, ...rest] = local(data, 'titulo').split(' ')
  return `<div class="shell home-shell">
    <section class="hero"><div class="hero-copy">
      <p class="kicker">${html(t('professional'))}</p>
      <h1><span>${html(first)}</span><span>${html(rest.join(' '))}</span></h1>
      <h2>${html(local(data, 'destaque'))}</h2>
      <p>${html(local(data, 'subtitulo'))}</p>
      <div class="actions">${button(t('enter'), '#/bairro', 'gold')}${button(t('explore'), route('COL001'), 'subtle')}</div>
    </div></section>
    ${sections.join('')}
  </div>`
}

function heading(title, subtitle = '', kicker = '', art = '') {
  return `<header class="page-head ${art ? 'detail-top' : ''}"><div>
    ${kicker ? `<p class="kicker">${html(kicker)}</p>` : ''}
    <h1>${html(title)}</h1>${subtitle ? `<p class="lead">${html(subtitle)}</p>` : ''}
  </div>${art ? image(art, '', '', true) : ''}</header>`
}

function mediaSection(section) {
  const assets = section.imagens ?? section.itens ?? []
  if (!assets.length) return `<p>${html(t('empty'))}</p>`
  if (section.tipo === 'galeria') return `<div class="gallery">${assets.map((path, index) =>
    `<button type="button" data-image="${html(safeUrl(db.media(path)))}" aria-label="${html(section.titulo)} ${index + 1}">${image(path, '')}</button>`).join('')}</div>`
  if (section.tipo === 'audio') return assets.map(track =>
    `<button class="button" data-track="${html(track)}">${html(name(track) ?? track)}</button>`).join('')
  if (section.tipo === 'video') return assets.map(asset => asset.arquivo
    ? `<video controls preload="none" src="${html(safeUrl(db.media(asset.arquivo)))}" ${asset.poster ? `poster="${html(safeUrl(db.media(asset.poster)))}"` : ''}></video>`
    : button(t('unavailable'), '') || `<p>${html(t('unavailable'))}</p>`).join('')
  return assets.map(asset => asset.arquivo
    ? `<a class="button" download href="${html(safeUrl(db.media(asset.arquivo)))}">${html(asset.titulo)}</a>`
    : `<button class="button" disabled>${html(asset.titulo ?? t('unavailable'))}</button>`).join('')
}

function detailSection(section) {
  const renderers = {
    texto: () => String(local(section, 'texto') ?? '').split(/\n\n+/).filter(Boolean).map(p => `<p>${html(p)}</p>`).join(''),
    galeria: () => mediaSection(section),
    video: () => mediaSection(section),
    audio: () => mediaSection(section),
    downloads: () => mediaSection(section),
    links: () => links(section.itens)
  }
  const body = renderers[section.tipo]?.()
  return body == null ? '' : `<section class="detail-section"><h2>${html(local(section, 'titulo'))}</h2>${body || `<p>${html(t('empty'))}</p>`}</section>`
}

function links(ids) {
  return `<div class="actions">${(ids ?? []).filter(id => Object.hasOwn(db.links, id) && db.links[id].ativo).map((id, index) =>
    (is777(target(id)) ? externalButton : button)(name(id), target(id), index === 0 ? 'gold' : '')).join('')}</div>`
}
function trail(parent, title) {
  return `<nav class="breadcrumb" aria-label="${html(t('directions'))}">${anchor(t('home'), '#/')} / ${anchor(parent.label, parent.href)} / <span aria-current="page">${html(title)}</span></nav>`
}

function sequenceNav(id, context) {
  const list = context?.ids ?? []
  const index = list.indexOf(id)
  if (index < 0 || list.length < 2) return ''
  const prev = list[index - 1]
  const next = list[index + 1]
  return `<nav class="page-nav" aria-label="${html(t('directions'))}">
    <span>${prev ? button(`${t('left')} · ${name(prev)}`, route(prev)) : ''}</span>
    <span>${next ? button(`${t('right')} · ${name(next)}`, route(next)) : ''}</span>
  </nav>`
}
function tags(item) {
  const ids = Object.keys(db.index).filter(id => db.index[id].tipo === 'tag' && item.tags?.includes(db.index[id].slug))
  return ids.length ? `<div class="chip-list">${ids.map(id => anchor(name(id), route(id), 'chip')).join('')}</div>` : ''
}

async function itemPage(item) {
  const title = local(item, 'titulo')
  const group = item.itens !== undefined
  const context = history.state?.context
  const parent = context?.origin
    ? { href: context.origin, label: context.label }
    : item.tipo === 'projeto'
      ? item.categorias.includes('cultura') ? { href: route('CAT002'), label: t('culture') } : { href: route('COL001'), label: t('projects') }
      : null
  const sections = (local(item, 'secoes') ?? []).map(detailSection).join('')
  const related = known(item.relacionados)
  return `<div class="shell">
    ${parent && item.tipo === 'projeto' ? trail(parent, title) : ''}
    ${heading(title, local(item, 'resumo'), local(item, 'rotulo'), item.imagens?.[0])}
    ${item.estado === 'em-desenvolvimento' ? `<p class="kicker">${html(t('development'))}</p>` : ''}
    ${item.links?.length ? links(item.links) : ''}
    ${item.destino ? `<div class="actions">${button(t('open'), target(item.destino), 'gold')}${button(t('bairro'), '#/bairro')}</div>` : ''}
    ${tags(item)}${sections}
    ${group ? await cards(item.itens) : ''}
    ${related.length ? `<section class="section related-inline">${sectionHead(t('related'))}${await cards(related)}</section>` : ''}
    ${sequenceNav(item.id, context)}
  </div>`
}

function search(params) {
  const query = params.get('q') ?? ''
  const cat = params.get('categoria') ?? ''
  const order = params.get('ordem') === 'titulo' ? 'titulo' : 'relevancia'
  const indices = Object.entries(db.index)
  const options = Array.from(new Set(indices.flatMap(([, item]) => item.categorias))).sort()
  const words = normal(query.trim()).split(/\s+/).filter(Boolean)
  const scored = indices.filter(([, item]) => !cat || item.categorias.includes(cat)).map(([id, item]) => {
    const title = normal(local(item, 'titulo'))
    const text = normal([local(item, 'resumo'), ...item.tags].join(' '))
    const score = words.map(word => title.includes(word) ? 3 : text.includes(word) ? 1 : 0)
    return [id, score.every(Boolean) ? score.reduce((a, b) => a + b, 0) : -1]
  }).filter(([, points]) => points >= 0)
  scored.sort(([a, x], [b, y]) => order === 'titulo' ? name(a).localeCompare(name(b), language) : y - x)
  const ids = scored.map(([id]) => id)
  const option = (value, label, selection) => `<option value="${html(value)}" ${selection === value ? 'selected' : ''}>${html(label)}</option>`
  const categories = { jogo: t('games'), cultura: t('culture'), perfil: t('about'), musica: t('music'), bairro: t('bairro') }
  return { ids, markup: `<div class="shell">${heading(t('search'))}
    <form class="search-form" id="search-form" role="search">
      <label class="search-field">${html(t('search'))}<input class="field" name="q" type="search" value="${html(query)}" placeholder="${html(t('searchPlaceholder'))}"></label>
      <label>${html(t('filter'))}<select class="field" name="categoria">${option('', t('any'), cat)}${options.map(o => option(o, categories[o] ?? o, cat)).join('')}</select></label>
      <label>${html(t('order'))}<select class="field" name="ordem">${option('relevancia', t('relevance'), order)}${option('titulo', t('alphabetical'), order)}</select></label>
      <button class="button gold">${html(t('search'))}</button>
    </form>
    <p class="result-count">${html(t('result'))} · ${ids.length}</p>
    ${ids.length ? '<div id="results"></div>' : `<p>${html(t('noResult'))}</p>`}
  </div>` }
}

function panels(item) {
  const context = history.state?.context
  const items = known(item?.itens ?? context?.ids?.slice(0, 6))
  const related = known(item?.relacionados)
  const fill = (element, title, ids) => {
    element.hidden = !ids.length
    element.innerHTML = ids.length ? `<h2>${html(title)}</h2><ul>${ids.map(id => `<li>${anchor(name(id), route(id))}</li>`).join('')}</ul>` : ''
  }
  fill(left, t('directions'), items)
  fill(right, t('related'), related)
}

const catalogCopy = {
  pt: {
    title:'Catálogo de jogos', description:'Explore os jogos do 777 Minigames aqui. Para entrar na sua conta, abra o 777 em outra aba.',
    back:'Voltar ao Perfil', signIn:'Entrar no 777', newTab:'nova aba',
    reset:'Reabrir catálogo', fallback:'Se o catálogo não aparecer, abra no 777',
    frame:'Catálogo público de jogos do 777 Minigames'
  },
  en: {
    title:'Game catalogue', description:'Browse the 777 Minigames catalogue here. To sign in, open 777 in a new tab.',
    back:'Back to the portal', signIn:'Sign in to 777', newTab:'new tab',
    reset:'Reopen catalogue', fallback:'If the catalogue is unavailable, open it on 777',
    frame:'777 Minigames public game catalogue'
  }
}
function catalogPage() {
  const copy = language?.startsWith('en') ? catalogCopy.en : catalogCopy.pt
  const configuredUrl = safeUrl(linkUrl(settings.catalogo), ['https:'])
  const catalogUrl = configuredUrl || 'https://777minigames.com.br/games'
  const loginUrl = 'https://777minigames.com.br/auth'
  const previous = history.state?.catalogBack
  const back = typeof previous === 'string' && previous.startsWith('#/') ? previous : '#/'
  return `<div class="shell catalog-page">
    ${heading(copy.title,copy.description)}
    <div class="actions catalog-toolbar">
      ${button(copy.back,back)}
      ${externalButton(`${copy.signIn} · ${copy.newTab}`,loginUrl,'gold')}
      ${is777(catalogUrl) ? `<button class="button" type="button" data-reset-catalog>${html(copy.reset)}</button>` : ''}
    </div>
    ${is777(catalogUrl) ? `<iframe class="catalog-frame" src="${html(catalogUrl)}" title="${html(copy.frame)}"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerpolicy="strict-origin-when-cross-origin"></iframe>` : ''}
    <div class="actions">${externalButton(`${copy.fallback} · ${copy.newTab}`,catalogUrl,'subtle')}</div>
  </div>`
}

function chrome(routeName) {
  $('#menu').innerHTML = settings.menu.map(entry => {
    const href = entry.rotulo === 'games' ? gamesRoute : entry.rota ?? target(entry.id)
    const current = href.startsWith('#') && href === routeName
    return `<a ${routeAttrs(href)}${current ? ' aria-current="page"' : ''}>${html(t(entry.rotulo))}</a>`
  }).join('')
  $('#social').innerHTML = settings.redes.filter(id => id !== 'LNK006').map(id => anchor(name(id), target(id))).join('')
  $('#top-map').textContent = t('bairro')
  $('#search-button').setAttribute('aria-label', t('search'))
  $('#prefs-button').setAttribute('aria-label', t('preferences'))
  $('#skip').textContent = t('skip')
  $('#player-label').textContent = t('music')
  updatePlayer()
}

function routeKey() {
  if (location.hash.startsWith('#/')) return location.hash
  if (!publicRoutes || !location.pathname.startsWith(siteRoot.pathname)) return '#/'
  const page = /^p\/([a-z0-9]+)\/?$/i.exec(location.pathname.slice(siteRoot.pathname.length))?.[1]
  if (!page) return '#/'
  if (publicSections.has(page)) return '#/' + page + (page === 'pesquisa' ? location.search : '')
  return route(page.toUpperCase())
}

function navigate(key, state = {}) {
  history.pushState(state, '', publicAddress(key))
  if (db) render({ focus: true })
}
const scrollKey = key => `emli:scroll:${key}`
function setContext(ids, label) {
  if (!ids.length) return
  for (const link of content.querySelectorAll('a.card')) {
    if (ids.some(id => route(id) === (link.dataset.route || link.hash))) {
      link.dataset.context = JSON.stringify({ ids, label, origin: currentRoute })
    }
  }
}

async function render({ focus = false } = {}) {
  const key = routeKey()
  const id = ++renderId
  releaseView?.()
  releaseView = undefined
  if (currentRoute) storage.set(scrollKey(currentRoute), main.scrollTop, true)
  currentRoute = key
  preserveScroll = Number(storage.get(scrollKey(key), true)) || 0
  const [raw, query] = key.slice(2).split('?')
  const [type, itemId] = raw.split('/')
  let markup, item, results, mapModule
  chrome(key)
  content.setAttribute('aria-busy', 'true')
  try {
    if (!type) markup = await home()
    else if (key === gamesRoute) markup = catalogPage()
    else if (type === 'pesquisa') {
      results = search(new URLSearchParams(query))
      markup = results.markup
    } else if (type === 'bairro') {
      mapModule = await import('./bairro.js')
      markup = `<div class="shell">${heading(t('bairro'), t('prototype'))}<div id="bairro-app"></div></div>`
    } else {
      item = await db.item(itemId)
      if (!item || item.tipo !== type) throw new Error('Conteúdo inexistente')
      markup = await itemPage(item)
    }
    const resultsMarkup = results?.ids.length ? await cards(results.ids) : ''
    if (id !== renderId) return
    content.innerHTML = markup
    if (resultsMarkup) $('#results').innerHTML = resultsMarkup
    if (mapModule) {
      const dispose = await mapModule.mount($('#bairro-app'), { db, t, settings, html, button, target, local, storage })
      if (id !== renderId) { dispose?.(); return }
      releaseView = dispose
    }
    setContext(results?.ids ?? known(item?.itens), results ? t('search') : local(item, 'titulo'))
    panels(item)
    const title = content.querySelector('h1')?.textContent?.trim()
    document.title = !type ? 'Emli O’Mago · Bairro Mágico' : `${title || t('bairro')} · Emli O’Mago`
  } catch {
    if (id !== renderId) return
    panels()
    content.innerHTML = `<article class="shell">${heading(t('error'))}<div class="actions">${button(t('home'), '#/')}<button class="button" data-retry>${html(t('retry'))}</button></div></article>`
    document.title = `${t('error')} · Emli O’Mago`
  }
  if (id !== renderId) return
  content.setAttribute('aria-busy', 'false')
  main.scrollTop = preserveScroll
  if (focus && type === 'pesquisa') $('#search-form [name=q]')?.focus({ preventScroll: true })
  else if (focus) main.focus({ preventScroll: true })
}

const audio = $('#audio')
const seek = $('#seek')
let tracks = []
let trackIndex = 0
function updatePlayer() {
  const item = tracks[trackIndex]
  $('#track-label').textContent = item ? local(item, 'titulo') : t('noAudio')
  $('#play-track').disabled = !item
  $('#previous-track').disabled = tracks.length < 2
  $('#next-track').disabled = tracks.length < 2
  const playing = !audio.paused
  $('#play-track').textContent = playing ? '❚❚' : '▶'
  $('#play-track').setAttribute('aria-label', t(playing ? 'pause' : 'play'))
  seek.disabled = !Number.isFinite(audio.duration)
}
function chooseTrack(index) {
  if (!tracks.length) return
  trackIndex = (index + tracks.length) % tracks.length
  audio.src = safeUrl(db.media(tracks[trackIndex].arquivo))
  audio.play().catch(() => { $('#track-label').textContent = t('unavailable') })
  updatePlayer()
}
$('#play-track').onclick = () => {
  if (!audio.getAttribute('src')) chooseTrack(trackIndex)
  else if (!audio.paused) audio.pause()
  else audio.play().catch(() => { $('#track-label').textContent = t('unavailable') })
}
$('#previous-track').onclick = () => chooseTrack(trackIndex - 1)
$('#next-track').onclick = () => chooseTrack(trackIndex + 1)
audio.addEventListener('ended', () => tracks.length > 1 ? chooseTrack(trackIndex + 1) : updatePlayer())
for (const event of ['play', 'pause', 'loadedmetadata', 'timeupdate']) audio.addEventListener(event, () => {
  seek.max = Number.isFinite(audio.duration) ? audio.duration : 1
  seek.value = audio.currentTime
  updatePlayer()
})
audio.addEventListener('error', () => { $('#track-label').textContent = t('unavailable') })
seek.oninput = () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(seek.value) }

function openDialog(node, heading, body) {
  node.innerHTML = `<div class="dialog-head"><h2>${html(heading)}</h2><form method="dialog"><button class="icon" aria-label="${html(t('close'))}">✕</button></form></div>${body}`
  node.showModal()
}

async function loadLanguage(lang) {
  ui = lang === settings.idiomaPadrao ? defaultUi : await db.get(`idiomas/${lang}.json`).catch(() => defaultUi)
  language = lang
  document.documentElement.lang = lang
}
$('#prefs-button').onclick = () => {
  if (!db) return
  const options = Object.entries(settings.idiomas).map(([code, label]) =>
    `<option value="${html(code)}" ${code === language ? 'selected' : ''}>${html(label)}</option>`).join('')
  openDialog($('#preferences'), t('preferences'), `<label class="prefs-row">${html(t('language'))}<select class="field">${options}</select></label>`)
  $('#preferences select').onchange = async ({ target: select }) => {
    storage.set('emli:language', select.value)
    $('#preferences').close()
    await loadLanguage(select.value)
    await render()
  }
}
$('#search-button').onclick = () => {
  if (!db) return
  if (routeKey().startsWith('#/pesquisa')) $('#search-form [name=q]')?.focus()
  else navigate('#/pesquisa')
}
$('#skip').onclick = event => { event.preventDefault(); main.focus() }

content.addEventListener('submit', event => {
  if (event.target.id !== 'search-form') return
  event.preventDefault()
  const params = new URLSearchParams(new FormData(event.target))
  const url = `#/pesquisa?${params}`
  if (routeKey() !== url) navigate(url)
})
content.addEventListener('click', event => {
  const gallery = event.target.closest('[data-image]')
  if (gallery) openDialog($('#lightbox'), gallery.getAttribute('aria-label'), `<img src="${html(gallery.dataset.image)}" alt="">`)
  const player = event.target.closest('[data-track]')
  if (player) {
    const index = tracks.findIndex(track => track.id === player.dataset.track)
    if (index >= 0) chooseTrack(index)
  }
  if (event.target.closest('[data-reset-catalog]')) {
    const frame = content.querySelector('.catalog-frame')
    if (frame) frame.replaceWith(frame.cloneNode())
  }
  if (event.target.closest('[data-retry]')) render()
})
content.addEventListener('error', event => {
  const img = event.target
  if (img.tagName === 'IMG' && !img.dataset.fallback) {
    img.dataset.fallback = 'true'
    img.src = new URL('../assets/ceu.webp', import.meta.url).href
  }
}, true)

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-route], a[href^="#/"]')
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  const key = link.dataset.route || link.hash
  event.preventDefault()
  if (key === routeKey()) return
  const next = link.dataset.context ? JSON.parse(link.dataset.context)
    : /^#\/projeto\//.test(key) && /^#\/projeto\//.test(currentRoute) ? history.state?.context : null
  const catalogBack = key === gamesRoute && currentRoute.startsWith('#/') ? currentRoute : undefined
  navigate(key, { context: next, catalogBack })
})
window.addEventListener('hashchange', () => { if (db && currentRoute !== routeKey()) render({ focus: true }) })
window.addEventListener('popstate', () => { if (db && currentRoute !== routeKey()) render({ focus: true }) })
window.addEventListener('pagehide', () => { if (currentRoute) storage.set(scrollKey(currentRoute), main.scrollTop, true) })

try {
  settings = await config()
  db = await database(settings)
  defaultUi = await db.get(`idiomas/${settings.idiomaPadrao}.json`)
  const saved = storage.get('emli:language')
  await loadLanguage(Object.hasOwn(settings.idiomas, saved) ? saved : settings.idiomaPadrao)
  if (publicRoutes) {
    if (location.hash.startsWith('#/')) history.replaceState(history.state, '', publicAddress(routeKey()))
    for (const link of document.querySelectorAll('header a[href^="#/"]')) {
      link.dataset.route = link.hash
      link.href = publicAddress(link.hash)
    }
  }
  await render()
  db.get(settings.faixas).then(items => {
    tracks = Object.values(items).filter(track => track.ativo && track.arquivo && safeUrl(db.media(track.arquivo)))
    updatePlayer()
  }).catch(() => {})
} catch {
  content.setAttribute('aria-busy', 'false')
  content.innerHTML = '<div class="notice"><p>O portal está temporariamente indisponível.</p><p><a href="">Recarregar</a></p></div>'
}

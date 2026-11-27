import { scene } from './cenario.js'

export async function mount(node, { db, t, settings, html, button, target, local, storage }) {
  const records = await db.get('locais.json')
  const locations = Object.values(records).filter(place => place.ativo).map(place => ({
    ...place, titulo: local(place,'titulo'), resumo: local(place,'resumo')
  }))
  let selected = 0
  let guided = storage.get('emli:tour') === 'guided'
  let worker
  let talking = false
  let pending = false
  const control = (action, icon) => `<button class="icon" data-camera="${action}" aria-label="${html(t(action))}">${icon}</button>`
  node.innerHTML = `
    <div class="actions map-choices">
      <button class="button" data-mode="free">${html(t('free'))}</button>
      <button class="button" data-mode="guided">${html(t('guide'))}</button>
      ${/^https?:\/\//.test(settings.unityUrl) ? button(t('openUnity'), settings.unityUrl, 'gold') : ''}
    </div>
    <div class="map-layout">
      <div class="map-stage"><canvas aria-hidden="true"></canvas>
        <div class="map-tools">
          ${control('rotateLeft','↶')}${control('rotateRight','↷')}${control('zoomOut','−')}${control('zoomIn','+')}
        </div>
      </div>
      <div class="map-side">
        <section class="map-selection" aria-live="polite"></section>
        <details open><summary>${html(t('places'))}</summary>
          <div class="place-list">${locations.map(place => `<button class="button small" data-place="${html(place.id)}">${html(place.titulo)}</button>`).join('')}</div>
        </details>
      </div>
    </div>
    <section class="guide" hidden>
      <h2>${html(t('guide'))}</h2>
      <p>${html(t('guideIntro'))}</p>
      <div class="actions"><button class="button" data-step="-1">${html(t('left'))}</button><button class="button" data-step="1">${html(t('right'))}</button></div>
      <details>
        <summary>${html(t('model'))}</summary>
        <p>${html(t('modelInfo'))}</p>
        <button class="button" data-ai>${html(t('enableAi'))}</button>
        <p role="status"></p>
        <div role="log" aria-live="polite"></div>
        <form hidden><label><span>${html(t('ask'))}</span><input class="field" name="question" required maxlength="240"></label><button class="button gold">${html(t('send'))}</button></form>
      </details>
    </section>`
  const guide = node.querySelector('.guide')
  const form = guide.querySelector('form')
  const status = guide.querySelector('[role=status]')
  const log = guide.querySelector('[role=log]')
  const aiButton = guide.querySelector('[data-ai]')
  const modelControls = form.querySelectorAll('input, button')
  const select = id => {
    const index = locations.findIndex(place => place.id === id)
    if (index < 0) return
    selected = index
    refresh()
  }
  const renderer = scene(node.querySelector('canvas'), locations, select)

  function refresh() {
    const place = locations[selected]
    guide.hidden = !guided
    node.querySelectorAll('[data-mode]').forEach(element => element.setAttribute('aria-pressed', (element.dataset.mode === 'guided') === guided))
    node.querySelectorAll('[data-place]').forEach(element => element.setAttribute('aria-pressed', place?.id === element.dataset.place))
    node.querySelector('.map-selection').innerHTML = place
      ? `<h2>${html(place.titulo)}</h2><p>${html(place.resumo)}</p><div class="actions">${button(t('open'),target(place.destino),'gold')}</div>`
      : `<p>${html(t('empty'))}</p>`
    renderer.update({ id: place?.id })
  }
  function stopModel(text = '') {
    worker?.terminate()
    worker = undefined
    talking = false
    pending = false
    aiButton.textContent = t('enableAi')
    status.textContent = text
    log.textContent = ''
    form.hidden = true
    modelControls.forEach(control => { control.disabled = false })
  }
  function toggleAi() {
    if (worker) { stopModel(); return }
    if (!navigator.gpu || !window.isSecureContext) { stopModel(t('modelUnavailable')); return }
    try {
      worker = new Worker(new URL('./modelo.js',import.meta.url),{type:'module'})
      status.textContent = t('load')
      aiButton.textContent = t('disableAi')
      worker.onerror = () => stopModel(t('modelUnavailable'))
      worker.onmessage = ({ data }) => {
        if (data.kind === 'error') stopModel(t('modelUnavailable'))
        if (data.kind === 'progress') status.textContent = Math.round(data.percent)+'%'
        if (data.kind === 'ready') {
          status.textContent = ''
          talking = true
          form.hidden = false
          form.elements.question.focus()
        }
        if (data.kind === 'reply') {
          status.textContent = ''
          log.lastElementChild.textContent += '\n'+(data.text || t('unavailable'))
          pending = false
          modelControls.forEach(control => { control.disabled = false })
          form.elements.question.focus()
        }
      }
      worker.postMessage({kind:'load'})
    } catch { stopModel(t('modelUnavailable')) }
  }
  const cameras = {
    rotateLeft:{ move:-.32 },rotateRight:{ move:.32 },
    zoomIn:{ scale:.15 },zoomOut:{ scale:-.15 }
  }
  node.addEventListener('click', ({target: source}) => {
    const control = source.closest('button')
    if (!control) return
    const { place, step, camera, mode } = control.dataset
    if (place) select(place)
    if (step && locations.length) {
      selected = (selected+Number(step)+locations.length)%locations.length
      refresh()
    }
    if (camera) renderer.update(cameras[camera])
    if (mode) {
      guided = mode === 'guided'
      storage.set('emli:tour',mode)
      if (!guided) stopModel()
      refresh()
    }
    if (control === aiButton) toggleAi()
  })
  form.addEventListener('submit', event => {
    event.preventDefault()
    const question = form.elements.question.value.trim()
    if (!question || !worker || !talking || pending) return
    pending = true
    form.reset()
    modelControls.forEach(control => { control.disabled = true })
    status.textContent = t('load')
    const entry = document.createElement('p')
    entry.textContent = question
    log.append(entry)
    while (log.children.length > 8) log.firstElementChild.remove()
    const query = question.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase()
    const facts = Object.values(db.index).filter(item => item.tipo !== 'tag').map(item => {
      const summary = `${local(item,'titulo')}. ${local(item,'resumo')}`
      const words = query.split(/[^\p{Letter}]+/u).filter(word => word.length > 3)
      const normalized = summary.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase()
      return { summary, score: words.filter(word => normalized.includes(word)).length }
    }).sort((a,b) => b.score-a.score)
    const context = [locations[selected]?.resumo,...facts.slice(0,5).map(item => item.summary)].filter(Boolean).join('\n')
    worker.postMessage({ kind:'ask', context, question })
  })
  refresh()
  return () => { renderer.dispose(); stopModel() }
}

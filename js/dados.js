const requests = new Map()
const root = new URL('../', import.meta.url)

function read(url) {
  if (!requests.has(url.href)) {
    const task = fetch(url, { signal: AbortSignal.timeout(12000) }).then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const record = await response.json()
      if (!/^1\./.test(record.versaoSchema)) throw new Error('Versão de dados incompatível')
      return record
    }).catch(error => {
      requests.delete(url.href)
      throw error
    })
    requests.set(url.href, task)
  }
  return requests.get(url.href)
}

export const config = () => read(new URL('config.json', root))

export async function database(settings) {
  const candidates = [settings.baseDados, settings.baseReserva].filter(Boolean)
  for (const candidate of new Set(candidates)) {
    const base = new URL(candidate, root)
    const get = async file => (await read(new URL(file, base))).conteudo
    try {
      const [index, links] = await Promise.all([get('indice.json'), get('links.json')])
      return {
        index, links, get,
        media: path => new URL(path, base).href,
        async item(id) {
          const entry = Object.hasOwn(index, id) ? index[id] : undefined
          if (!entry) return undefined
          const contents = await get(entry.arquivo)
          return contents[id]?.ativo === true ? contents[id] : undefined
        }
      }
    } catch {
      // Tenta uma base coerente de reserva, incluindo seus próprios índices.
    }
  }
  throw new Error('Base de dados indisponível')
}

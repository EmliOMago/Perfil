const model = 'onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX'
let generator
let history = []

self.onmessage = async ({ data }) => {
  try {
    if (data.kind === 'load') {
      const adapter = await self.navigator.gpu?.requestAdapter()
      if (!adapter || !adapter.features.has('shader-f16')) throw new Error('WebGPU indisponível')
      const { pipeline, env } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/+esm')
      env.allowLocalModels = false
      generator = await pipeline('text-generation',model,{
        device:'webgpu',dtype:'q4f16',
        progress_callback(progress) {
          if (progress.status === 'progress' && Number.isFinite(progress.progress)) {
            self.postMessage({kind:'progress',percent:progress.progress})
          }
        }
      })
      self.postMessage({kind:'ready'})
    } else if (data.kind === 'ask' && generator) {
      const prompt = 'Você é o guia virtual do Bairro Mágico de Emli O’Mago. Responda de forma breve em português brasileiro. Use apenas os fatos do portal abaixo. Se faltar informação, diga que o portal não informa.\n'+data.context
      const messages = [{role:'system',content:prompt},...history,{role:'user',content:data.question}]
      const [result] = await generator(messages,{max_new_tokens:256,do_sample:false})
      const output = result.generated_text
      const reply = Array.isArray(output) ? output.at(-1)?.content : output
      const text = String(reply ?? '').split('</think>').at(-1).replace(/<think>[\s\S]*$/u,'').trim()
      if (text) history = [...history,{role:'user',content:data.question},{role:'assistant',content:text}].slice(-4)
      self.postMessage({kind:'reply',text})
    }
  } catch { self.postMessage({kind:'error'}) }
}

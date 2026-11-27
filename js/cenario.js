// Perspectiva paralela de uma maquete tridimensional. Coordenadas do catálogo no plano X/Z.
const palette = {
  casa: ['#bb754c', '#b14b60'], arcade: ['#744967', '#953985'],
  biblioteca: ['#b69e65', '#3e705a'], teatro: ['#b55858', '#913d62'],
  estudio: ['#6d6b97', '#7d467f'], atelie: ['#b77e54', '#82744c'],
  cafe: ['#9d6a51', '#a7574a'], oficina: ['#64848a', '#476265']
}
const cos = Math.cos
const sin = Math.sin

export function scene(canvas, locations, choose) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return { update() {}, dispose() {} }
  let angle = 0.73, zoom = 1, selected
  let points = []
  let bounds = canvas.getBoundingClientRect()
  let press
  const observer = new ResizeObserver(() => draw())
  observer.observe(canvas)

  function draw() {
    bounds = canvas.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    const ratio = Math.min(devicePixelRatio || 1, 2)
    canvas.width = Math.round(bounds.width * ratio)
    canvas.height = Math.round(bounds.height * ratio)
    ctx.scale(ratio, ratio)
    const { width, height } = bounds
    const scale = Math.min(width / 25, height / 16) * zoom
    const depth = (x, z) => x * sin(angle) + z * cos(angle)
    const project = ([x, y, z]) => [
      width / 2 + (x * cos(angle) - z * sin(angle)) * scale,
      height * .53 + (depth(x, z) * .51 - y) * scale
    ]
    function polygon(vertices, color, stroke) {
      const [first, ...rest] = vertices.map(project)
      ctx.beginPath()
      ctx.moveTo(...first)
      for (const point of rest) ctx.lineTo(...point)
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
      if (stroke) { ctx.strokeStyle = stroke; ctx.stroke() }
    }
    function quad(x, z, w, d, y, color) {
      polygon([[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2]], color)
    }
    function block(x, z, w, d, h, wall, roof, base = 0) {
      const a = x-w/2, b = x+w/2, c = z-d/2, e = z+d/2
      const top = base + h
      const faces = [
        [depth(x,c),[[a,base,c],[b,base,c],[b,top,c],[a,top,c]],wall],
        [depth(x,e),[[a,base,e],[b,base,e],[b,top,e],[a,top,e]],wall],
        [depth(a,z),[[a,base,c],[a,base,e],[a,top,e],[a,top,c]],wall],
        [depth(b,z),[[b,base,c],[b,base,e],[b,top,e],[b,top,c]],wall]
      ].sort((p,q) => p[0]-q[0])
      for (const [, vertices, color] of faces.slice(2)) {
        polygon(vertices,color,'#21182255')
        const isX = vertices[0][0] === vertices[1][0]
        if (isX) polygon(vertices,'#110b2730')
        if (base || h < 1) continue
        const [v0,v1] = vertices
        for (const pos of [.27,.68]) {
          const at = p => [v0[0]+(v1[0]-v0[0])*p,base+h*.45,v0[2]+(v1[2]-v0[2])*p]
          const [x0,y0,z0] = at(pos)
          const [x1,,z1] = at(pos+.14)
          polygon([[x0,y0,z0],[x1,y0,z1],[x1,y0+.37,z1],[x0,y0+.37,z0]],'#ffd78b','#42314a')
        }
      }
      quad(x,z,w,d,top,roof)
    }
    const backdrop = ctx.createLinearGradient(0,0,0,height)
    backdrop.addColorStop(0,'#302640')
    backdrop.addColorStop(.65,'#61504a')
    backdrop.addColorStop(1,'#2b3032')
    ctx.fillStyle = backdrop
    ctx.fillRect(0,0,width,height)
    ctx.fillStyle = '#efd293'
    ctx.beginPath()
    ctx.arc(width*.78,height*.18,Math.min(width,height)*.087,0,Math.PI*2)
    ctx.fill()

    block(0,0,19,17,.74,'#654538','#365347',-.77)
    quad(0,0,18,16,.02,'#42644e')
    for (const [x,z,w,d] of [[0,0,17,1.4],[0,0,1.4,15],[-5,-2,1,4],[5,-2,1,4],[-5,3,1,4],[5,3,1,4]]) quad(x,z,w,d,.035,'#b89770')
    quad(0,0,3.15,3.15,.05,'#c69e80')
    for (let i=-1;i<=1;i++) for (let j=-1;j<=1;j++) quad(i*.89,j*.89,.78,.78,.06,'#d5ae88')

    function tree(x,z,i) {
      block(x,z,.3,.3,.86,'#6f5144','#87604e')
      block(x,z,1.02,1.02,.66,i%2?'#54775c':'#406850','#78a577',.72)
      block(x,z,.68,.68,.45,'#5f8863','#93ad75',1.37)
    }
    const objects = locations.map(location => ({ x:location.posicao[0], z:location.posicao[1], location }))
    const trees = [[-8,-7],[-7,-5],[-7,4],[-8,7],[8,-7],[7,-5],[8,4],[8,7],[-3,7],[3,7],[-2,-7],[2,-7],[7,0],[-7,-.5]]
    trees.forEach(([x,z],i) => objects.push({ x,z,i }))
    objects.sort((a,b) => depth(a.x,a.z)-depth(b.x,b.z))
    points = []
    for (const {x,z,i,location} of objects) {
      if (!location) { tree(x,z,i); continue }
      const active = selected === location.id
      const colors = palette[location.modelo]
      const h = colors ? (location.modelo === 'teatro' ? 1.95 : 1.58) : .58
      quad(x,z,2.48,2.23,.065,active?'#f5c472':'#88946f')
      if (colors) {
        block(x,z,2.18,1.8,h,colors[0],colors[1])
        block(x,z,2.34,1.94,.16,colors[1],colors[1],h)
        quad(x+.23,z-.17,1.08,.66,h+.17,'#324b70')
        for (const s of [-1,0,1]) quad(x+.23+s*.33,z-.17,.26,.54,h+.18,'#6084a4')
      } else if (location.modelo === 'jardim') {
        for (const offset of [-.65,.65]) block(x+offset,z,.7,1.6,.28,'#7e5a49','#6f9c57')
        tree(x,z-.2,1)
      } else {
        block(x,z,.93,.93,.34,'#766972','#90afb2')
        block(x,z,.35,.35,.44,'#6a8897','#d5ced1',.34)
      }
      points.push({ location, point: project([x,h+.43,z]) })
    }
    ctx.font = '700 12px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (const { location,point:[x,y] } of points) {
      const active = selected === location.id
      const label = location.titulo
      const text = width > 550 || active ? label : '•'
      const span = ctx.measureText(text).width+14
      ctx.fillStyle = active ? '#ffcc66' : '#211629eb'
      ctx.fillRect(x-span/2,y-11,span,22)
      ctx.fillStyle = active ? '#261624' : '#faecd9'
      ctx.fillText(text,x,y)
    }
  }
  const output = {
    update({ move = 0, scale = 0, id = selected } = {}) {
      angle += move
      zoom = Math.max(.78,Math.min(1.48,zoom+scale))
      selected = id
      draw()
    },
    dispose() { observer.disconnect() }
  }
  canvas.addEventListener('pointerdown', event => { press = { x:event.clientX, angle } })
  canvas.addEventListener('pointermove', event => {
    if (!press || !event.buttons || Math.abs(event.clientX-press.x)<5) return
    angle = press.angle+(event.clientX-press.x)/130
    draw()
  })
  canvas.addEventListener('pointerup', event => {
    if (!press || Math.abs(event.clientX-press.x)>5) { press = null; return }
    press = null
    const x = event.clientX-bounds.left, y = event.clientY-bounds.top
    const candidates = points.map(({ location, point }) => ({
      location, distance: Math.hypot((x-point[0])*.72,y-point[1]-7)
    })).sort((a,b) => a.distance-b.distance)
    if (candidates[0]?.distance < 33) choose(candidates[0].location.id)
  })
  draw()
  return output
}

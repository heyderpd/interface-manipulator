const createElementNS = tag => document.createElementNS('http://www.w3.org/2000/svg', tag)

const addProps = (elm, props) => Object
  .keys(props)
  .map(
    p => elm.setAttribute(p, props[p]))

const createElement = (tag, props) => {
  const elm = createElementNS(tag)
  addProps(elm, props)
  return elm
}

const zoomOut = (p, max) => p *2 -max /2

const createLine = () => {
  const x = Math.floor(Math.random() *state.width)
  const y = Math.floor(Math.random() *state.height)
  const xF = zoomOut(x, state.width)
  const yF = zoomOut(y, state.height)
  const line = createElement('line', {
    x1: x, x2: xF,
    y1: y, y2: yF
  })
  const dot = createElement('circle', { cx: x, cy: y, r: 1 })
  return [ line, dot ]
}

const createLineList = lim => {
  const lines = []
  while (lines.length < lim) {
    const [ line, dot ] = createLine()
    lines.push(line)
    lines.push(dot)
  }
  return lines
}

const createSvg = () => {
  const lines = createLineList(state.amount)
  const g = createElementNS('g')
  const svg = createElement('svg', {
    height: state.height,
    width: state.width,
    version: '1.0',
    viewBox: `0 0 ${state.width} ${state.height}`
  })
  lines.map(l => g.appendChild(l))
  svg.appendChild(g)
  return svg
}

const state = {}

const skyGenerator = (height, width, amount = 500) => {
  state.amount = amount
  state.height = height
  state.width = width
  const warpSky = document.getElementById('warpSky')
  warpSky.innerHTML = ''
  warpSky.appendChild(createSvg())
}

export default skyGenerator

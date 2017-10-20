
const map = (obj, fx) => Object.keys(obj).map(key => fx(obj[key]))

const createTask = task => ({
  id: task.id,
  text: task.value.getAttribute('label')
})

const createLink = link => ({
  from: link.source.id,
  to: link.target.id
})

export const drawGraphModel = () => {
  try {
    const cells = document.Editor.graph.model.cells
    const state = {
      tasks: [],
      links: []
    }

    map(cells,
      (elm) => {
        try {
          if (elm.value.tagName === 'Task') {
            state.tasks.push(createTask(elm))
          }
          if (elm.value.tagName === 'Edge') {
            state.links.push(createLink(elm))
          }
        } catch (err) {}
      })
    return state
    
  } catch (err) {
    return null
  }
}

const createNodeOf = (elmType, elm, nodes) => {
  const graph = document.Editor.graph
  const parent = graph.getDefaultParent()
  let offSet = -1

  const moduleElm = elmType === 'edge'
    ? node => {
        let { from, to } = node
        from = graph.model.cells[from]
        to = graph.model.cells[to]
        if (from && to) {
          graph.insertEdge(parent, null, elm, from, to)
        }
      }
    : node => {
      const { id, text } = node
      offSet++
      const newElm = elm.cloneNode(true)
      newElm.setAttribute('label', text)
      graph.insertVertex(parent, id, newElm, 20 +(offSet *100), 20 +(offSet *100), 80, 30)
    }
  
  nodes.map(moduleElm)
}

export const isChange = ({ nextId }) => {
  try {
    const newID = document.Editor.graph.model.nextId
    if (nextId !== newID) {
      return newID
    }
    return false

  } catch (err) {
    return false
  }
}

const clearAll = () => {
  const graph = document.Editor.graph
  // document.Editor.destroy()
  graph.selectAll()
  graph.removeCells()
}

export const jsonToModel = json => {
  try {
    const { tasks, links } = JSON.parse(json)
    tasks.map(t => {

    })
    if (Array.isArray(tasks) && Array.isArray(links)) {
      console.log('json!!', json)
      createAllNodes(tasks, links)
    }
  } catch (err) { }
}

const createAllNodes = (taskNodes, edgeNodes) => {
  try {
    const { task, edge } = document.Editor.templates
    const graph = document.Editor.graph

    clearAll()
    taskNodes && createNodeOf('task', task.value, taskNodes)
    edgeNodes && createNodeOf('edge', edge.value, edgeNodes)

  } catch (err) {
    clearAll()
  }
}

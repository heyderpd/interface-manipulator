import React, { Component } from 'react'

const map = (obj, fx) => Object.keys(obj).map(key => fx(obj[key]))

const createTask = task => ({
  id: task.id,
  text: task.value.getAttribute('label')
})

const createLink = link => ({
  from: link.source.id,
  to: link.target.id
})

const drawGraphModel = () => {
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

class ShowJson extends Component {
	state = {
		json: '' 
  }
  
  componentDidMount () {
    setInterval(() => {
      try {
        const json = "JSON MODEL:\n" + JSON.stringify(drawGraphModel(), null, '  ')
        this.setState({ json })
      } catch (err) { }
    }, 800)
  }
	
	render() {
		return (
      <div className="json-wrp">
        <pre id="json">
          {this.state.json}
        </pre>
      </div>
		)
	}
}

export default ShowJson
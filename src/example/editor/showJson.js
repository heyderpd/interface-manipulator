import React, { Component } from 'react'
import { drawGraphModel, jsonToModel, isChange } from './mxHelper'

class ShowJson extends Component {
	state = {
    nextId: -1,
    json: ''
  }

  handleTextChange (event) {
    try {
      const json = event.target.value
      jsonToModel(json)
      this.setState({ json })
    } catch (err) { }
  }
  
  componentDidMount () {
    setInterval(() => {
      try {
        const nextId = isChange(this.state)
        if (nextId && nextId >= 0) {
          this.setState({
            nextId,
            json: JSON.stringify(drawGraphModel(), null, '  ')
          })
        }
      } catch (err) { }
    }, 654)
  }
	
	render() {
		return (
      <div className="json-wrp">
        <textarea
          id="json"
          value={this.state.json}
          onChange={this.handleTextChange.bind(this)}
        />
      </div>
		)
	}
}

export default ShowJson
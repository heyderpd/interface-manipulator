import React, { Component } from 'react'
// import Task from './components/task'
import Workfloweditor from './example/editor/workfloweditor'
import ShowJson from './example/editor/showJson'

// <div className="App">
class App extends Component {
  render() {
    return (
      <div>
        <Workfloweditor />
        <ShowJson />
      </div>
    )
  }
}

export default App

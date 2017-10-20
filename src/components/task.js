import React, { Component } from 'react'
import Draggable from './draggable'
import Link from './link'

class Task extends Component {
  render() {
    return (
      <Draggable className="task-cube">
        <Link />
      </Draggable>
    )
  }
}

export default Task

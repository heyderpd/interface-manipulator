import React, { Component } from 'react'
import Draggable from './draggable'

class Link extends Component {
  render() {
    return (
      <Draggable className="task-link" {...this.props} />
    )
  }
}

export default Link

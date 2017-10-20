import React, { Component, Children, cloneElement } from 'react'
import classNames from 'classnames'

class Draggable extends Component {
  state = {
    drag: false,
    x: 0,
    y: 0
  }

  _onMouseDown(evt) {
    evt.stopPropagation()
    this.setState({ drag: true })
  }

  _onMouseMove(evt) {
    if (this.state.drag) {
      let containerX = 0, containerY = 0
      const { containerPosition } = this.props
      if (containerPosition) {
        containerX = containerPosition && containerPosition.x
        containerY = containerPosition && containerPosition.y
      }
      this.setState({
        x: evt.clientX -containerX -15,
        y: evt.clientY -containerY -15
      })
    }
  }

  _onMouseUp(evt) {
    this.setState({ drag: false })
  }

  render() {
    const { x, y } = this.state
    const children = Children.map(
      this.props.children,
      child => cloneElement(child, { containerPosition: this.state })
    )
    return (
      <div
        className={classNames('draggable', this.props.className)}
        style={{left: x, top: y}}
        onMouseDown={this._onMouseDown.bind(this)}
        onMouseMove={this._onMouseMove.bind(this)}
        onMouseUp={this._onMouseUp.bind(this)}
      >
        {children}
      </div>
    )
  }
}

export default Draggable
/*
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp

evt && evt.preventdefault && evt.preventdefault()
evt && evt.stopPropagation && evt.stopPropagation()
*/
import React from 'react'

import { DragSource } from 'react-dnd'
import { DragTypes } from '../../../../../shared/Global'

const deviceSource = {
  beginDrag (props) {
    // Return the data describing the dragged item
    const item = {
      img: props.img,
      title: props.title,
      type: props.type,
      monitors: props.monitors
    }
    return item
  },

  endDrag () {
    // console.log(arguments)
  }
}

function collect (connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    currentOffset: monitor.getSourceClientOffset(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

class DeviceImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    // let img = new Image()
    //
    // img.onload = () => {
    //
    //     var oc = document.createElement('canvas'),
    //         octx = oc.getContext('2d');
    //     oc.width = 48;
    //     oc.height = 48;
    //     octx.drawImage(img, 0, 0, oc.width, oc.height);
    //
    //     let img2 = new Image()
    //     img2.src = oc.toDataURL()
    //
    //     this.props.connectDragPreview(
    //         img2//this.refs.img
    //     )
    //
    //     oc.remove()
    // }
    //
    // img.src = "/images/" + this.props.img
  }

  render () {
    const { connectDragSource } = this.props // { connectDragSource, isDragging }

    return (
      connectDragSource(
        <a href="javascript:;">
          <span className="pull-left item-icon" ref="div">
            <img src={`/externalpictures?name=${this.props.img}`} data-type={this.props.type}/>
          </span>

          <span className="item-text">
            <strong>{this.props.title}</strong>
          </span>
        </a>
      )
    )
  }

  // render() {
  //
  //     return (
  //         <a href="javascript:;">
  //             <span className="pull-left item-icon" ref="div">
  //                 <img src={"/images/" + this.props.img} data-monitortype={this.props.monitortype}/>
  //             </span>
  //
  //             <span className="item-text">
  //                 <strong>{this.props.title}</strong>
  //             </span>
  //         </a>
  //     )
  // }
}
DeviceImg.defaultProps = {
  img: '',
  type: '',
  title: '',
  selected: false
}

export default DragSource(DragTypes.DEVICE, deviceSource, collect)(DeviceImg)
// export default DeviceImg;

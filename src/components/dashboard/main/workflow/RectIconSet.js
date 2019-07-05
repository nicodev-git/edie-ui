export default class RectIconSet {
  
  constructor (props) {
    this.images = []

    const {state} = props

    const {mxUtils, mxEvent} = window
    // const graph = state.view.graph

    // Icon1
    let img = mxUtils.createImage('/resources/images/dashboard/multiply.png')
    img.setAttribute('title', 'Duplicate')
    img.style.position = 'absolute'
    img.style.cursor = 'pointer'
    img.style.width = '16px'
    img.style.height = '16px'
    img.style.left = (state.x + state.width - 20) + 'px'
    img.style.top = (state.y + state.height - 20) + 'px'

    mxEvent.addGestureListeners(img, mxUtils.bind(this, (evt) => {
      mxEvent.consume(evt)
      // this.destroy()
      props.onClickDelete(state.cell)
    }))

    state.view.graph.container.appendChild(img)
    this.images.push(img)

    // Delete
    img = mxUtils.createImage('/resources/images/dashboard/info.png')
    img.setAttribute('title', 'Delete')
    img.style.position = 'absolute'
    img.style.cursor = 'pointer'
    img.style.width = '16px'
    img.style.height = '16px'
    img.style.left = (state.x + state.width - 36) + 'px'
    img.style.top = (state.y + state.height - 20) + 'px'

    mxEvent.addGestureListeners(img, mxUtils.bind(this, (evt) => {
      mxEvent.consume(evt)
      props.onClickInfo(state.cell)
    }))

    state.view.graph.container.appendChild(img)
    this.images.push(img)
  }

  destroy () {
    if (this.images) {
      for (var i = 0; i < this.images.length; i++) {
        var img = this.images[i];
        img.parentNode.removeChild(img);
      }
    }

    this.images = null;
  }
}

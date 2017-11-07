export default class RectIconSet {
  
  constructor (state) {
    this.images = []

    const {mxUtils, mxEvent} = window
    const graph = state.view.graph

    // Icon1
    let img = mxUtils.createImage('/resources/images/dashboard/info.png')
    img.setAttribute('title', 'Duplicate')
    img.style.position = 'absolute'
    img.style.cursor = 'pointer'
    img.style.width = '16px'
    img.style.height = '16px'
    img.style.left = (state.x + state.width) + 'px'
    img.style.top = (state.y + state.height) + 'px'

    mxEvent.addGestureListeners(img, mxUtils.bind(this, (evt) => {
      const s = graph.gridSize
      graph.setSelectionCells(graph.moveCells([state.cell], s, s, true))
      mxEvent.consume(evt)
      this.destroy()
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
    img.style.left = (state.x + state.width) + 'px'
    img.style.top = (state.y - 16) + 'px'

    mxEvent.addGestureListeners(img, mxUtils.bind(this, (evt) => {
      // Disables dragging the image
      mxEvent.consume(evt)
    }))

    mxEvent.addListener(img, 'click', mxUtils.bind(this, (evt) => {
      graph.removeCells([state.cell])
      mxEvent.consume(evt)
      this.destroy()
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

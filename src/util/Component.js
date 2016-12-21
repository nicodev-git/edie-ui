import ReactDOM from 'react-dom'

export function appendComponent (component) {
  let div = document.createElement('div')
  document.body.appendChild(div)

  let instance = ReactDOM.render(component, div)
  instance.div = div

  return instance
}

export function removeComponent (component) {
  if (!component) {
    console.error('Missing component to remove.')
    return
  }
  let div = component.div// ReactDOM.findDOMNode(component)

  if (!div) {
    console.error('Missing component dom to remove.')
    return
  }

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div)

    div.parentNode.removeChild(div)
  }, 1)
}

import ReactDOM from 'react-dom'

function getDiv () {
  let div = document.createElement('div')
  document.body.appendChild(div)
  return div
}

export function appendComponent (component) {
  /* let div = document.createElement('div')
  document.body.appendChild(div)
  console.log('in append: ', component)
  console.log(component.type.WrappedComponent) */
  let div = getDiv()
  let instance = ReactDOM.render(component, div)
  // console.log('instance: ', instance)
  // instance.div = div
  return instance
}

export function removeComponent (component) {
  if (!component) {
    console.error('Missing component to remove.')
    return
  }
  console.log('in remove: ', component)
  let div = getDiv()
  // let div = component.div

  if (!div) {
    console.error('Missing component dom to remove.')
    return
  }

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div)

    div.parentNode.removeChild(div)
  }, 1)
}

import React from 'react'

import ShapeEditModal from './ShapeEditModal'

export default class ShapeAdd extends React.Component {
  componentWillMount() {
    this.props.fetchOutputObjects()
  }

  render() {
    return (
      <ShapeEditModal
        noModal
      />
    )
  }
}
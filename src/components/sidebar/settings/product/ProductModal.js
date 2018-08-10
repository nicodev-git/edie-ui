import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import ProductModalView from './ProductModalView'

export default class ProductModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render () {
    const {onClickClose} = this.props
    return (
      <ProductModalView
        {...this.props}
        onClickClose={onClickClose}
      />
    )
  }
}

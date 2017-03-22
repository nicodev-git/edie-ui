import React, { Component } from 'react'
import { ROOT_URL } from '../../../../../actions/config'
import SimpleModalContainer from '../../../../../containers/modal/SimpleModalContainer'
import { validate } from '../../../../modal/validation/Category'

export default class MoveModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      categories: []
    }
    this.closeModal = this.closeModal.bind(this)
    this.onClickMove = this.onClickMove.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  componentWillMount () {
    $.get(`${ROOT_URL}${Api.rule.getCategories}`).done(res => { // eslint-disable-line no-undef
      this.setState({ categories: res })
    })
  }

  closeModal (data) {
    this.setState({ open: false }, () => {
      this.props.onClose && this.props.onClose(this, data)
    })
  }

  onClickMove ({category}) {
    this.closeModal(category)
  }

  renderOptions () {
    let categories = this.state.categories
    let options = categories.map(item =>
      {
        value: item.id,
        label: item.name
      }
    )
  }

  render () {
    let header = 'Move rule'
    let options = this.renderOptions()
    let content = [
      {type: 'select', name: 'Category', options: options}
    ]
    let buttonText = 'Move'
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.onClickMove}
        onClose={this.closeModal}
        validate={validate}
        buttonText={buttonText}
      />
    )
  }
}

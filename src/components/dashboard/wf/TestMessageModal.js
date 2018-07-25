import React from 'react'
import {reduxForm, getFormValues} from 'redux-form'
import {connect} from 'react-redux'
import {keys} from 'lodash'

import TestMessageModalView from './TestMessageModalView'

class TestMessageModal extends React.Component {
  constructor (props) {
    super(props)

    const names = keys(props.initialValues || {})
    const fields = names.map((name, id) => ({
      id,
      name,
      value: props.initialValues[name]
    }))

    this.state = {
      fields
    }
  }
  onSubmit (values) {
    const {onSubmit} = this.props


    const msg = {}
    const paramKeys = keys(values.param || {})
    paramKeys.forEach(key => {
      if (values.param[key] && key.startsWith('name')) {
        const pid = key.replace('name', '')

        const name = values.param[key]
        const value = values.param[`value${pid}`]

        msg[name] = value
      }
    })


    onSubmit(msg)
  }

  onClickAdd () {
    const {fields} = this.state

    const maxId = fields.length ? (Math.max.apply(null, fields.map(p => p.id)) + 1) : 1
    this.setState({
      fields: [...fields, {
        id: maxId
      }]
    })
  }

  onClickDelete (id) {
    const {fields} = this.state

    this.props.change(`param.name${id}`, '')
    this.props.change(`param.value${id}`, '')

    this.setState({
      fields: fields.filter(p => p.id !== id)
    })
  }

  render() {
    const {handleSubmit, onClose} = this.props
    return (
      <TestMessageModalView
        fields={this.state.fields}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={onClose}

        onClickAdd={this.onClickAdd.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {},
    allValues: getFormValues('wfTestMsgForm')(state)
  })
)(reduxForm({form: 'wfTestMsgForm'})(TestMessageModal))

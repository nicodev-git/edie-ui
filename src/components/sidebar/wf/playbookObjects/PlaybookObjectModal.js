import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import OutputObjectModalView from './OutputObjectModalView'
import {showPrompt, showConfirm} from 'components/common/Alert'

class PlaybookObjectModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vars: props.editObject ? (props.editObject.vars || []) : []
    }
  }

  handleFormSubmit (values) {
    const {editObject} = this.props
    const {vars} = this.state
    const entity = {
      ...editObject,
      ...values,
      vars
    }
    this.props.onSave(entity)
    this.props.onClose()
  }

  onClickAddVar () {
    const {vars} = this.state
    showPrompt('Please type var', '', name => {
      if (!name) return
      this.setState({
        vars: [...vars, name]
      })
    })
  }

  onClickDeleteVar (index) {
    const {vars} = this.state
    showConfirm('Click OK to remove', btn => {
      if (btn !== 'ok') return
      this.setState({
        vars: vars.filter((p, i) => i !== index)
      })
    })

  }

  render() {
    const {handleSubmit, onClose} = this.props
    const {vars} = this.state
    return (
      <OutputObjectModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        vars={vars}
        onClickAddVar={this.onClickAddVar.bind(this)}
        onClickDeleteVar={this.onClickDeleteVar.bind(this)}
      />
    )
  }
}

export default connect(
(state, props) => ({
  initialValues: props.editObject
}))(reduxForm({form: 'outputObjectForm'})(PlaybookObjectModal))
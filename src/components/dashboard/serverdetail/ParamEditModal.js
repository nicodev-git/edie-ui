import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import ParamEditModalView from './ParamEditModalView'
import {defaultKeys} from 'shared/Global'

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '300px',
    overflow: 'auto'
  }
}

class ParamEditModal extends React.Component {
  onClickClose () {
    this.props.onClose()
  }

  onClickAdd () {
  }

  onClickDefaultKey (key) {
    this.props.change('key', key)
    if (key === 'parse') {
      this.props.change('value', '{"FIELD":"PARSERNAME"}')
    }
  }

  handleFormSubmit (props) {
    const {editParam, onSave} = this.props
    const param = {
      ...editParam,
      ...props
    }
    onSave(param)
  }

  render () {
    const {handleSubmit, hideDefaults} = this.props
    return (
      <ParamEditModalView
        onHide={this.onClickClose.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        styles={styles}
        hideDefaults={hideDefaults}
        defaultKeys={defaultKeys}
        onKeyClick={this.onClickDefaultKey.bind(this)}
      />
    )
  }
}

export default connect((state, props) => ({
  initialValues: props.editParam
}))(reduxForm({form: 'deviceMonitorParamEdit'})(ParamEditModal))

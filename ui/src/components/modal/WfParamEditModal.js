import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {assign} from 'lodash'
import ParamEditModalView from 'components/common/wizard/input/ParamEditModalView'

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

class WfParamEditModal extends React.Component {
  onClickClose () {
    this.props.closeParamEditModal()
  }

  onClickDefaultKey (key) {
    this.props.change('key', key)
    if (key === 'parse') {
      this.props.change('value', '{"FIELD":"PARSERNAME"}')
    }
  }

  handleFormSubmit (props) {
    const param = assign({}, this.props.editParam, props)
    if (this.props.editParam) {
      this.props.updateParam(this.props.editParam, param)
    } else {
      this.props.addParam(param)
    }
  }

  render () {
    const {handleSubmit} = this.props
    return (
      <ParamEditModalView
        onHide={this.onClickClose.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        styles={styles}
        defaultKeys={defaultKeys}
        onKeyClick={this.onClickDefaultKey.bind(this)}
      />
    )
  }
}

export default connect((state, props) => ({
  initialValues: props.editParam
}))(reduxForm({form: 'wfParamEdit'})(WfParamEditModal))

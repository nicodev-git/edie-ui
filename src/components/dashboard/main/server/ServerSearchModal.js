import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ServerSearchModalView from './ServerSearchModalView'

const osNames = [
  'Windows Server 2012',
  'Windows Server 2016',
  'Windows 8',
  'Windows 10',
  'Linux'
]
class ServerSearchModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOS: props.serverSearchParams.osNames || []
    }
  }

  onCheckOS (name, checked) {
    const {selectedOS} = this.state
    if (checked) {
      this.setState({
        selectedOS: [...selectedOS, name]
      })
    } else {
      this.setState({
        selectedOS: selectedOS.filter(p => p !== name)
      })
    }
  }

  onSubmit (values) {
    values.diskEnabled = !!values.diskEnabled
    values.ipEnabled = !!values.ipEnabled
    values.memoryEnabled = !!values.memoryEnabled

    values.osNames = this.state.selectedOS
    this.props.onSubmit(values)
  }
  render () {
    const {onHide, handleSubmit, onClickClear} = this.props
    return (
      <ServerSearchModalView
        onHide={onHide}
        onClickClear={onClickClear}
        onCheckOS={this.onCheckOS.bind(this)}
        osNames={osNames}
        selectedOS={this.state.selectedOS}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.dashboard.serverSearchParams
  })
)(reduxForm({form: 'serverSearchForm'})(ServerSearchModal))

import React from 'react'

import WfRectGroupsModalView from './WfRectGroupsModalView'
import {showAlert, showPrompt, showConfirm} from 'components/common/Alert'

export default class WfRectGroupsModal extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      name: ''
    }
  }

  onChangeName (e, value) {
    this.setState({
      name: value
    })
  }

  onClickAdd () {
    const {name} = this.state
    if (!name) {
      return showAlert('Please type name')
    }
    this.props.addWfRectGroup({
      name: this.state.name
    })
  }

  onClickEdit (group) {
    showPrompt('Please type name', group.name, name => {
      this.props.updateWfRectGroup({
        ...group,
        name
      })
    })
  }

  onClickDelete (group) {
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.removeWfRectGroup(group)
    })
  }

  render () {
    const {onHide, wfRectGroups} = this.props
    return (
      <WfRectGroupsModalView
        name={this.state.name}
        onChangeName={this.onChangeName.bind(this)}
        onHide={onHide}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
        wfRectGroups={wfRectGroups}
      />
    )
  }
}

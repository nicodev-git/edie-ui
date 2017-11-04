import React from 'react'

import WfRectGroupsModalView from './WfRectGroupsModalView'
import {showAlert} from 'components/common/Alert'
import {showPrompt} from "../../../common/Alert";

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

  onClickEdit () {
    // showPrompt()
  }

  onClickDelete () {

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

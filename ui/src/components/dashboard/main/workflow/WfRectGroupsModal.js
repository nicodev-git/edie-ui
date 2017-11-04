import React from 'react'

import WfRectGroupsModalView from './WfRectGroupsModalView'

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

  }

  render () {
    const {onHide, wfRectGroups} = this.props
    return (
      <WfRectGroupsModalView
        name={this.state.name}
        onChangeName={this.onChangeName.bind(this)}
        onHide={onHide}
        onClickAdd={this.onClickAdd.bind(this)}
        wfRectGroups={wfRectGroups}
      />
    )
  }
}

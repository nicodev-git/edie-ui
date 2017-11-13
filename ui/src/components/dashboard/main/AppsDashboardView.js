import React from 'react'
import {IconButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/create'

import ServerItem from './ServerItem'
import EditConfigModal from "./apps/EditConfigModal";

export default class AppsDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  getServers () {
    return []
  }

  onClickPref () {
    this.props.showAppsPrefModal(true)
  }

  onSavePref (values) {
    this.props.updateAppsPref(values)
    this.props.showAppsPrefModal(false)
  }

  onClosePrefModal () {
    this.props.showAppsPrefModal(false)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderServer (server, i) {
    return (
      <ServerItem
        key={server.id}
        server={server}
        index={i}
        onClick={() => this.onClickServer(server)}
        onClickDelete={() => this.onClickDeleteServer(server)}
      />
    )
  }

  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onTouchTap={this.onClickPref.bind(this)}><EditIcon /></IconButton>
      </div>
    )
  }

  renderPrefModal () {
    if (!this.props.appsPrefModalOpen) return null
    return (
      <EditConfigModal
        {...this.props}
        onClickSave={this.onSavePref.bind(this)}
        onClickClose={this.onClosePrefModal.bind(this)}
      />
    )
  }

  render () {
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
          {this.getServers().map(this.renderServer.bind(this))}
        </ul>

        {this.renderPrefModal()}
      </div>
    )
  }
}

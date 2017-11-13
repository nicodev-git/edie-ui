import React from 'react'
import {IconButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/create'

import EditConfigModal from './apps/EditConfigModal'
import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'

export default class AppsDashboardView extends React.Component {
  componentWillMount () {
    this.props.fetchAllApps()
  }

  getServers () {
    return this.props.allApps || []
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

  renderServer (item, index) {
    return (
      <AppletCard
        key={item.ID}
        color={colors[index % colors.length]}
        name={item.Publisher}
        desc={item.Name}
        desc2={item.Version}
        desc3=""
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

import React from 'react'
import {IconButton, TextField} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/create'

import EditConfigModal from './apps/EditConfigModal'
import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'

export default class AppsDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }
  }
  componentWillMount () {
    this.props.fetchAllApps(false)
  }

  getServers () {
    const {filter} = this.state
    const list = this.props.allApps || []
    const s = filter.toLowerCase()
    if (!s) return list
    return list.filter(p => p.Name.toLowerCase().indexOf(s) >= 0)
  }

  onClickPref () {
    this.props.showAppsPrefModal(true)
  }

  onSavePref (values) {
    this.props.updateAppsPref(values)
    this.props.showAppsPrefModal(false)

    this.props.fetchAllApps(!!values.hideDuplicate)
  }

  onClosePrefModal () {
    this.props.showAppsPrefModal(false)
  }

  onChangeFilter (e, value) {
    this.setState({
      filter: value
    })
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
        <TextField name="filter" value={this.state.filter} onChange={this.onChangeFilter.bind(this)}
                   hintText="Search"
                   className="valign-top"/>
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

import React from 'react'
import {withRouter} from 'react-router'
import { Panel, PanelBody } from 'components/common/Panel'
import IncidentTable from './IncidentTable'
import ToolbarToggle from '../map/toolbar/ToolbarToggle'
import IncidentEventsModal from './IncidentEventsModal'

import {defaultDateFormat} from 'shared/Global'

@withRouter
export default class MainIncidentPanel extends React.Component {
  renderTable () {
    const showAbsDate = this.getUserOptionValue('useAbsoluteDate', false)
    const dateFormat = this.getUserOptionValue('dateFormat', defaultDateFormat)
    return (
      <IncidentTable {...this.props} showAbsDate={showAbsDate} dateFormat={dateFormat} ref="table"/>
    )
  }

  onClickOpenModal (e) {
    this.props.router.push({
      pathname: '/',
      search: '?bigincidents='
    })
  }

  getUserOptionValue (key, defVal) {
    const {userInfo} = this.props
    if (!userInfo) return defVal
    return userInfo[key] || defVal
  }

  renderIncidentEventsModal () {
    if (!this.props.incidentEventsModalOpen) return null
    return (
      <IncidentEventsModal {...this.props}/>
    )
  }

  renderContents () {
    const {hidden} = this.props
    if (hidden) {

    } else {
      return (
        <Panel className="margin-sm-bottom flex-vertical flex-1 main-panel table-panel">
          <PanelBody className="padding-xs flex-vertical flex-1">
            <div className="main-incident-toggle hidden">
              <ToolbarToggle onToggle={this.onClickOpenModal.bind(this)} />
            </div>
            {this.renderTable()}
            {this.renderIncidentEventsModal()}
          </PanelBody>
        </Panel>
      )
    }
  }

  render () {
    return (
      <div className="incidents-row margin-sm-top flex-vertical flex-1" style={{minHeight: '600px'}}>
        {this.renderContents()}
      </div>
    )
  }
}

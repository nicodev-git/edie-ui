import React from 'react'
import { findIndex, startsWith, assign } from 'lodash'
import ReactTooltip from 'react-tooltip'
import Snackbar from 'material-ui/Snackbar'
import SearchIcon from 'material-ui/svg-icons/action/search'

import SidebarContainer from 'containers/page/sidebar/SidebarContainer'
import DashboardContainer from 'containers/page/content/dashboard/DashboardContainer'
import ActivationModal from 'components/auth/ActivationModal'
import { scrollTop } from '../../util/Scroll'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'

import Alert from 'components/shared/Alert'
import { parseSearchQuery } from 'shared/Global'

import { mainMenu, deviceMenu, contentType } from './Config'

const dashboardId = mainMenu[0].id

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      user: null,
      minHeight: 1300
    }
  }

  componentWillMount () {
    this.props.fetchEnvVars()
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.envVarAvailable && !this.props.envVarAvailable) {
      const index = findIndex(nextProps.envVars, {envvars: {key: 'CUSTOMER_ID'}})
      const customerId = index >= 0 ? nextProps.envVars[index].envvars.key : null

      const licenseIndex = findIndex(nextProps.envVars, {envvars: {key: 'CUSTOMER_LICENSE_RESPONSE'}})
      const license = licenseIndex >= 0 ? nextProps.envVars[licenseIndex].envvars.key : null
      if (!customerId || !license) {
        // User is not activated yet.
        this.props.openActivationModal()
      }
    }
  }

  renderDashboard () {
    const hidden = !!this.props.children
    return (
      <DashboardContainer hidden={hidden}/>
    )
  }

  onClickMenuItem (type, item) {
    const { router, closeDevice } = this.props

    scrollTop(this.refs.content)

    if (item.id === 'dashboard') {
      closeDevice()
    }
    router.push({
      pathname: item.path
    })
  }

  renderSidebar () {
    const {location, device, router} = this.props
    const {pathname} = location

    let pageId = dashboardId
    let pageType = contentType.Main

    let found = false
    mainMenu.forEach(item => {
      if (item.id === dashboardId) return true
      if (startsWith(pathname, item.path)) {
        pageId = item.id
        pageType = contentType.Main
        found = true
        return false
      }
    })

    if (!found) {
      let deviceId = device ? device.id : 'main'
      deviceMenu(deviceId).forEach(item => {
        if (item.id === dashboardId) return true
        if (startsWith(pathname, item.path)) {
          pageId = item.id
          pageType = contentType.Device
          found = true
          return false
        }
      })
    }

    return (
      <SidebarContainer
        router={router}
        pageId={pageId}
        pageType={pageType}
        device={device}
        onClickItem={this.onClickMenuItem.bind(this)}
      />
    )
  }

  onCloseAlert () {
    this.props.closeApiErrorModal()
  }
  onClickAlert (incident) {
    const query = (incident.description || '').replace(/:/gi, '')
    const newChips = parseSearchQuery(query)
    if (incident.devicename) {
      newChips.push({
        name: 'devicename',
        value: incident.devicename
      })
    }
    this.props.updateQueryChips(newChips)
    this.props.updateSearchParams(assign({}, this.props.searchParams, {
      query: newChips.map(m => `${m.name}=${m.value}`).join(' and ')
    }))

    this.props.router.push('/search')
  }

  renderActivationModal () {
    if (!this.props.activationModalOpen) return null
    return (
      <ActivationModal {...this.props}/>
    )
  }

  renderApiError () {
    if (!this.props.apiErrorModalOpen) return null
    const {apiError} = this.props
    const msg = `${apiError.message}. Url: ${apiError.config ? apiError.config.url : ''}`
    return (
      <Alert message={msg} onClose={this.onCloseAlert.bind(this)}/>
    )
  }

  renderIncidentAlert () {
    const { newIncidentMsg } = this.props
    if (!newIncidentMsg) return null
    return (
      <Snackbar
        open
        action={<SearchIcon color="white" style={{marginTop: '6px'}}/>}
        message={<div className="inline-block" onClick={this.onClickAlert.bind(this, newIncidentMsg.incident)} style={{cursor: 'pointer'}}>{newIncidentMsg.message}</div>}
        autoHideDuration={8000}
        onActionTouchTap={this.onClickAlert.bind(this, newIncidentMsg.incident)}
      />
    )
  }

  render () {
    const {children} = this.props
    const {minHeight} = this.state

    let style = {}
    if (!children) style = {minHeight: `${minHeight}px`}

    return (
      <div style={style}>
        {this.renderSidebar()}
        <div className="page-content flex-vertical" style={{overflow: 'auto'}} ref="content">
          {this.renderDashboard()}
          {children || null}
        </div>
        <ReactTooltip />
        {this.renderIncidentAlert()}
        {this.renderActivationModal()}
        {this.renderApiError()}
      </div>
    )
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Main)

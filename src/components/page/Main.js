import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { startsWith } from 'lodash'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'

import {closeDevice} from '../../actions'

import Topbar from './topbar/Topbar'
import Sidebar from './sidebar/Sidebar'
import Dashboard from './content/dashboard/Dashboard'
import {scrollTop} from '../../util/Scroll'

import {mainMenu, deviceMenu, contentType} from './Config'

const dashboardId = mainMenu[0].id

class Main extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      user: null,
      minHeight: 1300
    }
  }

  renderDashboard () {
    const hidden = !!this.props.children
    return (
            <Dashboard hidden={hidden}/>
    )
  }

  onClickMenuItem (type, item) {
    const {router} = this.props

    scrollTop(this.refs.content)

    if (item.id === 'dashboard') {
      this.props.closeDevice()
    }

    router.push({
      pathname: item.path
    })
  }

  renderSidebar () {
    const {location, device} = this.props
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
      deviceMenu.forEach(item => {
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
            <Sidebar
              pageId={pageId}
              pageType={pageType}
              device={device}
              onClickItem={this.onClickMenuItem.bind(this)}
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
                <Topbar/>
                {this.renderSidebar()}
                <div className="page-content flex-vertical" style={{overflow: 'auto'}} ref="content">
                    {this.renderDashboard()}
                    {children || null}
                </div>
            </div>
    )

        //
        // <IncidentAlert />
        // {this.state.loading ? <Loader /> : null}
        // <ReactTooltip />
  }
}

Main.defaultProps = {}

function mapStateToProps (state) {
  return {device: state.dashboard.selectedDevice}
}

export default withRouter(connect(mapStateToProps, {closeDevice})(DragDropContext(TouchBackend({ enableMouseEvents: true }))(Main)))

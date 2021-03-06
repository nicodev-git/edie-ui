import React, { Component } from 'react'
import { MapMenu, ToolbarOptions, LineTypesMenu } from './index'
import NewIncidentModal from '../NewIncidentModal'
import { lineTypes } from 'shared/Global'
import {hasPermission} from 'shared/Permission'
import IncidentSnackbar from 'components/common/Snackbar'

export default class Toolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedObj: props.selectedObj || null,
      cmap: props.cmap || null,
      displayColorPicker: false,
      displayLineType: false,
      displayDevices: false,
      headerCollapsed: false,
      isOpenSnackbar: false,
      newIncident: null 
    }

    this.lineTypes = lineTypes
    this.loadLineTypes()
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount () {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick, false)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.newIncident !== newProps.newIncident) {
      console.log(newProps.newIncident)
      this.setState({
        isOpenSnackbar: true,
        newIncident: {
          message: newProps.newIncident.description, 
          incident: newProps.newIncident
        }
      })
    }
  }

  loadLineTypes () {

  }

  renderLineTypes (popover, cover) {
    if (!this.state.displayLineType) return null
    return (
      <LineTypesMenu
        popover={popover}
        cover={cover}
        lineTypes={this.lineTypes}
        toogle={this.toggleLineTypes.bind(this)}
        onChoose={this.onClickLineType.bind(this)}
      />
    )
  }


  hideDeviceMenu () {
    this.setState({
      displayDevices: false,
      displayLineType: false
    })
  }

    // ///////////////////////////////////////

  onClickColorPicker () {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  onCloseColorPicker () {
    this.setState({ displayColorPicker: false })
  }

  onChangeColorPicker (color) {
    this.props.onChangeLineColor(color.hex)
  }

    // ///////////////////////////////////////

  onClickMaximize () {
    this.props.onClickMaximize()
  }

  toggleLineTypes () {
    this.setState({ displayLineType: !this.state.displayLineType })
  }

  onClickLineType (item) {
    this.toggleLineTypes()
    let type = item['type']
    let imgUrl = item['image']
    this.props.onChangeLineType(type, imgUrl)
  }

  onClickToggleMapHeader () {
    // TODO
    // this.setState({ headerCollapsed: !this.state.headerCollapsed })
  }

  onClickMapEdit () {
    console.log('edit map')
    this.props.onClickEdit()
  }

  onClickEditMapUndo () {
    // TODO
  }

  onClickDeviceMenu (e) {
    let event = e.nativeEvent
    event.stopPropagation()
    this.toggleDevices()
  }

  toggleDevices () {
    let isDevicesDisplayed = this.state.displayDevices
    this.setState({
      displayDevices: !isDevicesDisplayed
    })
  }

  renderBody () {

  }

  onClickNewIncident () {
    this.props.openDashboardNewIncidentModal()
  }

  renderNewIncidentModal () {
    if (!this.props.newIncidentModalOpen) return
    return (
      <NewIncidentModal onClose={this.props.closeDashboardNewIncidentModal} />
    )
  }

  renderNewIncidentPopup() {
    if (!this.state.isOpenSnackbar) return
    return (
      <IncidentSnackbar 
        newIncidentMsg={this.state.newIncident}
        onClose={() => this.setState({isOpenSnackbar: false})}
        action={false}
      />
    )
  }

  handleClick (e) {
    if (this.state.displayDevices) {
      let path = e.path
      let deviceMenuClicked = false
      for (let i = 0; i < path.length; i++) {
        if ((path[i].id === 'device-menu') || (path[i].id === 'device-menu-button')) {
          deviceMenuClicked = true
        }
      }
      if (!deviceMenuClicked) {
        this.toggleDevices()
      }
    }
  }

  render () {
    const {userInfo} = this.props
    const cmap = this.props.cmap
    const obj = this.props.selectedObj
    const line = obj ? cmap.selectedLine() : null
    const lineGroup = line ? line.objectSubType === MapItemType.ShapeLineGroup : false // eslint-disable-line no-undef
    const text = obj ? cmap.selectedText() : null
    const hub = obj ? cmap.selectedLonghub() : null
    const zooming = cmap && cmap.zooming === true
    const popover = {
      position: 'absolute',
      zIndex: '2',
      right: 0,
      top: '30px'
    }
    const cover = {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
    const lineTypes = this.renderLineTypes(popover, cover)

    const canEdit = hasPermission(userInfo, 'EditMap')
    return (
      <div className={`map-toolbar p-none ${this.state.headerCollapsed ? 'collapsed' : ''}`}>
        <MapMenu {...this.props}/>
        <ToolbarOptions
          onNewIncident={this.onClickNewIncident.bind(this)}
          onMaximize={this.onClickMaximize.bind(this)}
          onColorPick={this.onClickColorPicker.bind(this)}
          onPickerClose={this.onCloseColorPicker.bind(this)}
          onPickerChange={this.onChangeColorPicker.bind(this)}
          toggleLineTypes={this.toggleLineTypes.bind(this)}
          onMapEdit={this.onClickMapEdit.bind(this)}
          onEditMapUndo={this.onClickEditMapUndo.bind(this)}
          onDeviceMenu={this.onClickDeviceMenu.bind(this)}
          onToggle={this.onClickToggleMapHeader.bind(this)}
          obj={obj}
          line={line}
          lineGroup={lineGroup}
          lineTypes={lineTypes}
          zooming={zooming}
          text={text}
          hub={hub}
          popover={popover}
          cover={cover}
          isPickerDisplayed={this.state.displayColorPicker}
          isDevicesDisplayed={this.state.displayDevices}
          canEdit={canEdit}
          {...this.props}
        />
        {this.renderNewIncidentModal()}
        {this.renderNewIncidentPopup()}
      </div>
    )
  }
}

Toolbar.defaultProps = {
  onClickEdit: null,
  editable: false,
  maximized: false,
  selectedItem: {},
  onClickDeviceItem: null
}

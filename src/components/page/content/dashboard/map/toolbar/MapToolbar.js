import React, { Component } from 'react'
import { MapMenu, NewIncidentLabel, ToolbarOptions, ToolbarToggle, LineTypesMenu } from './index'
import NewIncidentModal from '../NewIncidentModal'
import { lineTypes } from '../../../../../../shared/Global'

export default class Toolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedObj: props.selectedObj || null,
      cmap: props.cmap || null,
      displayColorPicker: false,
      displayLineType: false,
      displayDevices: false,
      headerCollapsed: false
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

  loadLineTypes () {

  }

  renderLineTypes (popover, cover) {
    if (!this.state.displayLineType) return null
    return (
      <LineTypesMenu
        popover={popover}
        cover={cover}
        lineTypes={this.lineTypes}
        toogle={this.toggleLineTypes().bind(this)}
        onChoose={this.onClickLineType.bind(this)}
      />
    )
  }

    // ///////////////////////////////////////

  onClickAdd () {
    console.log('on click add')
    this.setState({
      displayDevices: !this.state.displayDevices
    }, () => {
      this.props.onClickAdd(this.state.displayDevices)
    })
  }

  hideDeviceMenu () {
    this.setState({
      displayDevices: false
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
    let deviceTypeId = item['typeid']
    let type = item['typename']
    let imgUrl = item['image']
    this.props.onChangeLineType(type, imgUrl, deviceTypeId)
  }

  onClickToggleMapHeader () {
    this.setState({ headerCollapsed: !this.state.headerCollapsed })
  }

  onClickMapEdit () {
    console.log('edit map')
    this.setState({ displayDevices: false }, () => {
      this.props.onClickAdd(this.state.displayDevices)
    })
  }

  onClickDeviceMenu () {

  }

  renderBody () {

  }

  handleClick (e) {
        // Detect device menu outer click
    console.log('handle click')
    if (this.state.displayDevices) {
      if (!this.refs.liDevices.contains(e.target)) {
        this.setState({ displayDevices: false }, () => {
          this.props.onClickAdd(this.state.displayDevices)
        })
      }
    }
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

  render () {
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
      left: '-40px',
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

    return (
      <div className={`panel-heading text-center map-heading ${this.state.headerCollapsed ? 'collapsed' : ''}`}>
        <MapMenu {...this.props}/>
        <NewIncidentLabel onNewIncident={this.onClickNewIncident.bind(this)}/>
        <ToolbarOptions
          onMaximize={this.onClickMaximize.bind(this)}
          onColorPick={this.onClickColorPicker.bind(this)}
          onPickerClose={this.onCloseColorPicker.bind(this)}
          onPickerChange={this.onChangeColorPicker.bind(this)}
          toggleLineTypes={this.toggleLineTypes.bind(this)}
          onMapEdit={this.onClickMapEdit.bind(this)}
          onDeviceMenu={this.onClickDeviceMenu.bind(this)}
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
          {...this.props}
        />
        <ToolbarToggle onToggle={this.onClickToggleMapHeader.bind(this)}/>
        {this.renderNewIncidentModal()}
      </div>
    )
  }
}

Toolbar.contextTypes = {
  sid: React.PropTypes.string
}

Toolbar.defaultProps = {
  onClickEdit: null,
  editable: false,
  maximized: false,
  selectedItem: {},
  onClickDeviceItem: null
}

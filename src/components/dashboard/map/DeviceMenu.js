import React from 'react'
import { concat } from 'lodash'

import DeviceImg from './DeviceImg'

export default class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: [{
        title: 'Add Existing Devices',
        items: []
      }, {
        title: 'Map Items',

        items: [{
          title: 'Device',
          img: 'build.png',
          template: 'mapItem'
        }, {
          title: 'Monitor',
          img: 'build.png',
          template: 'mapItem'
        }, {
          title: 'Product',
          img: 'build.png',
          template: 'mapItem'
        }]
      }],

      activePanel: 0
    }
  }

  componentWillMount () {
    this.props.fetchDeviceTemplates()
  }

  onChangeDeviceSearch (e) {
    let keyword = e.target.value
    this.setState({keyword})
  }

  onClickItem (item, e) {
    const {onClickItem} = this.props
    onClickItem && onClickItem(item, {
      clientX: e.clientX,
      clientY: e.clientY
    })
  }

  handleSelect (activePanel) {
    this.setState({ activePanel })
  }

  getNewDevices () {
    const {allDevices, selectedMap} = this.props
    if (!selectedMap) return []
    return allDevices.filter(p => !p.line && (!p.mapids || !p.mapids.includes(selectedMap.id)))
  }

  render () {
    let devicePanels = []

    let deviceTypes = concat([], this.state.deviceTypes)
    const categories = []
    this.props.deviceTemplates.forEach(p => {
      if (categories.indexOf(p.devicetemplategroup) < 0) categories.push(p.devicetemplategroup)
    })
    categories.sort()

    categories.forEach(deviceCategory => {
      const items = this.props.deviceTemplates.filter(i => i.devicetemplategroup === deviceCategory).map(u => {
        return {
          title: u.name,
          img: u.image || 'windows.png',
          template: u
        }
      })
      if (items.length === 0) return
      deviceTypes = concat(deviceTypes, {
        title: deviceCategory,
        items
      })
    })

    let hasActive = false
    let firstPanelIndex = 0

    deviceTypes.forEach((section, sectionIndex) => {
      let items = false

      if (sectionIndex === 0) {

      } else {
        section.items.forEach((item, typeIndex) => {
          if ((item.title || '').toLowerCase().indexOf(this.state.keyword.toLowerCase()) < 0) return
          items = true
        })

        if (!items) return
      }
      if (firstPanelIndex < 0) firstPanelIndex = sectionIndex
      if (sectionIndex === this.state.activePanel) hasActive = true
    })
    const activeKey = !hasActive && firstPanelIndex >= 0 ? firstPanelIndex : this.state.activePanel

    deviceTypes.forEach((section, sectionIndex) => {
      let deviceItems = []

      if (sectionIndex === 0) {
        const newDevices = this.getNewDevices()
        newDevices.forEach(p => {
          if (!p.name || p.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) < 0) return
          const item = {
            id: p.id,
            title: p.name,
            img: p.image || 'windows.png',
            template: p.templateName
          }

          deviceItems.push(
            <li key={p.id} onClick={this.onClickItem.bind(this, item)}>
              <DeviceImg {...item}/>
            </li>
          )
        })
      } else {
        section.items.forEach((item, typeIndex) => {
          const selected = this.props.selectedItem.title === item.title

          if (item.title.toLowerCase().indexOf(this.state.keyword.toLowerCase()) < 0) return
          deviceItems.push(
            <li key={typeIndex} className={selected ? 'active' : ''} onClick={this.onClickItem.bind(this, item)}>
              <DeviceImg {...item}/>
            </li>
          )
        })

        if (!deviceItems.length) return
      }

      devicePanels.push(
        <div className="panel panel-default" key={sectionIndex} onClick={this.handleSelect.bind(this, sectionIndex)}>
          <div className="panel-heading">
            <div className="link">{section.title === 'DEVICES' ? 'Add New Devices' : section.title}</div>
          </div>
          <ul className={activeKey === sectionIndex ? '' : 'hidden'} style={{background: 'black'}}>
            {deviceItems}
          </ul>
        </div>
      )
    })

    return (
      <div id="device-menu" className="panel-group devicediv" style={{top: '45px'}}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="navbar-search" style={{paddingLeft: '5px'}}>
              <input type="text" placeholder="Search …" className="form-control" onChange={this.onChangeDeviceSearch.bind(this)}/>
              <button className="btn btn-default btn-sm" onClick={this.props.onNewIncident}>Add Incident</button>
            </div>
          </div>
        </div>

        <div>
          {devicePanels}
        </div>
      </div>
    )
  }
}

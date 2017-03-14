import React from 'react'
import {
    PanelGroup,
    Panel
} from 'react-bootstrap'
import { concat } from 'lodash'

import DeviceImg from './DeviceImg'

export default class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: [{
        title: 'New Devices',
        items: []
      }]
    }
  }

  componentWillMount () {
    this.props.fetchDeviceCategories()
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

  render () {
    let devicePanels = []

    let deviceTypes = concat([], this.state.deviceTypes)
    this.props.deviceCategories.forEach(deviceCategory => {
      const items = this.props.deviceTemplates.filter(i => i.devicetemplategroup === deviceCategory.name).map(u => {
        return {
          title: u.name,
          img: u.image || 'windows.png',
          template: u
        }
      })
      if (items.length === 0) return
      deviceTypes = concat(deviceTypes, {
        title: deviceCategory.name,
        items
      })
    })

    deviceTypes.forEach((section, sectionIndex) => {
      let deviceItems = []

      if (sectionIndex > 0) {
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
        <Panel header= {section.title} key={sectionIndex} eventKey={sectionIndex}>
          <ul>
            {deviceItems}
          </ul>
        </Panel>
      )
    })

    return (
      <div id="device-menu" className="panel-group devicediv" style={{top: '32px'}}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="navbar-search" style={{paddingLeft: '5px', paddingRight: '5px'}}>
              <input type="text" placeholder="Search …" className="form-control"
                onChange={this.onChangeDeviceSearch.bind(this)}/>
              <button className="btn" type="submit" disabled>
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </div>

        <PanelGroup defaultActiveKey={2} accordion>
          {devicePanels}
        </PanelGroup>
      </div>
    )
  }
}

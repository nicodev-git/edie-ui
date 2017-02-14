import React from 'react'
import {
    PanelGroup,
    Panel
} from 'react-bootstrap'
import { concat } from 'lodash'

import DeviceImg from './DeviceImg'

const sections = [
  ['Group', 'GROUPS'],
  ['Device', 'DEVICES'],
  ['BI', 'BI'],
  ['Shape', 'SHAPES']
]

export default class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: [{
        title: 'New Devices',
        items: []
      }/*, {
        title: 'Group',
        items: [
          {title: 'Group', img: 'group.png', type: 'group'},
          {title: 'Telephony', img: 'telephony.png', type: 'group'},
          {title: 'Jetro', img: 'jetro.png', type: 'group'},
          {title: 'Customers', img: 'building2.png', type: 'group'},
          {title: 'DR Site', img: 'building1.png', type: 'group'},
          {title: 'Partners', img: 'partners.png', type: 'group'}
        ]
      }, {
        title: 'Devices',
        items: [{
          title: 'Windows Server', img: 'windows.png', type: 'server'
        }, {
          title: 'Linux Server', img: 'linux.png', type: 'linuxserver'
        }, {
          title: 'Router', img: 'router.png', type: 'router'
        }, {
          title: 'Firewall', img: 'firewall.png', type: 'firewall'
        }, {
          title: 'Internet', img: 'inticon.png', type: 'internet'
        }, {
          title: 'Website', img: 'website.png', type: 'website'
        }, {
          title: 'Custom Device', img: 'pcs.png', type: 'custom'
        }, {
          title: 'Oracle DB', img: 'db2.png', type: 'db-oracle'
        }, {
          title: 'MSSQL DB', img: 'db2.png', type: 'db-mssql'
        }, {
          title: 'MySQL DB', img: 'db2.png', type: 'db-mysql'
        }, {
          title: 'PC', img: 'pcs.png', type: 'pc'
        }, {
          title: 'Antivirus', img: 'antivirus.png', type: 'antivirus'
        }, {
          title: 'NAC', img: 'nac.png', type: 'nac'
        }, {
          title: 'Safend', img: 'usb.png', type: 'safend'
        }, {
          title: 'IPS', img: 'ips.png', type: 'ips'
        }]
      }, {
        title: 'BI',
        items: [{
          title: 'Pie Chart', img: 'graph.png', type: 'bi-pie'
        }, {
          title: 'Bar Chart', img: 'graph.png', type: 'bi-bar'
        }, {
          title: 'Line Chart', img: 'graph.png', type: 'bi-line'
        }, {
          title: 'Gauge', img: 'sqlgaugeicon.png', type: 'bi-gauge'
        }, {
          title: 'Temperature', img: 'thermo.png', type: 'bi-temperature'
        }]
      }, {
        title: 'Shapes',
        items: [{
          title: 'Long hub', img: 'longhub.png', type: 'longhub'
        }, {
          title: 'Free Text', img: 'text.png', type: 'usertext'
        }]
      } */]
    }

        // ///////////////////////////////////////////////
  }

  // componentWillMount () {
  //   this.props.fetchDeviceTemplates()
  // }

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
    sections.forEach(section => {
      const items = this.props.deviceTemplates.filter(i => i.devicetemplategroup === section[1]).map(u => {
        return {
          title: u.name,
          img: u.image || 'windows.png',
          type: u.devicetemplategroup === 'GROUPS' ? 'group' : 'custom',
          monitors: u.monitors
        }
      })
      if (items.length === 0) return
      deviceTypes = concat(deviceTypes, {
        title: section[0],
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
              <DeviceImg img={item.img} type={item.type} title={item.title}/>
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
      <div className="panel-group devicediv" style={{top: '32px'}}>
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

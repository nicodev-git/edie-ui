import React from 'react'
import DeviceImg from './DeviceImg'

import {
    PanelGroup,
    Panel
} from 'react-bootstrap'

export default class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: [{
        title: 'Devices',
        items: [{
          title: 'Windows Server', img: 'window.png', type: 'server'
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
      }]
    }

        // ///////////////////////////////////////////////
  }

  render () {
    let devicePanels = []

    this.state.deviceTypes.forEach((section, sectionIndex) => {
      let deviceItems = []

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

                <PanelGroup defaultActiveKey={0} accordion>
                    {devicePanels}
                </PanelGroup>
            </div>
    )
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
    // //////////////////////////////////////////////////////////////
}
DeviceMenu.defaultProps = {
  selectedItem: {},
  onClickItem: null
}

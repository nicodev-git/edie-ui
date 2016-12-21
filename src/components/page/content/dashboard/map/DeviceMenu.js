import React from 'react'
import {
    PanelGroup,
    Panel
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { concat } from 'lodash'

import DeviceImg from './DeviceImg'
import {
    fetchDeviceTemplates
} from '../../../../../actions'

class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: [{
        title: 'New Devices',
        items: []
      }, {
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

  componentWillMount () {
    this.props.fetchDeviceTemplates()
  }

  render () {
    let devicePanels = []

    let deviceTypes = concat(this.state.deviceTypes, {
      title: 'Template',
      items: this.props.deviceTemplates.map(u => {
        return {
          title: u.name, img: u.image || 'window.png', type: 'custom', monitors: u.monitors
        }
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

function mapStateToProps (state) {
  return {
    deviceTemplates: state.settings.deviceTemplates
  }
}

const actions = {
  fetchDeviceTemplates
}
export default connect(mapStateToProps, actions)(DeviceMenu)

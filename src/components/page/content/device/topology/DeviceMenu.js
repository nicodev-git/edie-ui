import React from 'react'
import DeviceImg from './DeviceImg'

import {
    PanelGroup,
    Panel
} from 'react-bootstrap'

const sections = [
  ['Device', 'DEVICES'],
  ['BI', 'BI'],
  ['Shape', 'SHAPES']
]
export default class DeviceMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

      keyword: '',
      deviceTypes: []
    }
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

    let deviceTypes = []
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

      deviceTypes.push({
        title: section[0],
        items
      })
    })

    deviceTypes.forEach((section, sectionIndex) => {
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
              <input type="text" placeholder="Search …" className="form-control" onChange={this.onChangeDeviceSearch.bind(this)}/>
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
}
DeviceMenu.defaultProps = {
  selectedItem: {},
  onClickItem: null
}

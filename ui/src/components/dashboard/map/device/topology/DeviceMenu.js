import React from 'react'
import DeviceImg from './DeviceImg'

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

    const categories = []
    this.props.deviceTemplates.forEach(p => {
      if (categories.indexOf(p.devicetemplategroup) < 0) categories.push(p.devicetemplategroup)
    })
    categories.sort()

    categories.forEach(deviceCategory => {
      if (deviceCategory.name === 'GROUPS') return
      const items = this.props.deviceTemplates.filter(i => i.devicetemplategroup === deviceCategory.name).map(u => {
        return {
          title: u.name,
          img: u.image || 'windows.png',
          template: u
        }
      })
      if (items.length === 0) return

      deviceTypes.push({
        title: deviceCategory.name,
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
            <DeviceImg {...item}/>
          </li>
        )
      })

      if (!deviceItems.length) return

      devicePanels.push(
        <div className="panel panel-default" header= {section.title} key={sectionIndex} eventKey={sectionIndex}>
          <ul>
            {deviceItems}
          </ul>
        </div>
      )
    })

    return (
      <div className="panel-group devicediv" id="device-menu" style={{top: '32px'}}>
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="navbar-search" style={{paddingLeft: '5px', paddingRight: '5px'}}>
              <input type="text" placeholder="Search …" className="form-control" onChange={this.onChangeDeviceSearch.bind(this)}/>
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
DeviceMenu.defaultProps = {
  selectedItem: {},
  onClickItem: null
}

import React from 'react'
import {Select, MenuItem} from '@material-ui/core'
import { Modal } from 'components/modal/parts'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class DeviceTplPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: ''
    }
  }
  onChangeCategory (e) {
    const value = e.target.value
    this.setState({
      category: value
    })
  }
  renderTpl (tpl, i) {
    return (
      <AppletCard
        key={tpl.id}
        color={colors[i % colors.length]}
        name={tpl.devicetemplategroup}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => this.props.onClickItem(tpl)}
      />
    )
  }

  getTemplates () {
    const {exclude, deviceTemplates} = this.props
    if (!exclude || !exclude.length) return deviceTemplates
    return deviceTemplates.filter(p => !exclude.includes(p.devicetemplategroup))
  }

  getCategories () {
    const categories = []// this.props.deviceCategories
    this.getTemplates().forEach(p => {
      if (categories.indexOf(p.devicetemplategroup) < 0) categories.push(p.devicetemplategroup)
    })
    categories.sort()
    return categories
  }

  render () {
    const {onHide} = this.props
    const {category} = this.state

    return (
      <Modal title="Devices" onRequestClose={onHide} contentStyle={{width: 996, maxWidth: 'initial'}}>
        <Select value={category} onChange={this.onChangeCategory.bind(this)}>
          <MenuItem value="">[All]</MenuItem>
          {this.getCategories().map(p =>
            <MenuItem key={p} value={p}>{p}</MenuItem>
          )}
        </Select>
        <ul className="web-applet-cards">
          {this.getTemplates().filter(p => !category || p.devicetemplategroup === category).map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}

import React from 'react'
import { Modal } from 'components/modal/parts'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class DeviceTplPicker extends React.Component {
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
    this.props.deviceTemplates.forEach(p => {
      if (categories.indexOf(p.devicetemplategroup) < 0) categories.push(p.devicetemplategroup)
    })
    categories.sort()
  }

  render () {
    const {onHide} = this.props

    return (
      <Modal title="Devices" onRequestClose={onHide} contentStyle={{width: 996, maxWidth: 'initial'}}>

        <ul className="web-applet-cards" style={{marginTop: 40}}>
          {this.getTemplates().map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}

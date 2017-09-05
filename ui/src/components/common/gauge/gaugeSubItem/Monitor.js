import React from 'react'
import {SelectField, MenuItem} from 'material-ui'
import {findIndex} from 'lodash'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class Monitor extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedItem: null
    }
    this.onChange = this.onChange.bind(this)
  }
  getMonitorImage (monitortype) {
    const {monitorTemplates} = this.props
    const index = findIndex(monitorTemplates, {monitortype})
    if (index < 0) return '/'

    // const {monitor}
  }
  onChange (event, key, payload) {
    this.setState({selectedItem: payload})
  }
  renderTpl (tpl, i) {
    const {onClickMenuItem} = this.props
    return (
      <AppletCard
        key={tpl.uid}
        color={colors[i % colors.length]}
        name={tpl.monitortype}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => onClickMenuItem(tpl)}
      />
    )
  }
  render () {
    const {devices} = this.props
    const {selectedItem} = this.state
    const monitors = selectedItem ? (selectedItem.monitors || []) : []

    return (
      <div>
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Devices"
            value={selectedItem}
            className="valign-top"
            onChange={this.onChange}
          >
            {(devices || []).map(p =>
              <MenuItem key={p.id} value={p} primaryText={p.name}/>
            )}
          </SelectField>
        </div>
        <div>
          <ul className="web-applet-cards">
            {monitors.map(this.renderTpl.bind(this))}
          </ul>
        </div>
      </div>
    )
  }
}
import React from 'react'

import { Modal } from 'components/modal/parts'
import { extImageBaseUrl } from 'shared/Global'

export default class MonitorPickModalView extends React.Component {
  renderTpl (tpl) {
    return (
      <li key={tpl.id} className="web-applet-card">
        <div className="applet-card-body " style={{background: '#2468ff'}}>
          <div className="padding-md">
            <img src={`${extImageBaseUrl}${tpl.image}`} alt="" height="48"/><br/>
            {tpl.name}
          </div>
        </div>
      </li>
    )
  }

  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onHide} contentStyle={{width: 1000, maxWidth: 'initial'}}>
        <ul className="web-applet-cards">
          {this.props.templates.map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}

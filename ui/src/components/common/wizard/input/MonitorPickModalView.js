import React from 'react'

import { Modal } from 'components/modal/parts'
import { extImageBaseUrl } from 'shared/Global'

export default class MonitorPickModalView extends React.Component {
  renderTpl (tpl) {
    return (
      <li key={tpl.id} className="web-applet-card">
        <div className="applet-card-body " style={{background: '#2468ff'}}>
          <div className="content">
            <div className="card-top">
              <img src={`${extImageBaseUrl}${tpl.image}`} alt="" height="50"/><br/>
            </div>
            <span className="title">
              {tpl.name}
            </span>
            <p className="author">
              by&nbsp;<span><b>Securegion</b></span>&nbsp;
              <img alt="Verified" src="/resources/images/common/wizard/verified.svg" />
            </p>
          </div>
          <div className="meta">
            {tpl.description}&nbsp;
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

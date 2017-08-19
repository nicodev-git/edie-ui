import React from 'react'

import { Modal } from 'components/modal/parts'
import { extImageBaseUrl } from 'shared/Global'

const colors = '#2468ff #963484 #222629 #3cba54 #999999 #D1282C'.split(' ')

export default class MonitorPickModalView extends React.Component {
  renderTpl (tpl, i) {
    return (
      <li key={tpl.id} className="web-applet-card">
        <div className="applet-card-body " style={{background: colors[i % colors.length]}}>
          <div className="content">
            <div className="card-top">
              <img src={`${extImageBaseUrl}${tpl.image}`} alt="" height="50"/><br/>
            </div>
            <span className="title">
              {tpl.description}&nbsp;
            </span>
            <p className="author">
              by&nbsp;<span><b>Securegion</b></span>&nbsp;
              <img alt="Verified" src="/resources/images/common/wizard/verified.svg" />
            </p>
          </div>
          <div className="meta">
            {tpl.name}&nbsp;
          </div>
        </div>
      </li>
    )
  }

  render () {
    const {onHide} = this.props
    return (
      <Modal title="Monitors" onRequestClose={onHide} contentStyle={{width: 1112, maxWidth: 'initial'}}>
        <ul className="web-applet-cards" style={{marginTop: 40}}>
          {this.props.templates.map(this.renderTpl.bind(this))}
        </ul>
      </Modal>
    )
  }
}

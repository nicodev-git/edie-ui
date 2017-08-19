import React from 'react'

export default class AppletCard extends React.Component {
  render () {
    const {name, desc, img, color, className} = this.props
    return (
      <li className={`web-applet-card ${className}`}>
        <div className="applet-card-body " style={{background: color}}>
          <div className="content">
            <div className="card-top">
              <img src={img} alt=""/><br/>
            </div>
            <span className="title">
              {desc}&nbsp;
            </span>
            <p className="author">
              by&nbsp;<span><b>Securegion</b></span>&nbsp;
              <img alt="Verified" src="/resources/images/common/wizard/verified.svg" />
            </p>
          </div>
          <div className="meta">
            {name}&nbsp;
          </div>
        </div>
      </li>
    )
  }
}

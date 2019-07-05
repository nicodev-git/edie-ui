import React from 'react'

export default class AccelMeterView extends React.Component {
  render () {
    const {value, title} = this.props
    return (
      <div>
        {title}
        <div className="ant-progress ant-progress-line ant-progress-status-normal ant-progress-show-info">
          <div>
            <div className="ant-progress-outer">
              <div className="ant-progress-inner">
                <div className="ant-progress-bg" style={{width: `${value}%`, height: 16}}>
                </div>
              </div>
            </div>
            <span className="ant-progress-text">{value}%</span>
          </div>
        </div>
      </div>
    )
  }
}

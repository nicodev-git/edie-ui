import React from 'react'

const style = {
  minHeight: '250px'
}
export default class ContentPanel extends React.Component {
  render () {
    const {width, title} = this.props
    return (
      <div className={`col-md-${width}`}>
        <div className="panel panel-gray">
          <div className="panel-heading">
            {title}
          </div>
          <div className="panel-body" style={style}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

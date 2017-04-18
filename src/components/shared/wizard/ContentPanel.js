import React from 'react'

const style = {
  header: {
    background: '#B7B8BA',
    color: 'white'
  },
  body: {
    minHeight: '250px',
    paddingTop: 0
  }
}
export default class ContentPanel extends React.Component {
  render () {
    const {width, title} = this.props
    return (
      <div className={`col-md-${width}`}>
        <div className="panel panel-gray">
          <div className="panel-heading" style={style.header}>
            {title}
          </div>
          <div className="panel-body" style={style.body}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

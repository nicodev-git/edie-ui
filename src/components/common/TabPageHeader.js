import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

export default class TabPageHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {useToolBar, titleStyle, headerClassName} = this.props
    return (
      <div className="tab-header">
        <div>
          <span className="tab-title valign-middle" style={titleStyle}>{this.props.title}</span>
          {this.props.titleOptions}
          <div className="pull-right">
            {this.props.headerOptions}
          </div>
        </div>
        {useToolBar ? (
          <Toolbar style={{background: '#D7D7D7', marginTop: 24}}>
            {this.props.children}
          </Toolbar>
        ) : (
          <div className={headerClassName || "margin-md-top"} style={{...this.props.style, width: '100%'}}>
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}

TabPageHeader.defaultProps = {
  title: ''
}

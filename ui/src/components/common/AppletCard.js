import React from 'react'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import EditIcon from 'material-ui/svg-icons/image/edit'
import ViewIcon from 'material-ui/svg-icons/action/pageview'

const editButtonStyle = {
  position: 'absolute',
  right: 15,
  bottom: 8
}

export default class AppletCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hovered: false
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter () {
    this.setState({
      hovered: true
    })
  }

  onMouseLeave () {
    this.setState({
      hovered: false
    })
  }
  render () {
    const {
      name, desc, desc2, desc3, img, color, className,
      rightIcons,
      onClick, onClickDelete, onClickEdit, onClickView
    } = this.props
    const {hovered} = this.state
    return (
      <li className={`web-applet-card small ${className}`} onClick={onClickDelete ? null : onClick}>
        <div
          className="applet-card-body " style={{background: color}}
          onMouseEnter={onClickDelete ? this.onMouseEnter : null}
          onMouseLeave={onClickDelete ? this.onMouseLeave : null}>
          <div className="content">
            <div className="card-top">
              <img src={img} alt="" onClick={onClickDelete ? onClick : null}/>
              <div className={`pull-right link info-button ${hovered ? 'visible' : ''}`} style={{marginRight: -10, marginTop: -10}}>
                {onClickDelete && <CloseIcon size={32} color="white" onTouchTap={onClickDelete}/>}
              </div>
            </div>
            <span className="title" onClick={onClickDelete ? onClick : null}>
              {desc}&nbsp;
            </span>
            <p className="author" onClick={onClickDelete ? onClick : null}>
              <span>{desc2}</span>
            </p>
            <p className="author" onClick={onClickDelete ? onClick : null}>
              <span>{desc3}</span>
            </p>
          </div>
          <div className="meta" onClick={onClickDelete ? onClick : null}>
            {name}&nbsp;
            <div style={editButtonStyle}>
              {rightIcons}
              {onClickView && <ViewIcon size={32} color="white" onTouchTap={onClickView}/>}
              {onClickEdit && <EditIcon size={32} color="white" onTouchTap={onClickEdit}/>}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import ViewIcon from '@material-ui/icons/Pageview'

const editButtonStyle = {
  position: 'absolute',
  right: 15,
  bottom: 4
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

  onClickDelete (e) {
    const {onClickDelete} = this.props
    onClickDelete && onClickDelete()

    e.stopPropagation()
  }

  onClick (e) {
    const {onClick} = this.props
    onClick && onClick()
  }

  onClickView (e) {
    const {onClickView} = this.props
    onClickView && onClickView()

    e.stopPropagation()
  }

  onClickEdit (e) {
    const {onClickEdit} = this.props
    onClickEdit && onClickEdit()

    e.stopPropagation()
  }

  render () {
    const {
      name, descTitle, desc, desc2, desc3, img, color, className,
      rightIcons, verified,
      onClickDelete, onClickEdit, onClickView,
      titleLimit
    } = this.props
    const {hovered} = this.state
    return (
      <div className={`web-applet-card small ${className || ''}`} onClick={this.onClick.bind(this)}>
        <div
          className="applet-card-body " style={{background: color}}
          onMouseEnter={onClickDelete ? this.onMouseEnter : null}
          onMouseLeave={onClickDelete ? this.onMouseLeave : null}>
          <div className="content">
            <div className="card-top">
              <img src={img} alt="" />
              <div className={`pull-right link info-button ${hovered ? 'visible' : ''}`}>
                {onClickDelete && <CloseIcon size={32} nativeColor="white" onClick={this.onClickDelete.bind(this)}/>}
              </div>
            </div>
            <span className={`title ${(desc || '').length > (titleLimit || 45) ? 'title-sm' : ''}`}>
              {descTitle}{descTitle ? <br/> : ''}
              {desc}&nbsp;
            </span>
            <p className="author">
              {verified && <span>by&nbsp;<b>Securegion</b>&nbsp;</span>}
              {verified && <img alt="Verified" src="/resources/images/common/wizard/verified.svg" />}
              <span>{desc2}<br/>{desc3}<br/></span>
            </p>
          </div>
          <div className="meta">
            {name}&nbsp;
            <div style={editButtonStyle}>
              {rightIcons}
              {onClickView && <ViewIcon size={32} nativeColor="white" onClick={this.onClickView.bind(this)}/>}
              {onClickEdit && <EditIcon size={32} nativeColor="white" onClick={this.onClickEdit.bind(this)}/>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

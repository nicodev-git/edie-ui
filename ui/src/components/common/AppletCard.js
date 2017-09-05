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
  render () {
    const {name, desc, img, color, className, onClick, onClickDelete, onClickEdit, onClickView} = this.props
    return (
      <li className={`web-applet-card small ${className}`} onClick={onClickDelete ? null : onClick}>
        <div className="applet-card-body " style={{background: color}}>
          <div className="content">
            <div className="card-top">
              <img src={img} alt="" onClick={onClickDelete ? onClick : null}/>
              <div className="pull-right" style={{marginRight: -10, marginTop: -10}}>
                {onClickDelete && <CloseIcon size={32} color="white" onTouchTap={onClickDelete}/>}
              </div>
            </div>
            <span className="title" onClick={onClickDelete ? onClick : null}>
              {desc}&nbsp;
            </span>
            <p className="author" onClick={onClickDelete ? onClick : null}>
              by&nbsp;<span><b>Securegion</b></span>&nbsp;
              <img alt="Verified" src="/resources/images/common/wizard/verified.svg" />
            </p>
          </div>
          <div className="meta" onClick={onClickDelete ? onClick : null}>
            {name}&nbsp;
            <div style={editButtonStyle}>
              {onClickView && <ViewIcon size={32} color="white" onTouchTap={onClickView}/>}
              {onClickEdit && <EditIcon size={32} color="white" onTouchTap={onClickEdit}/>}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

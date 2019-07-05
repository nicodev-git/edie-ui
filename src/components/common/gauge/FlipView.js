import React from 'react'
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Close'
import MinimizeIcon from '@material-ui/icons/IndeterminateCheckBox'
import MaximizeIcon from '@material-ui/icons/AspectRatio'
import RefreshIcon from '@material-ui/icons/Refresh'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {Paper} from '@material-ui/core'

// import {paperZDepth} from 'style/common/materialStyles'

const basicTitleStyle = {
  fontSize: 14,
  color: 'rgba(0, 0, 0, 0.54)',
  height: 48,
  paddingLeft: 20,
  paddingTop: 16
}

export default class FlipView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      flip: false,
      clicked: false,
      hovered: false,

      editModalOpen: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  getFlipClass () {
    var flippedCSS = this.state.flip ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedCSS =  "";
    return flippedCSS
  }

  onClickFlip (e) {
    // const {onClickFlip} = this.props
    // this.setState({flip: !this.state.flip, clicked: true})
    // e && e.preventDefault()
    //
    // onClickFlip && onClickFlip()
    this.setState({
      editModalOpen: !this.state.editModalOpen
    })
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

  renderInfoIcon () {
    const {hovered} = this.state
    const {onClickDelete, onClickMinimize, onClickMaximize, onClickRefresh, gauge, viewOnly, noDelete} = this.props
    return (
      <div
        style={{position: 'absolute', right: 5, bottom: 5, zIndex: 20}}
        className={`link info-button ${hovered ? 'visible' : ''}`}>
        {onClickRefresh && <RefreshIcon onClick={() => onClickRefresh(gauge)}/>}
        {
          gauge.minimized ? (
            <MaximizeIcon onClick={() => onClickMaximize(gauge)} className={onClickMaximize ? '' : 'hidden'}/>
          ) : (
            <MinimizeIcon onClick={() => onClickMinimize(gauge)} className={onClickMinimize ? '' : 'hidden'}/>
          )
        }
        {!noDelete && <DeleteIcon onClick={() => onClickDelete(gauge)}/>}
        {!viewOnly && <InfoIcon size={24} onClick={this.onClickFlip.bind(this)}/>}
      </div>
    )
  }

  renderFront () {
    const {renderFrontView} = this.props
    return (
      <div className="flex-vertical flex-1">
        {renderFrontView && renderFrontView()}
      </div>
    )
  }

  renderBack () {
    const {renderBackView} = this.props
    return renderBackView && renderBackView({
      onClickFlip: this.onClickFlip.bind(this)
    })
  }

  renderCard (cls, children, front) {
    const {title, gauge, loading, onClickModalView, paperStyle, hideTitle, bodyStyle, titleStyle} = this.props
    return (
      <div className={`${cls} ${this.getFlipClass()}`}>
        <div className="flex-vertical" style={{height: '100%'}}>
          {
            front ? (
              gauge.minimized ? (
                <div
                  className="flex-1 text-center"
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onClick={() => onClickModalView(gauge)}>
                  <img src="/resources/images/dashboard/gauge.png" width="48" alt=""/><br/>
                  {gauge.name}
                  {this.renderInfoIcon()}
                </div>
              ) : (
                <Paper className="flex-1 flex-vertical"
                       style={paperStyle}
                       onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                  {!hideTitle && <div style={{...basicTitleStyle, ...titleStyle}}>
                    {title || gauge.name}
                  </div>}
                  <div className="flex-1 flex-vertical" style={bodyStyle || {padding: '16px 20px 35px'}}>
                    {children}
                  </div>
                  {this.renderInfoIcon()}
                  {loading && front && <RefreshOverlay />}
                </Paper>
              )
            ) : (
              <div className="flex-1">
                {children}
              </div>
            )
          }

        </div>
      </div>
    )
  }

  render () {
    const {className, style, modalView} = this.props
    const {editModalOpen} = this.state

    if (modalView) {
      return this.props.renderFrontView()
    }

    return (
      <div className={`${className || ''} card`} style={style}>
        {/*{this.renderCard('card-back', this.renderBack())}*/}
        {editModalOpen && this.renderBack()}
        {this.renderCard('card-front', this.renderFront(), true)}
      </div>
    )
  }
}

import React from 'react'
import InfoIcon from 'material-ui/svg-icons/action/info'
import DeleteIcon from 'material-ui/svg-icons/navigation/close'
import MinimizeIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box'
import MaximizeIcon from 'material-ui/svg-icons/action/aspect-ratio'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {Paper} from 'material-ui'

export default class FlipView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      flip: false,
      clicked: false,
      hovered: false
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
    const {onClickFlip} = this.props
    this.setState({flip: !this.state.flip, clicked: true})
    e && e.preventDefault()

    onClickFlip && onClickFlip()
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
    const {onClickDelete, onClickMinimize, onClickMaximize, gauge} = this.props
    return (
      <div
        style={{position: 'absolute', right: 10, bottom: 10, zIndex: 1}}
        className={`link info-button ${hovered ? 'visible' : ''}`}>
        {
          gauge.minimized ? (
            <MaximizeIcon onTouchTap={() => onClickMaximize(gauge)}/>
          ) : (
            <MinimizeIcon onTouchTap={() => onClickMinimize(gauge)}/>
          )
        }

        <DeleteIcon onTouchTap={() => onClickDelete(gauge)}/>
        <InfoIcon size={24} onClick={this.onClickFlip.bind(this)}/>
      </div>
    )
  }

  renderFront () {
    const {renderFrontView, viewOnly} = this.props
    return (
      <div
        className="flex-vertical flex-1"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {renderFrontView && renderFrontView()}
        {!viewOnly && this.renderInfoIcon()}
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
    const {gauge, loading, viewOnly, onClickModalView} = this.props
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
                  {!viewOnly && this.renderInfoIcon()}
                </div>
              ) : (
                <Paper className="flex-1 flex-vertical">
                  <div
                    className="padding-sm-left padding-sm-top padding-sm-right"
                    style={{fontSize: 14}}>
                    {gauge.name}
                  </div>
                  {children}
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
    // const {flip} = this.state

    if (modalView) {
      return this.props.renderFrontView()
    }

    return (
      <div className={`${className || ''} card`} style={style}>
        {this.renderCard('card-back', this.renderBack())}
        {this.renderCard('card-front', this.renderFront(), true)}
      </div>
    )
  }
}

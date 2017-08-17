import React from 'react'
import InfoIcon from 'material-ui/svg-icons/action/info'
import DeleteIcon from 'material-ui/svg-icons/navigation/close'

import RefreshOverlay from 'components/common/RefreshOverlay'

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
    const {onClickDelete, gauge} = this.props
    return (
      <div
        style={{position: 'absolute', right: 10, bottom: 10, zIndex: 1}}
        className={`link info-button ${hovered ? 'visible' : ''}`}>
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
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}>
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
    const {gauge, loading} = this.props
    return (
      <div className={`${cls} ${this.getFlipClass()}`}>
        <div className="flex-vertical" style={{height: '100%'}}>
          {
            front ? (
              <div className="panel panel-white flex-vertical flex-1">
                <div className="tab-box-container text-center text-ellipsis">
                  <div className="tab-box">
                    {gauge.name}
                  </div>
                </div>
                <div className="panel-body p-none flex-vertical flex-1">
                  {children}
                  {loading && front && <RefreshOverlay />}
                </div>
              </div>
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
    const {className, style} = this.props
    const {flip} = this.state
    return (
      <div className={`${className || ''} card`} style={style}>
        {this.renderCard('card-back', flip && this.renderBack())}
        {this.renderCard('card-front', this.renderFront(), true)}
      </div>
    )
  }
}

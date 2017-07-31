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

  onClickFlip () {
    this.setState({flip: !this.state.flip, clicked: true})
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
    return (
      <div
        style={{position: 'absolute', right: -8, bottom: -10}}
        className={`link info-button ${hovered ? 'visible' : ''}`}
        onClick={this.onClickFlip.bind(this)}>
        <InfoIcon size={24}/>
      </div>
    )
  }

  renderFront () {
    // return (
    //   <GaugeFrontView
    //     {...this.props} {...this.state} onClickFlip={this.onClickFlip.bind(this)}
    //   />
    // )
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
    // return (
    //   <GaugeBackView
    //     {...this.props} {...this.state} onClickDone={this.onClickDone.bind(this)}
    //     onChangeSplitBy={this.onChangeSplitBy.bind(this)}
    //     onChangeSplitUnit={this.onChangeSplitUnit.bind(this)}
    //     onChangeSearch={this.onChangeSearch.bind(this)}
    //     onChangeName={this.onChangeName.bind(this)}
    //     onChangeDuration={this.onChangeDuration.bind(this)}
    //     onChangeDurationUnit={this.onChangeDurationUnit.bind(this)}
    //     onChangeResource={this.onChangeResource.bind(this)}
    //   />
    // )
    const {renderBackView} = this.props
    return renderBackView && renderBackView({
      onClickFlip: this.onClickFlip.bind(this)
    })
  }

  renderCard (cls, children, front) {
    const {gauge, loading, onClickDelete} = this.props
    return (
      <div className={`${cls} ${this.getFlipClass()}`}>
        <div className="flex-vertical" style={{height: '100%'}}>
          <div className="panel panel-blue flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title">{gauge.name}</h4>
              <div className="panel-options">
                <DeleteIcon color="#545454" className="link" onTouchTap={() => onClickDelete(gauge)}/>
              </div>
            </div>
            <div className="panel-body pt-none flex-vertical flex-1">
              {children}
              {loading && front && <RefreshOverlay />}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const {className, style} = this.props
    return (
      <div className={`${className || ''} card`} style={style}>
        {this.renderCard('card-back', this.renderBack())}
        {this.renderCard('card-front', this.renderFront(), true)}
      </div>
    )
  }
}

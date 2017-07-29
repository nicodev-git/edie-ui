import React from 'react'

import RefreshOverlay from 'components/common/RefreshOverlay'

export default class FlipView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      flip: false,
      clicked: false
    }
  }

  getFlipClass () {
    var flippedCSS = this.state.flip ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedCSS =  "";
    return flippedCSS
  }

  renderFront () {
    // return (
    //   <GaugeFrontView
    //     {...this.props} {...this.state} onClickFlip={this.onClickFlip.bind(this)}
    //   />
    // )
    return (
      <div>

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
  }

  renderCard (cls, children, front) {
    const {gauge, loading} = this.props
    return (
      <div className={`${cls} ${this.getFlipClass()}`}>
        <div className="flex-vertical" style={{height: '100%'}}>
          <div className="panel panel-blue flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title">{gauge.name}</h4>
              <div className="panel-options">
                <DeleteIcon color="#545454" className="link" onTouchTap={() => this.onClickDelete(gauge)}/>
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
    const {className, style, backView, frontView} = this.props
    return (
      <div className={`${className || ''} card`} style={style}>
        {this.renderCard('card-back', this.renderBack())}
        {this.renderCard('card-front', this.renderFront())}
      </div>
    )
  }
}

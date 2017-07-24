import React from 'react'
import GaugeView from './GaugeView'

export default class GaugePanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flip: false,
      clicked: false
    }
  }

  onClickFlip () {
    this.setState({flip: !this.state.flip, clicked: true})
  }

  getFlipClass () {
    var flippedCSS = this.state.flip ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedCSS =  "";
    return flippedCSS
  }

  renderGauge () {
    const {gauge, graphType, params} = this.props
    return (
      <GaugeView gauge={gauge} graphType={graphType} params={params} onClickFlip={this.onClickFlip.bind(this)}/>
    )
  }

  renderCard (cls, children) {
    const {gauge} = this.props
    return (
      <div className={`${cls} ${this.getFlipClass()}`}>
        <div className="flex-vertical" style={{height: '100%'}}>
          <div className="panel panel-blue flex-vertical flex-1">
            <div className="panel-heading">
              <h4 className="panel-title">{gauge.name}</h4>
            </div>
            <div className="panel-body flex-vertical flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="col-md-4 margin-sm-bottom card" style={{height: 350}}>
        {this.renderCard('card-back', <div>Back View</div>)}
        {this.renderCard('card-front', this.renderGauge())}
      </div>
    )
  }
}

import React from 'react'
import axios from 'axios'

import GaugeFrontView from './GaugeFrontView'
import GaugeBackView from './GaugeBackView'

import { ROOT_URL } from 'actions/config'

export default class GaugePanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flip: false,
      clicked: false,
      splitBy: 1,
      splitUnit: 'day',

      loading: true,
      searchRecordCounts: []
    }
  }
  componentWillMount () {
    this.fetchRecordCount()
  }
  fetchRecordCount () {
    const {splitBy, splitUnit} = this.props
    const params = { ...this.props.params, splitBy, splitUnit }
    axios.get(`${ROOT_URL}/search/getRecordCount`, {params}).then(res => {
      this.setState({
        searchRecordCounts: res.data,
        loading: false
      })
    })
  }

  onClickFlip () {
    this.setState({flip: !this.state.flip, clicked: true})
  }

  onChangeSplitBy (e) {
    this.setState({splitBy: e.target.value}, () => {
      this.fetchRecordCount()
    })
  }
  onChangeSplitUnit (e) {
    this.setState({splitUnit: e.target.value}, () => {
      this.fetchRecordCount()
    })
  }

  getFlipClass () {
    var flippedCSS = this.state.flip ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedCSS =  "";
    return flippedCSS
  }

  renderGaugeFront () {
    return (
      <GaugeFrontView
        {...this.state} {...this.props} onClickFlip={this.onClickFlip.bind(this)}
      />
    )
  }

  renderGaugeBack () {
    return (
      <GaugeBackView
        {...this.state} {...this.props} onClickFlip={this.onClickFlip.bind(this)}
        onChangeSplitBy={this.onChangeSplitBy.bind(this)}
        onChangeSplitUnit={this.onChangeSplitUnit.bind(this)}
      />
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
        {this.renderCard('card-back', this.renderGaugeBack())}
        {this.renderCard('card-front', this.renderGaugeFront())}
      </div>
    )
  }
}

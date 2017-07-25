import React from 'react'
import axios from 'axios'
import {findIndex} from 'lodash'
import {IconButton} from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

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

      selectedSearch: props.gauge.params.savedSearch,
      graphType: props.gauge.params.graph,
      searchParams: props.searchParams,
      name: props.gauge.name,

      loading: true,
      searchRecordCounts: []
    }
  }
  componentWillMount () {
    this.fetchRecordCount()
  }
  fetchRecordCount () {
    const {splitBy, splitUnit, searchParams} = this.state
    const params = { ...searchParams, splitBy, splitUnit }
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

  onChangeSearch (e, i, value) {
    const index = findIndex(this.props.searchList, {id: value})
    if (index < 0) {
      console.log('Saved search not found.')
      return
    }
    const savedSearch = this.props.searchList[index]
    try {
      const searchParams = JSON.parse(savedSearch.data)

      this.setState({
        selectedSearch: value,
        searchParams
      }, () => {
        this.fetchRecordCount()
      })
    } catch (e) {
      console.log(e)
    }
  }

  onChangeGraphType (e, index, value) {
    this.setState({
      graphType: value
    })
  }

  onChangeName (e, value) {
    this.setState({
      name: value
    })
  }

  onClickDelete () {

  }

  getFlipClass () {
    var flippedCSS = this.state.flip ? " card-back-flip" : " card-front-flip";
    if (!this.state.clicked) flippedCSS =  "";
    return flippedCSS
  }

  renderGaugeFront () {
    return (
      <GaugeFrontView
        {...this.props} {...this.state} onClickFlip={this.onClickFlip.bind(this)}
      />
    )
  }

  renderGaugeBack () {
    return (
      <GaugeBackView
        {...this.props} {...this.state} onClickFlip={this.onClickFlip.bind(this)}
        onChangeSplitBy={this.onChangeSplitBy.bind(this)}
        onChangeSplitUnit={this.onChangeSplitUnit.bind(this)}
        onChangeSearch={this.onChangeSearch.bind(this)}
        onChangeGraphType={this.onChangeGraphType.bind(this)}
        onChangeName={this.onChangeName.bind(this)}
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
              <div className="panel-options">
                <IconButton
                  onTouchTap={this.onClickDelete.bind(this)}
                  style={{width: 24, height: 24}}>
                  <DeleteIcon color="#545454"/>
                </IconButton>
              </div>
            </div>
            <div className="panel-body pt-none flex-vertical flex-1">
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

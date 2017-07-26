import React from 'react'
import axios from 'axios'
import {findIndex} from 'lodash'
import moment from 'moment'
import DeleteIcon from 'material-ui/svg-icons/navigation/close'

import GaugeFrontView from './GaugeFrontView'
import GaugeBackView from './GaugeBackView'

import { ROOT_URL } from 'actions/config'

import {showConfirm} from "components/common/Alert"
import { dateFormat } from 'shared/Global'

export default class GaugePanel extends React.Component {
  constructor (props) {
    super(props)

    const {params} = props.gauge
    this.state = {
      flip: false,
      clicked: false,

      duration: params.duration || 3,
      durationUnit: params.durationUnit || 'day',
      splitBy: params.splitBy || 1,
      splitUnit: params.splitUnit || 'day',

      selectedSearch: params.savedSearch,
      graphType: params.graph,
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
    const {duration, durationUnit, splitBy, splitUnit, searchParams} = this.state

    const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).format(dateFormat)
    const dateTo = moment().endOf(durationUnit).format(dateFormat)

    const params = { ...searchParams, splitBy, splitUnit, dateFrom, dateTo }
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
    this.setState({splitBy: e.target.value})
  }
  onChangeSplitUnit (e) {
    this.setState({splitUnit: e.target.value})
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

  onChangeDuration (e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDurationUnit (e) {
    this.setState({
      durationUnit: e.target.value
    })
  }

  onClickDelete (gauge) {
    showConfirm('Click OK to remove.', btn => {
      if (btn !== 'ok') return
      this.props.removeGroupDevice(gauge)
    })
  }

  onClickDone () {
    this.onClickFlip()

    const {gauge} = this.props
    const device = {
      ...gauge,
      name: this.state.name,
      params: {
        ...gauge.params,

        duration: this.state.duration,
        durationUnit: this.state.durationUnit,
        splitBy: this.state.splitBy,
        splitUnit: this.state.splitUnit,
        graph: this.state.graphType,
        savedSearch: this.state.selectedSearch
      }
    }

    this.fetchRecordCount()
    this.props.updateGroupDevice(device)
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
        {...this.props} {...this.state} onClickDone={this.onClickDone.bind(this)}
        onChangeSplitBy={this.onChangeSplitBy.bind(this)}
        onChangeSplitUnit={this.onChangeSplitUnit.bind(this)}
        onChangeSearch={this.onChangeSearch.bind(this)}
        onChangeGraphType={this.onChangeGraphType.bind(this)}
        onChangeName={this.onChangeName.bind(this)}
        onChangeDuration={this.onChangeDuration.bind(this)}
        onChangeDurationUnit={this.onChangeDurationUnit.bind(this)}
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
                <DeleteIcon color="#545454" className="link" onTouchTap={() => this.onClickDelete(gauge)}/>
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
    const {className, style} = this.props
    return (
      <div className={`${className || ''} card`} style={style}>
        {this.renderCard('card-back', this.renderGaugeBack())}
        {this.renderCard('card-front', this.renderGaugeFront())}
      </div>
    )
  }
}

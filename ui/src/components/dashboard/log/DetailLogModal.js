import React from 'react'
import { keys, reverse } from 'lodash'
import $ from 'jquery'

import DetailLogModalView from './DetailLogModalView'
import { encodeUrlParams } from 'shared/Global'
import { ROOT_URL } from 'actions/config'

export default class DetailLogModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount () {
    const {detailLogViewParam} = this.props
    $.get(`${ROOT_URL}/search/all?${encodeUrlParams({
      ...detailLogViewParam,
      sortDir: 'desc'
    })}`).done(res => {
      const embedded = res._embedded
      const data = reverse(embedded[keys(embedded)[0]])
      this.setState({data: [...data, ...this.state.data]})
    })

    $.get(`${ROOT_URL}/search/all?${encodeUrlParams({
      ...detailLogViewParam,
      dateFromEpoch: detailLogViewParam.dateToEpoch + 1,
      dateToEpoch: 0,
      sortDir: 'asc'
    })}`).done(res => {
      const embedded = res._embedded
      const data = embedded[keys(embedded)[0]]
      this.setState({data: [...this.state.data, ...data]})
    })
  }

  onHide () {
    this.props.showDetailLogModal(false)
  }

  render () {
    return (
      <DetailLogModalView
        onHide={this.onHide.bind(this)}
        rowId={this.props.detailLogViewParam.rowId}
        items={this.state.data}
      />
    )
  }
}

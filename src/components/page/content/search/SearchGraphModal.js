import React from 'react'

import {SearchGraphModalView} from 'components/modal'

export default class SearchGraphModal extends React.Component {
  componentWillMount () {
    const {params, fetchSearchRecordCount} = this.props
    fetchSearchRecordCount(params)
  }
  onClickClose () {
    this.props.showSearchGraphModal(false)
  }
  render () {
    const {searchRecordCounts} = this.props
    const chartData = {
      labels: searchRecordCounts.map(p => p.date),
      datasets: [{
        data: searchRecordCounts.map(p => p.count),
        borderWidth: 1,
        borderColor: '#269C8B',
        fill: false
      }]
    }
    const chartOptions = {
      elements: {
        line: {
          tension: 0
        }
      }
    }
    return (
      <SearchGraphModalView
        chartData={chartData}
        chartOptions={chartOptions}
        onHide={this.onClickClose.bind(this)}
      />
    )
  }
}

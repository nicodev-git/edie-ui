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
    $.get(`${ROOT_URL}/search/all?${encodeUrlParams(this.props.detailLogViewParam)}`).done(res => {
      const embedded = res._embedded
      let data = embedded[keys(embedded)[0]]

      // data = data.map(d => ({
      //   ...d,
      //   entity: this.getHighlighted(d.entity, d.highlights)
      // }))
      //
      if (this.props.revertRows) data = reverse(data)

      this.setState({data})
    })
  }

  onHide () {
    this.props.showDetailLogModal(false)
  }

  render () {
    return (
      <DetailLogModalView
        onHide={this.onHide.bind(this)}
        items={this.state.data}
      />
    )
  }
}

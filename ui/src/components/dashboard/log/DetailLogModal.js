import React from 'react'
import { keys, reverse } from 'lodash'
import DetailLogModalView from './DetailLogModalView'

export default class DetailLogModal extends React.Component {
  componentWillMount () {
    $.get(`${ROOT_URL}${url}?${encodeUrlParams(urlParams)}`).done(res => {
      const embedded = res._embedded
      let data = embedded[keys(embedded)[0]]

      // data = data.map(d => ({
      //   ...d,
      //   entity: this.getHighlighted(d.entity, d.highlights)
      // }))
      //
      if (this.props.revertRows) data = reverse(data)

      this.setState(data)
    })
  }

  onHide () {
    this.props.showDetailLogModal(false)
  }

  render () {
    return (
      <DetailLogModalView {...this.props}/>
    )
  }
}

import React from 'react'
import DetailLogModalView from './DetailLogModalView'

export default class DetailLogModal extends React.Component {
  componentWillMount () {

  }

  render () {
    return (
      <DetailLogModalView {...this.props}/>
    )
  }
}

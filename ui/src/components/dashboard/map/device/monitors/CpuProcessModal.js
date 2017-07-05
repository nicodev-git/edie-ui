import React from 'react'
import CpuProcessModalView from './CpuProcessModalView'

export default class CpuProcessModal extends React.Component {
  onClickClose () {

  }
  render () {
    return (
      <CpuProcessModalView
        onHide={this.onClickClose.bind(this)}
      />
    )
  }
}

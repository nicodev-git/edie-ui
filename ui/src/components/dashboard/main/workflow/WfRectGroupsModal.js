import React from 'react'

export default class WfRectGroupsModal extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <WfRectGroupsModalView
        onHide={onHide}
      />
    )
  }
}

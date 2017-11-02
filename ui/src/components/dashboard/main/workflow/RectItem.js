import React from 'react'

import AppletCard from 'components/common/AppletCard'

export default class RectItem extends React.Component {
  render () {
    const {rect, onClick, onClickDelete} = this.props
    return (
      <AppletCard
        color="#3cba54"
        desc={rect.name}
        img="/resources/images/dashboard/workflow.png"
        onClick={onClick}
        onClickDelete={onClickDelete}
      />
    )
  }
}

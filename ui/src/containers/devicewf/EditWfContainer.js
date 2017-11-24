import React from 'react'
import EditWf from 'components/devicewf/EditWf'

export default class EditWfContainer extends React.Component {
  render () {
    return (
      <EditWf
        {...this.props}
      />
    )
  }
}

import React from 'react'

import WfRectModalView from './WfRectModalView'

export default class WfRectModal extends React.Component {
  onSubmit (values) {

  }
  render () {
    const {handleFormSubmit} = this.props
    return (
      <WfRectModalView
        searchList={[]}
        onSubmit={handleFormSubmit(this.onSubmit.bind(this))}/>
    )
  }
}

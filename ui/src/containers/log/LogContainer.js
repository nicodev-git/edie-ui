import React from 'react'

import Log from 'components/log/Log'

export default class LogContainer extends React.Component {
  render () {
    return (
      <Log {...this.props}/>
    )
  }
}

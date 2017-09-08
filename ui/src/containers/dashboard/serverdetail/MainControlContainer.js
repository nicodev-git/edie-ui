import React from 'react'

import MainControl from 'components/dashboard/serverdetail/MainControl'

export default class MainControlContainer extends React.Component {
  render () {
    return (
      <MainControl {...this.props}/>
    )
  }
}

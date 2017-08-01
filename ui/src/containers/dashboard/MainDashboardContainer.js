import React from 'react'
import MainDashboard from 'components/dashboard/main/MainDashboard'

export default class MainDashboardContainer extends React.Component {
  render () {
    return (
      <MainDashboard {...this.props}/>
    )
  }
}

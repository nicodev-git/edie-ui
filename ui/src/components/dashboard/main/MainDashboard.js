import React from 'react'
import {Route} from 'react-router-dom'

import MainDashboardRoute from 'containers/dashboard/MainDashboardRouteContainer'

export default class MainDashboard extends React.Component {
  // componentWillMount () {
  //   this.props.selectGaugeBoard(null)
  //   this.props.fetchGaugeBoards()
  // }
  // componentWillUpdate (nextProps) {
  //   const {gaugeBoards} = nextProps
  //   if (!this.props.gaugeBoards.length && gaugeBoards.length) {
  //     const {id} = parse(this.props.location.search || {})
  //     let index = -1
  //     if (id) index = findIndex(gaugeBoards, {id})
  //
  //     nextProps.selectGaugeBoard(gaugeBoards[index >= 0 ? index : 0].id, nextProps.history)
  //   }
  // }
  componentDidMount () {
    console.log(this.props.match)
  }
  render () {
    return (
      <Route path="/dashboard/:id" component={MainDashboardRoute}/>
    )
  }
}

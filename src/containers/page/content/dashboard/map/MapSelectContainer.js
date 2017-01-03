import React from 'react'
import MapSelect from '../../../../../components/page/content/dashboard/map/MapSelect'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { findIndex } from 'lodash'

import { fetchMaps, changeMap } from '../../../../../actions'

@connect(
  state => ({
    maps: state.dashboard.maps,
    selectedMap: state.dashboard.selectedMap
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMaps,
      changeMap
    }, dispatch)
  })
)
export default class MapSelectContainer extends React.Component {
  render () {
    return (
      <MapSelect {...this.props} />
    )
  }
}

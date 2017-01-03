import React from 'react'
import MapMenu from '../../../../../components/page/content/dashboard/map/MapMenu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addMap, updateMap, deleteMap, openMapImportModal } from '../../../../../actions'

@connect(
  state => ({
    maps: state.dashboard.maps,
    selectedMap: state.dashboard.selectedMap,
    mapImportModalVisible: state.dashboard.mapImportModalVisible
  }),
  dispatch => ({
    ...bindActionCreators({
      addMap,
      updateMap,
      deleteMap,
      openMapImportModal
    }, dispatch)
  })
)
export default class MapMenuContainer extends React.Component {
  render () {
    return (
      <MapMenu {...this.props} />
    )
  }
}

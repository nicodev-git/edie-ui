import React from 'react'
import MapModal from '../../../../../components/page/content/settings/maps/MapModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    addSettingMap,
    updateSettingMap,
    closeSettingMapModal
} from '../../../../../actions'

@connect(
  state => ({
    editMap: state.settings.editMap,
    initialValues: state.settings.editMap
  }),
  dispatch => ({
    ...bindActionCreators({
      addSettingMap,
      updateSettingMap,
      closeSettingMapModal
    }, dispatch)
  })
)
export default class MapModalContainer extends React.Component {
  render () {
    return (
      <MapModal {...this.props} />
    )
  }
}

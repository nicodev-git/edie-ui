import React from 'react'
import MapImportModal from '../../../../../components/page/content/dashboard/map/MapImportModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { importMap, closeMapImportModal } from '../../../../../actions'

@connect(
  dispatch => ({
    ...bindActionCreators({
      importMap, closeMapImportModal
    }, dispatch)
  })
)
export default class MapImportModalContainer extends React.Component {
  render () {
    return (
      <MapImportModal {...this.props} />
    )
  }
}

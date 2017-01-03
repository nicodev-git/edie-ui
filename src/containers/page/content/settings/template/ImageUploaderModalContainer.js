import React from 'react'
import ImageUploaderModal from '../../../../../components/page/content/settings/template/ImageUploaderModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeTplImageModal, uploadImage, fetchImages } from '../../../../../actions'

@connect(
  state => ({ customImages: state.dashboard.images }),
  dispatch => ({
    ...bindActionCreators({
      closeTplImageModal,
      fetchImages,
      uploadImage
    }, dispatch)
  })
)
export default class ImageUploaderModalContainer extends React.Component {
  render () {
    return (
      <ImageUploaderModal {...this.props} />
    )
  }
}

ImageUploaderModal.defaultProps = {
  selected: {}
}

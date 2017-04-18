import React from 'react'
import { ImageUploader } from 'components/modal/parts'

import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'

export default class IconUploader extends React.Component {
  onClickChange () {
    this.props.openTplImageModal()
  }
  componentWillReceiveProps (nextProps) {
    const {config, values, selectedTplImage, onChange} = this.props
    if (config && values) {
      if (selectedTplImage !== nextProps.selectedTplImage) {
        onChange && onChange()
      }
    }
  }
  getImageUrl () {
    const {config, values, selectedTplImage} = this.props

    let imgUrl = ''
    if (selectedTplImage) {
      imgUrl = getCustomImageUrl(selectedTplImage)
    } else if (values && config.name) {
      imgUrl = extImageBaseUrl + values[config.name]
    }
    return imgUrl
  }
  render () {
    return (
      <ImageUploader imgUrl={this.getImageUrl()} onChange={this.onClickChange.bind(this)}/>
    )
  }
}

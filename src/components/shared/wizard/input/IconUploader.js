import React from 'react'
import { ImageUploader } from 'components/modal/parts'

import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'

export default class IconUploader extends React.Component {
  onChange () {
    this.props.openTplImageModal()
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
      <div className="col-md-12">
        <ImageUploader imgUrl={this.getImageUrl()} onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}

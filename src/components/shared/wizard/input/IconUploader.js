import React from 'react'
import { ImageUploader } from 'components/modal/parts'

export default class IconUploader extends React.Component {
  onChange () {

  }
  render () {
    const {config, values} = this.props
    const imgUrl = values[config.name]
    return (
      <div className="col-md-12">
        <ImageUploader imgUrl={imgUrl} onChange={this.onChange.bind(this)}/>
      </div>
    )
  }
}

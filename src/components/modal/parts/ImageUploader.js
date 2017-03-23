import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from '../../../style/materialStyles'

const ImageUploader = ({imgUrl, onChange}) => (
  <div className="image-upload-container">
    <img className="file-preview icon-black" src={imgUrl}/>
    <FlatButton label="Upload" onClick={onChange} style={buttonStyle} labelStyle={buttonTextStyle}/>
  </div>
)

export default ImageUploader

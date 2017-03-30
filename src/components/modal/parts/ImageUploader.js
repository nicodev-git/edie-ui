import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { primeButtonStyle, primeButtonLabelStyle } from 'style/materialStyles'

const ImageUploader = ({imgUrl, onChange}) => (
  <div className="image-upload-container">
    <RaisedButton label="Upload Image" onClick={onChange}
      buttonStyle={primeButtonStyle} labelStyle={primeButtonLabelStyle}/>
    <img src={imgUrl}/>
  </div>
)

export default ImageUploader

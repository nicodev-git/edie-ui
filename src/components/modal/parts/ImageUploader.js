import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { primeButtonStyle, primeButtonLabelStyle } from 'style/materialStyles'

const ImageUploader = ({imgUrl, onChange}) => (
  <div className="image-upload-container margin-top-20">
    <RaisedButton label="Choose" onClick={onChange}
      buttonStyle={primeButtonStyle} labelStyle={primeButtonLabelStyle}/>
    <img className={(imgUrl !== '') ? 'file-preview icon-black' : ''} src={imgUrl}/>
  </div>
)

export default ImageUploader

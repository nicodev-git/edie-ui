import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { primeButtonStyle, primeButtonLabelStyle } from 'style/common/materialStyles'

const ImageUploader = ({imgUrl, onChange}) => (
  <div className="image-upload-container">
    {!imgUrl && <RaisedButton label="Choose" onClick={onChange}
      buttonStyle={primeButtonStyle} labelStyle={primeButtonLabelStyle}/>}
    <img onClick={onChange} style={{cursor: 'pointer'}} className={(imgUrl !== '') ? 'file-preview icon-black' : ''} src={imgUrl}/>
  </div>
)

export default ImageUploader

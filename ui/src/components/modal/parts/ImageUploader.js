import React from 'react'
import Button from 'material-ui/Button'
import { primeButtonStyle, primeButtonLabelStyle } from 'style/common/materialStyles'

const ImageUploader = ({imgUrl, onChange, className}) => (
  <div className={`image-upload-container ${className || ''}`}>
    {!imgUrl && <Button variant="raised" label="Choose" onClick={onChange}
      buttonStyle={primeButtonStyle} />}
    <img onClick={onChange} style={{cursor: 'pointer'}} className={(imgUrl !== '') ? 'file-preview icon-black' : ''} src={imgUrl} alt=""/>
  </div>
)

export default ImageUploader

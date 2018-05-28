import React from 'react'
import Button from '@material-ui/core/Button'

const ImageUploader = ({imgUrl, onChange, className}) => (
  <div className={`image-upload-container ${className || ''}`}>
    {!imgUrl && <Button variant="raised" onClick={onChange}>Choose</Button>}
    <img onClick={onChange} style={{cursor: 'pointer'}} className={(imgUrl !== '') ? 'file-preview icon-black' : ''} src={imgUrl} alt=""/>
  </div>
)

export default ImageUploader

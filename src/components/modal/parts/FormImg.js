import React from 'react'
import Dropzone from 'react-dropzone'

const FormImg = (field) => {
  const file = field.input.value
  return (
    <div className="image-container">
      <Dropzone
        name={field.name}
        multiple={false}
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {file && (<div className="image-uploader"><img src={file[0].preview}/></div>)}
    </div>
  )
}

export default FormImg

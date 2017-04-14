import React from 'react'
import Dropzone from 'react-dropzone'

const style = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  verticalAlign: 'middle'
}

const FormImg = (field) => {
  let files = field.input.value
  return (
    <div className="image-container">
      <Dropzone
        name={field.name}
        style={style}
        onDrop={(filesToUpload, e) => {
          let value = field.input.onChange(filesToUpload)
          console.log(filesToUpload)
          return value
        }}
      >
        {files
          ? (<img src="/images/upload_file.png" style={{position: 'relative'}}/>)
          : (<img src="/images/upload_file.png" style={{position: 'relative'}}/>)}
        </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && (<img src={files[0].preview}/>)}
    </div>
  )
}

export default FormImg

import React from 'react'
import Button from '@material-ui/core/Button'
import { buttonStyle } from 'style/common/materialStyles'

const UploadFile = ({onChangeFile}) => (
  <div className="pull-left upload-file">
    <Button variant="raised" style={buttonStyle} >
      <input type="file" name="file" onChange={onChangeFile}/>
      Upload File
    </Button>
  </div>
)

export default UploadFile

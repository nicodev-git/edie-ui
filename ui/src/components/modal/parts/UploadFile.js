import React from 'react'
import Button from 'material-ui/Button'
import { buttonStyle, buttonTextStyle } from 'style/common/materialStyles'

const UploadFile = ({onChangeFile}) => (
  <div className="pull-left upload-file">
    <Button variant="raised" label="Upload File" style={buttonStyle} labelStyle={buttonTextStyle}>
      <input type="file" name="file" onChange={onChangeFile}/>
    </Button>
  </div>
)

export default UploadFile

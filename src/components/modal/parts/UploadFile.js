import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from 'style/materialStyles'

const UploadFile = ({onChangeFile}) => (
  <div className="pull-left upload-file">
    <FlatButton label="Upload File" style={buttonStyle} labelStyle={buttonTextStyle}>
      <input type="file" name="file" onChange={onChangeFile}/>
    </FlatButton>
  </div>
)

export default UploadFile

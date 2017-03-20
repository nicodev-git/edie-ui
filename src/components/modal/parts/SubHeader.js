import React from 'react'
import Subheader from 'material-ui/Subheader'
import { subHeaderStyle } from '../../../style/materialStyles'

const SubHeader = ({name}) => (
  <div style={subHeaderStyle}>
    <Subheader>{name}</Subheader>
  </div>
)

export default SubHeader

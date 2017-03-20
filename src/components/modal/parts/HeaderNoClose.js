import React from 'react'
import { headerStyle } from '../../../style/materialStyles'

const HeaderNoClose = ({name}) => (
  <div className="text-center padding-sm" style={headerStyle}>
    <h3 className="text-center">{name}</h3>
  </div>
)

export default HeaderNoClose

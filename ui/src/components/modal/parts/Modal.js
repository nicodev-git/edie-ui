import React from 'react'
import {Dialog} from 'material-ui'

import CloseIconButton from './CloseIconButton'
import { dialogBodyStyle, dialogTitleStyle } from 'style/common/materialStyles'

export default class Modal extends React.Component {
  render () {
    const {onRequestClose, title, contentStyle, className, modal} = this.props
    return (
      <Dialog
        open
        title={title}
        contentStyle={contentStyle}
        bodyStyle={dialogBodyStyle}
        titleStyle={dialogTitleStyle}
        onRequestClose={onRequestClose}
        className={className}
        modal={modal}
      >
        <CloseIconButton onClick={onRequestClose} color="white"/>
        {this.props.children}
      </Dialog>
    )
  }
}

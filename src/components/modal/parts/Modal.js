import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Dialog, DialogTitle} from '@material-ui/core'

import CloseIconButton from './CloseIconButton'
import {dialogBodyStyle, dialogTitleStyle, dialogTitleFontStyle} from 'style/common/materialStyles'

const styles = {
  title: dialogTitleStyle
}
class Modal extends React.Component {
  render() {
    const {onRequestClose, title, contentStyle, classes} = this.props

    // contentStyle={contentStyle}
    // bodyStyle={dialogBodyStyle}
    // titleStyle={dialogTitleStyle}
    // className={className}
    // modal={modal}
    return (
      <Dialog open maxWidth={false}>
        <DialogTitle classes={{root: classes.title}}>
          <span style={dialogTitleFontStyle}>{title}</span>
        </DialogTitle>
        {onRequestClose && <CloseIconButton onClick={onRequestClose} color="white"/>}
        <div style={dialogBodyStyle}>
          <div style={{width: 750, ...contentStyle}}>
            {this.props.children}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Modal)
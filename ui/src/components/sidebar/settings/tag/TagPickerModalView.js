import React from 'react'
import {Chip, Popover} from '@material-ui/core'
import {Select, MenuItem} from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

import {chipStyles} from 'style/common/materialStyles'

export default class TagPickerModalView extends React.Component {
  renderContent () {
    const {tags, value, onChangeValue} = this.props
    if (!tags || !tags.length) return null
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel>Severity</InputLabel>
          <Select
            value={value}
            onChange={onChangeValue}
          >
            {(tags || []).map((t, i) =>
              <MenuItem key={i} value={t}>{t}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderSelected () {
    const {selectedTags} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {
          selectedTags.map((p, i) =>
            <Chip key={i} style={chipStyles.chip} label={p}/>
          )
        }
      </div>
    )
  }

  render () {
    const {onClickClose, onClickOK, viewMode, anchorEl} = this.props
    if (viewMode === 'popover') {
      return (
        <Popover
          open
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          onClose={onClickClose}
          className="padding-md tag-picker"
          style={{maxWidth: 800, minWidth: 400}}
        >
          {this.renderContent()}
          {this.renderSelected()}
          <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
        </Popover>
      )
    }
    return (
      <Modal title="Tags" onRequestClose={onClickClose}>
        <CardPanel title="Tags" style={{zIndex: 10, position: 'relative'}}>
          <div style={{position: 'relative'}}>
            {this.renderContent()}
            {this.renderSelected()}
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name2="OK" action2={onClickOK}/>

      </Modal>
    )
  }
}

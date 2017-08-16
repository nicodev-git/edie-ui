import React from 'react'
import {Chip} from 'material-ui'
import {findIndex} from 'lodash'
import {blue300} from 'material-ui/styles/colors'

import {TwoButtonsBlockCustom, Modal} from 'components/modal/parts'

import {chipStyles} from 'style/common/materialStyles'

export default class TagPickerModalView extends React.Component {
  renderChip (w) {
    const {selectedTags, onSelectTag, onDeselectTag} = this.props
    const selected = findIndex(selectedTags, {id: w.id}) >= 0
    return (
      <Chip
        key={w.id} style={chipStyles.chip}
        backgroundColor={selected ? blue300 : null}
        onTouchTap={() => selected ? onDeselectTag(w) : onSelectTag(w)}>
        {w.name}
      </Chip>
    )
  }

  renderContent () {
    const {tags, onClickAdd, hideAdd} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {
          tags.map(this.renderChip.bind(this))
        }
        {!hideAdd && <Chip
          style={chipStyles.chip}
          onTouchTap={onClickAdd}>
          <b>+</b>
        </Chip>}
      </div>
    )
  }
  render () {
    const {onClickClose, onClickOK} = this.props
    return (
      <Modal title="Tags" onRequestClose={onClickClose}>
        {this.renderContent()}
        <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
      </Modal>
    )
  }
}

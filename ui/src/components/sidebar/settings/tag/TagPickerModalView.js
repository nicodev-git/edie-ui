import React from 'react'
import {Chip, Popover} from 'material-ui'
import {findIndex} from 'lodash'
import {blue300} from 'material-ui/styles/colors'
import Tags from 'react-material-tags'

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

  renderContent2 () {
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

  onAdd (addedTag, allTags) {
    this.props.onSelectTag(addedTag.label)
  }

  onRemove (removedTag, allTags) {
    this.props.onDeselectTag(removedTag.label)
  }

  renderContent () {
    const {tags} = this.props
    if (!tags || !tags.length) return null
    return (
      <Tags
        sourceTags={tags.map(p => ({label: p.name}))}
        onlyFromSource
        onAdd={this.onAdd.bind(this)}
        onRemove={this.onRemove.bind(this)}
      />
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
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={onClickClose}
          className="padding-md"
          style={{maxWidth: 800}}
        >
          {this.renderContent()}
          <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
        </Popover>
      )
    }
    return (
      <Modal title="Tags" onRequestClose={onClickClose}>
        {this.renderContent()}
        <TwoButtonsBlockCustom name2="OK" action2={onClickOK}/>

      </Modal>
    )
  }
}

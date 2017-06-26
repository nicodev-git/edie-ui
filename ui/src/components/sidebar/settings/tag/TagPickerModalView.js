import React from 'react'
import {Dialog, FlatButton, Chip} from 'material-ui'
import {findIndex} from 'lodash'
import {blue300} from 'material-ui/styles/colors'

import {TwoButtonsBlockCustom} from 'components/modal/parts'

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
    const {tags} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {
          tags.map(this.renderChip.bind(this))
        }
      </div>
    )
  }
  render () {
    const {onClickClose, onClickOK, onClickAdd, hideAdd} = this.props
    return (
      <Dialog open title="Tags" onRequestClose={onClickClose}>
        <div className={hideAdd ? 'hidden' : ''}>
          <FlatButton label="Add" onTouchTap={onClickAdd}/>
        </div>
        {this.renderContent()}
        <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
      </Dialog>
    )
  }
}

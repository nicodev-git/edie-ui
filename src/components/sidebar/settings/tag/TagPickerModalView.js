import React from 'react'
import {Dialog, FlatButton, Chip} from 'material-ui'

import {TwoButtonsBlockCustom} from 'components/modal/parts'

import {chipStyles} from 'style/materialStyles'

export default class TagPickerModalView extends React.Component {
  renderContent () {
    const {tags, selectedTags, onSelectTag, onDeselectTag} = this.props
    return (
      <div>
        <div style={chipStyles.wrapper}>
        {selectedTags.map((w, i) =>
          <Chip style={chipStyles.chip} onRequestDelete={() => onDeselectTag(w)}>{w.name}</Chip>
        )}
        </div>
        <div style={chipStyles.wrapper}>
        {
          tags.map((w, i) =>
            <Chip style={chipStyles.chip} onTouchTap={() => onSelectTag(w)}>{w.name}</Chip>
          )
        }
        </div>
      </div>
    )
  }
  render () {
    const {onClickClose, onClickOK, onClickAdd, showChips, hideAdd} = this.props
    return (
      <Dialog open title="Tags">
        <div className={hideAdd ? 'hidden' : ''}>
          <FlatButton label="Add" onTouchTap={onClickAdd}/>
        </div>
        {this.renderContent()}
        <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={showChips ? null : onClickOK}/>
      </Dialog>
    )
  }
}

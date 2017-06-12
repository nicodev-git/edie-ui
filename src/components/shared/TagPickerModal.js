import React from 'react'
import TagPickerModalView from 'components/modal'

export default class TagPickerModal extends React.Component {
  componentWillMount () {
    this.props.fetchTags()
  }
  onSelectTag (index) {
  }
  onClickOK () {
  }
  onClickClose () {
  }
  onClickAdd () {
  }
  render () {
    return (
      <TagPickerModalView
        {...this.props}
        onClickAdd={this.onClickAdd.bind(this)}
        onSelectTag={this.onSelectTag.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
      />
    )
  }
}

import React from 'react'
import TagPickerModalView from 'components/modal/TagPickerModal'

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
  render () {
    return (
      <TagPickerModalView
        {...this.props}
        onSelectTag={this.onSelectTag.bind(this)}
        onClickOK={this.onClickOK.bind(this)}
        onClickClose={this.onClickClose.bind(this)}
      />
    )
  }
}

import React from 'react'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

export default class ImportSyncDataModal extends React.Component {
  doAction (values) {
    console.log('doing some action when form submitted')
    console.log(values)
    if (typeof FormData !== 'undefined') {
      const formData = new FormData() // eslint-disable-line no-undef
      formData.append('file', values.file[0], values.file[0].name)
      formData.append('name', values.name)
      this.props.importSyncData(formData)
    }
  }

  render () {
    return (
      <SimpleModalContainer
        header="Import Sync Data"
        content={[]}
        doAction={this.doAction.bind(this)}
        onClose={this.props.onClose}
        fileUpload
      />
    )
  }
}

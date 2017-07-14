import React from 'react'
import {Dialog} from 'material-ui'

import {SubmitBlock} from 'components/modal/parts'

export default class MonitorWizardView extends React.Component {
  render () {
    const {header, onSubmit, onHide, paramEditModal, credPicker, tagsView} = this.props
    return (
      <Dialog open title={header}>
        <form onSubmit={onSubmit}>

          {tagsView}
          <SubmitBlock name="Finish" onClick={onHide}/>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}

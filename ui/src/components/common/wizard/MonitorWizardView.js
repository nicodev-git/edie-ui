import React from 'react'
import {Dialog} from 'material-ui'

import {SubmitBlock} from 'components/modal/parts'

export default class MonitorWizardView extends React.Component {
  render () {
    const {header, content, onSubmit, onHide, paramEditModal, credPicker} = this.props
    return (
      <Dialog open title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          {content}
          <SubmitBlock name="Finish" onCllick={onHide}/>
        </form>
        {paramEditModal}
        {credPicker}
      </Dialog>
    )
  }
}

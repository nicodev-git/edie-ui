import React from 'react'
import SimpleModalContainer from '../../../../../containers/modal/SimpleModalContainer'
import { validate } from '../../../../modal/validation/NameValidation'

class SimulationModal extends React.Component {
  constructor (props) {
    super(props)
    this.onClickClose = this.onClickClose.bind(this)
    this.onClickSave = this.onClickSave.bind(this)
  }

  onClickClose () {
    this.props.closeSimulationModal()
  }

  onClickSave () {
    // TODO
    this.onClickClose()
  }

  render () {
    let header = 'Simulation'
    let content = [
      {name: 'Text'},
      {name: 'Filter 1'},
      {name: 'Filter 2'},
      {name: 'Parser'}
    ]
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.onClickSave}
        onClose={this.onClickClose}
        validate={validate}
      />
    )
  }
}

export default SimulationModal

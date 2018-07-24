import React from 'react'
import {Field} from 'redux-form'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'


export default class SimulationModalView extends React.Component {
  renderContent () {
    const {collectors} = this.props
    return (
      <CardPanel>
        <div>
          <Field name="text"
                 component={FormInput}
                 floatingLabel="Text"
                 className="valign-top margin-md-right"
                 fullWidth
          />
        </div>

        <div>
          <Field name="connectorId"
                 component={FormSelect}
                 floatingLabel="Connector"
                 className="valign-top margin-md-right"
                 options={collectors.map(p => ({label: p.name, value: p.id}))}
                 style={{width: 200}}
          />
        </div>
      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose, wfSimulationState} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          {this.renderContent()}

          {wfSimulationState ? <RefreshOverlay/> : null}
          <SubmitBlock name="Post"/>
        </form>
      </Modal>
    )
  }
}
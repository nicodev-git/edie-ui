import React from 'react'
import {Field} from 'redux-form'

import { Tabs, Tab } from '@material-ui/core'

import {
  FormInput,
  FormSelect,
  Modal,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'


export default class SimulationModalView extends React.Component {
  renderTabContent () {
    const {tab} = this.props

    switch (tab) {
      case 'advanced':
        return this.renderAdvanced()
      default:
        return this.renderSimple()
    }
  }

  renderSimple () {
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

  renderAdvanced () {
    return (
      <CardPanel>

      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose, wfSimulationState, tab, onChangeTab} = this.props
    return (
      <Modal title="Simulation" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <Tabs value={tab} onChange={onChangeTab} scrollable scrollButtons="off">
            <Tab label="Simple" value="simple"/>
            <Tab label="Advanced" value="advanced"/>
          </Tabs>

          {this.renderTabContent()}

          {wfSimulationState ? <RefreshOverlay/> : null}
          <SubmitBlock name="Post"/>
        </form>
      </Modal>
    )
  }
}
import React from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'

import {
  FormInput,
  FormSelect,
  Modal,
  CardPanel
} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'


export default class SimulationModalView extends React.Component {
  renderMessages () {
    const {allValues} = this.props
    const {testCaseId} = allValues || {}
    if (!testCaseId) return null
    return (
      <CardPanel title="Messages">

      </CardPanel>
    )
  }
  renderContent () {
    const {collectors, testGroups, testCases, onClickAddGroup, onClickAddCase, allValues} = this.props
    const {groupId} = allValues || {}
    return (
      <CardPanel title="Tests" tools={<AddIcon onClick={onClickAddCase} className="link"/>}>
        <div>
          <Field name="groupId"
                 component={FormSelect}
                 floatingLabel="Test Group"
                 options={testGroups.map(p => ({label: p.name, value: p.id}))}
                 style={{minWidth: 200}}
                 className="valign-middle"
          />
          <AddIcon onClick={onClickAddGroup} className="link valign-middle margin-sm-top"/>
        </div>
        <div className="hidden">
          <Field name="testCaseId"
                 component={FormSelect}
                 floatingLabel="Test Case"
                 options={testCases.filter(p => p.groupId === groupId).map(p => ({label: p.name, value: p.id}))}
                 style={{minWidth: 200}}
                 className="valign-middle"
          />
        </div>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Test Case</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {testCases.filter(p => p.groupId === groupId).map(p =>
              <tr key={p.id}>
                <td>{p.name}</td>
                <td></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>

        <div className="hidden">
          <Field name="text"
                 component={FormInput}
                 floatingLabel="Text"
                 className="valign-top margin-md-right"
                 fullWidth
          />
        </div>

        <div className="hidden">
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
          {this.renderMessages()}
          {wfSimulationState ? <RefreshOverlay/> : null}
          {/*<SubmitBlock name="Post"/>*/}
        </form>
        {this.props.children}
      </Modal>
    )
  }
}
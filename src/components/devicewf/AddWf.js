import React from 'react'
import {Checkbox, Select, MenuItem, Button} from '@material-ui/core'
import {findIndex} from 'lodash'
import { FormControlLabel } from '@material-ui/core'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import MainWorkflowModal from 'components/dashboard/map/device/main/workflows/MainWorkflowModal'
import AddWfTabs from './AddWfTabs'

import {parse} from 'query-string'
import {severities} from 'shared/Global'

export default class AddWf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tab:0,
      severity: '[All]'
    }
  }
  componentWillMount () {
    this.props.fetchDevice(this.getDeviceId())
    this.props.fetchWorkflows()
  }

  getDeviceId () {
    const {z} = parse(this.props.location.search || {})
    return z
  }
  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  onClickDiagram () {
    this.props.history.push(`/${this.props.match.params.device}/editwf/diagram/${this.getWorkflowId()}`)
  }

  onFinish () {
    this.props.history.push('/devicewf')
  }

  onClickTab (tab) {
    this.setState({
      tab
    })
  }

  ////////////////////////////////////////////////

  onChangeCheck (workflow, e, checked) {
    if (checked) {
      this.props.selectSysWorkflow(workflow)
    } else {
      this.props.deselectSysWorkflow(workflow)
    }
  }

  onChangeSeverity (e) {
    this.setState({
      severity: e.target.value
    })
  }

  onClickAddTemplates () {
    const {selectedSysWorkflows} = this.props
    const device = this.getDevice()
    device.workflowids = device.workflowids || []
    device.workflowids = [...device.workflowids, ...selectedSysWorkflows.map(p => p.id)]
    this.props.updateMapDevice(device)
    setTimeout(() => this.props.history.push('/devicewf'), 10)
  }

  ////////////////////////////////////////////////
  renderTab1 () {
    const {sysWorkflows, selectedSysWorkflows} = this.props
    const {severity} = this.state
    const device = this.getDevice()

    let workflows = sysWorkflows.filter(p => !(device.workflowids || []).includes(p.id))
    if (severity !== '[All]') {
      workflows = workflows.filter(p => p.severity === severity)
    }
    return (
      <div className="flex-vertical flex-1">
        <div className="padding-md-left padding-md-top">
          <Select
            className="valign-top margin-sm-top"
            value={severity} onChange={this.onChangeSeverity.bind(this)}
            style={{width: 150}}>
            <MenuItem value="[All]">[All]</MenuItem>
            {severities.map(option =>
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            )}
          </Select>

          <Button variant="raised" onClick={this.onClickAddTemplates.bind(this)}
                  className="valign-top margin-xs-top margin-md-left">Add Selected</Button>
        </div>
        <div className="flex-1" style={{overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Severity</th>
              <th>Name</th>
              <th>Description</th>
              <th>Version</th>
            </tr>
            </thead>
            <tbody>
            {
              workflows.map(w =>
                <tr key={w.id}>
                  <td>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={findIndex(selectedSysWorkflows, {id: w.id}) >= 0}
                          onChange={(e, c) => this.onChangeCheck(w, e, c)}
                        />
                      }
                      label={w.severity}
                    />
                  </td>
                  <td>{w.name}</td>
                  <td>{w.desc}</td>
                  <td>{w.version}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderTab2 () {
    return (
      <MainWorkflowModal
        noModal
        isDiagramButton={false}
        onClickDiagram={this.onClickDiagram.bind(this)}
        onFinish={this.onFinish.bind(this)}
        device={this.getDevice()}
      />
    )
  }

  renderContent () {
    if (this.state.tab === 0) {
      return this.renderTab1()
    } else {
      return this.renderTab2()
    }
  }

  render () {
    const device = this.getDevice()
    if (!device) return <div>Loading...</div>
    return (
      <TabPage>
        <div style={{margin: '16px 20px 0'}}>
          <span className="tab-title">Add Workflow</span>
        </div>

        <TabPageBody tabs={AddWfTabs} tab={this.state.tab} onClickTab={this.onClickTab.bind(this)}>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}

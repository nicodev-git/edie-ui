import React from 'react'
import {Button, Select, Menu, MenuItem} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import uuid from 'uuid'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import FormControl from '@material-ui/core/FormControl'
import {find, findIndex} from 'lodash'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import WorkflowEditModal from './WorkflowEditModal'
import WorkflowSettingModal from './WorkflowSettingModal'
import {getSeverityIcon} from 'shared/Global'
import FlowGroupsModal from './flowgroups/FlowGroupsModal'
import GlobalVarsModal from './globalvar/GlobalVarsModal'

class Workflows extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editWf: null,
      groupId: '0',
      filterTags: [],
      menuAnchor: null,

      filterProductTypes: [],

      groupsModalOpen: false,
      globalVarsModalOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchWorkflows()
    this.props.fetchGroups()
    this.props.fetchShapes()
    this.props.fetchBrainCells()
    this.props.fetchCollectors()
    this.props.fetchSimSamples()
    this.props.fetchVendorProducts()
    this.props.fetchProductTypes()
  }

  getTags() {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  onClickAdd() {
    // this.props.showWfNameModal(true)
    // this.setState({
    //   editWf: null
    // })

    this.props.history.push(`/workflow/add`)
  }

  onClickEdit(wf) {
    this.props.history.push(`/workflow/${wf.name}/diagram`)
  }

  onClickRename(wf) {
    this.props.history.push(`/workflow/${encodeURIComponent(wf.name)}/edit`)
    // this.setState({
    //     editWf: wf
    // })
    // this.props.showWfNameModal(true)
  }

  onSaveName(values) {
    const {editWf} = this.state
    if (editWf) {
      this.props.updateWorkflow({
        ...editWf,
        ...values
      })
    } else {
      const flow = {
        ...values,
        uuid: uuid.v4(),
        flowItems: []
      }
      this.props.addWorkflow(flow)
    }

  }

  onClickDelete(wf) {
    if (!window.confirm('Click OK to delete')) return
    this.props.removeWorkflow(wf)
  }

  onChangeGroup(e) {
    this.setState({
      groupId: e.target.value
    })
  }

  ////////////////////////////////////////////////////////////////

  onClickSettings() {
    this.onCloseMenu()
    this.props.fetchWfSetting(this.props.userInfo.customerId || this.props.userInfo.id, true)
  }

  onSaveSetting(entity) {
    entity.id = this.props.userInfo.customerId || this.props.userInfo.id
    this.props.saveWfSetting(entity)
  }

  onCloseSetting() {
    this.props.showWfSettingModal(false)
  }

  onClickFlowGroup () {
    // this.props.history.push('/workflow/groups')
    this.setState({
      groupsModalOpen: true
    })
    this.onCloseMenu()
  }

  onClickGlobalVars () {
    // this.props.history.push('/workflow/globalvars')
    this.setState({
      globalVarsModalOpen: true
    })
    this.onCloseMenu()
  }

  ////////////////////////////////////////////////////////////////

  onAddFilterTag(e) {
    // const tag = e.target.value
    // const {filterTags} = this.state
    // if (!tag || tag === ' ') return
    // if (filterTags.includes(tag)) return

    this.setState({
      filterTags: e.target.value
    })
  }

  onDeleteFilterTag(tag) {
    const {filterTags} = this.state
    this.setState({
      filterTags: filterTags.filter(p => p !== tag)
    })
  }

  ////////////////////////////////////////////////////////////////

  onClickSimulate () {
    this.props.history.push(`/workflow/simulation`)
  }

  getIncidentCell(wf) {
    const {brainCells} = this.props
    const {incidentTemplateId, openIncident} = wf
    if (!openIncident || !incidentTemplateId) return null
    const index = findIndex(brainCells, {id: incidentTemplateId})
    if (index < 0) return null
    return brainCells[index]
  }

  ////////////////////////////////////////////////////////////////

  onClickAdvanced (e) {
    this.setState({
      menuAnchor: e.target
    })
  }

  onCloseMenu () {
    this.setState({
      menuAnchor: null
    })
  }

  ////////////////////////////////////////////////////////////////

  onChangeProductTypeId (e) {
    this.setState({
      filterProductTypes: e.target.value
    })
  }

  ////////////////////////////////////////////////////////////////

  renderSeverity (wf) {
    const cell = this.getIncidentCell(wf)
    if (!cell) return null
    return getSeverityIcon(cell.severity)
  }

  renderProductType (wf) {
    const {productTypes, productVendors} = this.props
    const {filterType, productId, productTypeId} = wf
    if (filterType === 'PRODUCT') {
      if (productId) {
        const vendor = productVendors.filter(p => (p.productIds || []).includes(productId))[0]
        if (vendor) {
          const type = productTypes.filter(p => (p.vendorIds || []).includes(vendor.id))[0]
          if (type) return `${type.name}/${vendor.name}`
        }
      }
    } else {
      const type = find(productTypes, {id: productTypeId})
      if (type) return type.name
    }
    return ''
  }

  renderWorkflows() {
    const {groupId, filterTags} = this.state
    let {workflows} = this.props
    if (groupId !== '0') {
      workflows = workflows.filter(p => p.groupId === groupId)
    }
    if (filterTags.length) {
      workflows = workflows.filter(p => (p.tags || []).filter(t => filterTags.includes(t)).length > 0)
    }
    return (
      <div className="flex-1" style={{overflow: 'auto', padding: 10}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>User</th>
            <th>Type</th>
            <th>Last Updated</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {workflows.map(m =>
            <tr key={m.uuid || 'z'}>
              <td>
                <div className="link text-info" onClick={this.onClickRename.bind(this, m)}>
                  <span>{this.renderSeverity(m)}</span>&nbsp;
                  <span>{m.name}</span>
                </div>
              </td>
              <td>{m.description}</td>
              <td>{this.renderProductType(m)}</td>
              <td>{m.ownerUser}</td>
              <td>{m.type || 'normal'}</td>
              <td>{m.updated ? moment(m.updated).fromNow() : ''}</td>
              <td className="text-right padding-lg-right">
                <EditIcon className="link margin-md-right" onClick={this.onClickRename.bind(this, m)}/>
                <DeleteIcon className="link margin-md-right" onClick={this.onClickDelete.bind(this, m)}/>
                <ArrowForwardIcon className="link margin-md-right" onClick={this.onClickEdit.bind(this, m)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  renderWorkflowEditModal() {
    if (!this.props.wfNameModalOpen) return

    const {editWf} = this.state
    return (
      <WorkflowEditModal
        {...this.props}
        allTags={this.getTags()}
        editWf={editWf}
        onSave={this.onSaveName.bind(this)}
      />
    )
  }

  renderGroups() {
    const {groups} = this.props
    return (
      <Select
        value={this.state.groupId}
        onChange={this.onChangeGroup.bind(this)}
        style={{width: 150}}
        native={false}
      >
        <MenuItem value="0">[All]</MenuItem>
        {groups.map(p =>
          <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
        )}
      </Select>
    )
  }

  renderSettingModal() {
    if (!this.props.wfSettingModalOpen) return
    return (
      <WorkflowSettingModal
        onSave={this.onSaveSetting.bind(this)}
        onClose={this.onCloseSetting.bind(this)}
      />
    )
  }

  renderFilterTags() {
    const {filterTags} = this.state
    const allTags = this.getTags()

    return (
      <div className="inline-block margin-md-left">
        <FormControl>
          <InputLabel>Tag</InputLabel>
          <Select
            value={filterTags}
            onChange={this.onAddFilterTag.bind(this)}
            style={{width: 150}}
            multiple
            renderValue={selected => selected.join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 50 * 8,
                }
              }
            }}
          >
            {allTags.map(p =>
              <MenuItem key={p.id} value={p.name}>
                <Checkbox checked={filterTags.includes(p.name)}/>
                <label>{p.name}</label>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderProductFilter() {
    const {productTypes} = this.props
    const {filterProductTypes} = this.state

    return (
      <div className="inline-block margin-md-left">
        <FormControl>
          <InputLabel>Product Type</InputLabel>
          <Select
            value={filterProductTypes}
            onChange={this.onChangeProductTypeId.bind(this)}
            style={{width: 150}}
            multiple
            renderValue={selected => selected.map(p => find(productTypes, {id: p}).name).join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 50 * 8,
                }
              }
            }}
          >
            {productTypes.map(p =>
              <MenuItem key={p.id} value={p.id}>
                <Checkbox checked={filterProductTypes.includes(p.id)}/>
                <label>{p.name}</label>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderMenu () {
    const {menuAnchor} = this.state
    if (!menuAnchor) return null
    return (
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={this.onCloseMenu.bind(this)}
      >
        <MenuItem onClick={this.onClickFlowGroup.bind(this)}>Flow Group</MenuItem>
        <MenuItem onClick={this.onClickGlobalVars.bind(this)}>Global Variables</MenuItem>
        <MenuItem onClick={this.onClickSettings.bind(this)}>Settings</MenuItem>
      </Menu>
    )
  }

  renderFlowGroupsModal () {
    if (!this.state.groupsModalOpen) return null
    return (
      <FlowGroupsModal
        {...this.props}
        onClickClose={() => this.setState({groupsModalOpen: false})}
      />
    )
  }

  renderGlobalVarsModal() {
    if (!this.state.globalVarsModalOpen) return null
    return (
      <GlobalVarsModal
        {...this.props}
        onClickClose={() => this.setState({globalVarsModalOpen: false})}
      />
    )
  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Workflows">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
              {this.renderGroups()}
              {this.renderProductFilter()}
            </div>
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>&nbsp;
              <Button variant="raised" onClick={this.onClickAdvanced.bind(this)}>Advanced</Button>&nbsp;
              <Button variant="raised" onClick={this.onClickSimulate.bind(this)}>Simulate</Button>&nbsp;

              {this.renderMenu()}
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>
          {this.renderWorkflows()}
          {this.renderWorkflowEditModal()}
          {this.renderSettingModal()}
          {this.renderFlowGroupsModal()}
          {this.renderGlobalVarsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

export default Workflows

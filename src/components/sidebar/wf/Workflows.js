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
import {Field} from 'redux-form'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import WorkflowEditModal from './WorkflowEditModal'
import WorkflowSettingModal from './WorkflowSettingModal'
import {getSeverityIcon} from 'shared/Global'
import FlowGroupsModal from './flowgroups/FlowGroupsModal'
import GlobalVarsModal from './globalvar/GlobalVarsModal'
import {FormSelect} from 'components/modal/parts'
import WorkflowProductFilter from './WorkflowProductFilter'

class Workflows extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editWf: null,
      groupId: '0',
      filterTags: [],
      menuAnchor: null,

      filterType: 'product-type',
      productTypeId: '',
      productVendorId: '',
      productId: '',

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
    this.props.fetchProductVendors()
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

  onChangeProductType (e) {
    this.setState({
      productTypeId: e.target.value
    })
  }

  onChangeProductVendor (e) {
    this.setState({
      productVendorId: e.target.value,
    })
  }

  onChangeProduct (e) {
    this.setState({
      productId: e.target.value
    })
  }

  onChangeFilterType (e) {
    this.setState({
      filterType: e.target.value,
      productTypeId: '',
      productVendorId: '',
      productId: ''
    })
  }

  getFilteredWorkflows () {
    const {filterType, productTypeId, productVendorId, productId} = this.state
    let {workflows} = this.props

    if (filterType === 'product-type') {
      if (!productTypeId) return workflows

      return workflows.filter(wf => {
        const productInfo = this.getWfProductInfo(wf)
        const wfProductType = productInfo[0]
        return (wfProductType && wfProductType.id === productTypeId)
      })
    } if (filterType === 'product-vendor') {
      if (!productVendorId) return workflows

      return workflows.filter(wf => {
        const productInfo = this.getWfProductInfo(wf)
        const wfProductVendor = productInfo[1]
        return wfProductVendor && wfProductVendor.id === productVendorId
      })
    } else {
      if (!productId) return workflows
      return workflows.filter(wf => wf.filterType === 'PRODUCT' && wf.productId === productId)
    }

    return workflows
  }

  getWfProductInfo (wf) {
    const {productTypes, productVendors} = this.props
    const {filterType, productId, productTypeId} = wf
    if (filterType === 'PRODUCT') {
      if (productId) {
        const vendor = productVendors.filter(p => (p.productIds || []).includes(productId))[0]
        if (vendor) {
          const type = productTypes.filter(p => (p.vendorIds || []).includes(vendor.id))[0]
          return [type, vendor]
        }
      }
    } else {
      const type = find(productTypes, {id: productTypeId})
      if (type) return [type, null]
    }
    return []
  }

  ////////////////////////////////////////////////////////////////

  renderSeverity (wf) {
    const cell = this.getIncidentCell(wf)
    if (!cell) return null
    return getSeverityIcon(cell.severity)
  }

  renderWfProductType (wf) {
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
    const workflows = this.getFilteredWorkflows(this.props.workflows)

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
              <td>{this.renderWfProductType(m)}</td>
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

  renderSettingModal() {
    if (!this.props.wfSettingModalOpen) return
    return (
      <WorkflowSettingModal
        onSave={this.onSaveSetting.bind(this)}
        onClose={this.onCloseSetting.bind(this)}
      />
    )
  }

  renderProductFilter() {
    const {productTypes, productVendors, vendorProducts} = this.props
    const {productId, productTypeId, productVendorId,
      filterType} = this.state

    return (
      <WorkflowProductFilter
        productTypes={productTypes}
        productVendors={productVendors}
        vendorProducts={vendorProducts}

        filterType={filterType}
        onChangeFilterType={this.onChangeFilterType.bind(this)}

        productId={productId}
        onChangeProduct={this.onChangeProduct.bind(this)}
        productTypeId={productTypeId}
        onChangeProductType={this.onChangeProductType.bind(this)}
        productVendorId={productVendorId}
        onChangeProductVendor={this.onChangeProductVendor.bind(this)}
      />
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

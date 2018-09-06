import React from 'react'
import {Field} from 'redux-form'
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Checkbox, FormControlLabel, Button, Popover
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import {find, findIndex} from 'lodash'

import {
  FormInput,
  FormSelect,
  FormMultiSelect,
  FormCheckbox,
  Modal,
  CardPanel
} from 'components/modal/parts'
import {severities, productFilterTypes} from 'shared/Global'

const itemStyle = {
  width: '24px',
  height: '24px'
}

class WorkflowEditModalView extends React.Component {
  renderSidebar () {
    const { active, shapes, onClickSidebarGroup, onClickShape } = this.props
    let groups = []

    shapes.forEach((m, index) => {
      const group = m.group || 'General'
      const gindex = findIndex(groups, {key: group})
      let groupItems = []
      if (gindex < 0) groups.push({key: group, items: groupItems})
      else groupItems = groups[gindex].items
      groupItems.push(
        <div key={index} onClick={(e) => onClickShape(m, e)} className="link">
          <div className="inline-block valign-middle">
            <img src={`/images/${m.img}`} style={itemStyle} alt=""/>
          </div>&nbsp;&nbsp;
          <span>{m.title}</span>
        </div>
      )
    })

    return (
      <div className="draw-sidebar">
        {groups.map((g, i) =>
          <div key={i}>
            <div className="group-title link" onClick={() => onClickSidebarGroup(i)}>
              <img src={active === i ? '/images/minus.png' : '/images/plus.png'}
                   alt="" className="link valign-middle" width="16"/>
              <span className="valign-middle">{g.key}</span>
            </div>
            <div className={active === i ? 'padding-sm-left' : 'hidden'}>
              {g.items}
            </div>
          </div>
        )}
      </div>
    )
  }

  renderProductCombos() {
    const {allValues, productTypes, productVendors, vendorProducts} = this.props
    const {productTypeId, productVendorId} = allValues || {}

    let vendors = productVendors || []
    if (productTypeId) {
      const type = find(productTypes, {id: productTypeId})
      if (type) vendors = vendors.filter(p => (type.vendorIds || []).includes(p.id))
    }
    let products = vendorProducts || []
    if (productVendorId) {
      const vendor = find(productVendors, {id: productVendorId})
      if (vendor) products = products.filter(p => (vendor.productIds || []).includes(p.id))
    }

    return (
      <div className="margin-md-top">
        <Field name="productTypeId" component={FormSelect} floatingLabel="Type"
               options={(productTypes || []).map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}} className="margin-sm-right"
        />
        <Field name="productVendorId" component={FormSelect} floatingLabel="Vendor"
               options={vendors.map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}} className="margin-sm-right"
        />
        <Field name="productId" component={FormSelect} floatingLabel="Product"
               options={(products || []).map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}}
        />
      </div>
    )
  }
  renderWfTab() {
    const {
      wfDataItems,
      onClickDeleteShape, onClickEditShape
    } = this.props
    return (
      <div>
        <div className="margin-lg-top margin-sm-bottom">Workflow</div>
        <div style={{width: '100%'}} className="flex-horizontal">
          <div className="diagram">
            {this.renderSidebar()}
          </div>
          <div className="flex-1">
            {wfDataItems.map((p, i) =>
              <div key={i} className="text-center">
                <div>
                  {i ? (
                    <img src="/images/arrow-down.png" style={{marginTop: 7}} alt=""/>
                  ) : null}
                </div>
                <div className="inline-block wf-item-main">
                  {p.prelabel ? (
                    <div className="wf-item-prelabel" onClick={(e) => onClickEditShape(i, p.prelabelKey, e)}>
                      <div className="position-vm text-center">{p.prelabel}</div>
                    </div>
                  ) : null}
                  <div className="inline-block wf-item-label" onClick={(e) => onClickEditShape(i, p.labelKey, e)}>
                    <div className="position-vm">{p.label}</div>
                  </div>
                  <label className="wf-item-value" onClick={(e) => onClickEditShape(i, p.valueKey, e)}>{p.value}</label>
                  <div className="wf-item-delete">
                    <DeleteIcon onClick={() => onClickDeleteShape(i)}/>
                  </div>
                  {p.extraFields.map((extra, j) =>
                    <label key={j} className="wf-item-value">{extra.name}</label>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderRuleDetail() {
    const {tab, shapeModal, rulePanelExpanded, onExpandRulePanel} = this.props
    if (tab !== 'wf') return null
    return (
      <ExpansionPanel expanded={rulePanelExpanded} onChange={onExpandRulePanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>Detail</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{'width': '100%'}}>
            {shapeModal}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

  renderSecurityTab() {
    const {permitterUsers, onClickAddUser, onClickRemoveUser} = this.props
    return (
      <CardPanel title="Permitted Users"
                 tools={<AddIcon className="link" onClick={onClickAddUser}/>}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>User</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {permitterUsers.map(p =>
            <tr key={p}>
              <td>{p}</td>
              <td className="text-right">
                <DeleteIcon className="link" onClick={() => onClickRemoveUser(p)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </CardPanel>
    )
  }

  renderTabActions() {
    const {brainCells, onClickEditIncident} = this.props
    const incidentCells = brainCells.filter(p => p.type === 'Incident');
    return (
      <div>
        <Field name="openIncident" component={FormCheckbox} label="Open Incident"/>
        <Field name="incidentTemplateId" component={FormSelect}
               options={incidentCells.map(p => ({label: p.name, value: p.id}))}/>
        <Button variant="raised" className="margin-md-left" onClick={onClickEditIncident}>Edit</Button>

        <Field name="incidentSeverity" component={FormSelect}
               options={severities.map(p => ({label: p, value: p}))} className="hidden"/>
        <Field name="incidentDesc" floatingLabel="Format" component={FormInput} fullWidth className="hidden"/>

        <div>
          <Field name="sendChat" component={FormCheckbox} label="Send Chat"/>
          <Field name="chatChannel" component={FormInput} label="Channel"/>
        </div>
      </div>
    )
  }

  renderTabSchedule() {
    const {timeOptions} = this.props
    return (
      <CardPanel title="Schedule">
        <div>
          <Field name="scheduled" component={FormCheckbox} label="Enable Scheduling"/>
        </div>

        <div>
          <Field name="interval" component={FormInput} floatingLabel="Repeat every"
                 className="valign-top margin-md-right" style={{width: 120}}/>
          <Field name="intervalUnit" component={FormSelect} floatingLabel="Time"
                 className="valign-top" options={timeOptions}
                 style={{width: 120}}
          />
        </div>
      </CardPanel>
    )
  }

  renderAppliedTo() {
    const {allValues, devices, onCheckAppliedDevice, applyDeviceIds} = this.props
    const {applyAllDevices} = allValues || {}

    const servers = devices.filter(p => !!p.monitors)

    return (
      <CardPanel title="Applied To">
        <div>
          <Field name="applyAllDevices" component={FormCheckbox} label="All Devices"/>
        </div>
        <div>
          <table className="table table-hover">
            <thead><tr><th>Device</th></tr></thead>
            <tbody>
            {servers.map(p =>
              <tr key={p.id}>
                <td>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={applyDeviceIds.includes(p.id)}
                        onChange={onCheckAppliedDevice}
                        value={p.id}
                        disabled={!!applyAllDevices}
                      />
                    }
                    label={p.name}
                  />
                </td>
              </tr>
            )}
            </tbody>
          </table>

        </div>
      </CardPanel>
    )
  }

  renderEditPopover () {
    const {shapeModal, shapeAnchorEl, onCloseShapeModal} = this.props
    if (!shapeModal) return null

    return (
      <Popover
        open
        anchorEl={shapeAnchorEl}
        onClose={onCloseShapeModal}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <div className="padding-sm">
          {shapeModal}
        </div>
      </Popover>
    )
  }

  renderAdvanced () {
    const {
      advancedModalOpen, onCloseAdvanced,
      groupOptions, typeOptions, conditionOptions
    } = this.props
    if (!advancedModalOpen) return null

    return (
      <Modal title="Workflow" width={1100} onRequestClose={onCloseAdvanced}>
        <CardPanel>
          <div>
            <Field name="description" component={FormInput} floatingLabel="Description" style={{minWidth: 400}}/>
          </div>

          <div className="margin-lg-top">
            <Field name="type" component={FormSelect} options={typeOptions} floatingLabel="Type"
                   className="valign-top margin-md-right" style={{minWidth: 120}}/>

            <Field name="groupId" component={FormSelect} options={groupOptions} floatingLabel="Group"
                   className="valign-top margin-md-right" style={{minWidth: 160}}/>
          </div>

          <div className="margin-lg-top">
            <Field name="calledDirect" component={FormCheckbox} label="Called Direct"/>
            <Field name="paused" component={FormCheckbox} label="Stopped"/>
            <Field name="sendBack" component={FormCheckbox} label="Send Result"/>
            <Field name="runByDevice" component={FormCheckbox} label="Run By Device"/>
          </div>

          <div className="margin-md-top">
            <Field name="useCorrelation" component={FormCheckbox} label="Use correlation by"/>
            <Field name="correlations" component={FormMultiSelect} options={conditionOptions} placeholder="None"/>
          </div>
        </CardPanel>

        {this.renderSecurityTab()}
        {this.renderTabSchedule()}
        {this.renderAppliedTo()}

      </Modal>
    )
  }

  renderButtons() {
    const {onClickAdvanced} = this.props
    return (
      <div className="form-buttons">
        <Button variant="raised" onClick={onClickAdvanced} className="margin-md-right">Advanced</Button>
        <Button variant="raised" color="primary" type="submit">Save</Button>
      </div>
    )
  }

  renderContent () {
    return (
      <CardPanel>
        <Field name="name" component={FormInput} floatingLabel="Name"
               className="valign-top margin-md-right" style={{minWidth: 250}}/>

        {this.renderWfTab()}
        {this.renderTabActions()}
      </CardPanel>
    )
  }

  render() {
    const {
      onSubmit, children, noModal, onClickClose
    } = this.props

    const content = (
      <div>
        <form onSubmit={onSubmit}>
          {this.renderContent()}
          {this.renderAdvanced()}
          {this.renderButtons()}
        </form>
        {this.renderEditPopover()}
        {children}
      </div>
    )

    if (noModal) {
      return content
    } else {
      return (
        <Modal title="Workflow" contentStyle={{width: 1200}} onRequestClose={onClickClose}>
          {content}
        </Modal>
      )
    }
  }
}

export default WorkflowEditModalView
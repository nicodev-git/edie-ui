import React from 'react'
import {Field} from 'redux-form'
import {
  Tab,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Checkbox, FormControlLabel, Button, Popover,
  Table, TableBody, TableCell, TableHead
} from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import Tabs from '@material-ui/core/Tabs'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import {findIndex} from 'lodash'

import {
  FormInput,
  FormSelect,
  FormMultiSelect,
  FormCheckbox,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'
import {severities} from 'shared/Global'

const cardStyle = {
  minHeight: 250,
  width: '100%',
  overflow: 'auto'
}

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
                </div>
              </div>
            )}
            {this.renderButtons()}
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

  renderFilterTab() {
    const {
      onClickDeleteTag, tags, allTags,
      onClickExistingTag
    } = this.props
    return (
      <div>
        <div>
          <CardPanel title="Existing Tags">

            <div className="margin-md-top">
              {allTags.filter(p => !tags.includes(p.name)).map((t, i) =>
                <Chip
                  key={i}
                  label={t.name}
                  className="margin-sm-right"
                  onClick={() => onClickExistingTag(t.name)}
                />
              )}
            </div>
          </CardPanel>

          <CardPanel title="Selected Tags">
            <div>
              {tags.map((t, i) =>
                <Chip
                  key={i}
                  label={t}
                  onDelete={() => onClickDeleteTag(i)}
                  className="margin-md-right"
                />
              )}
            </div>
          </CardPanel>
        </div>
        {this.renderButtons()}
      </div>
    )
  }

  renderGeneralTab() {
    const {
      groupOptions, typeOptions, conditionOptions
    } = this.props
    return (
      <div>
        <CardPanel title="General">
          <div style={cardStyle}>
            <div>
              <Field name="name" component={FormInput} floatingLabel="Name"
                     className="valign-top margin-md-right"/>
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
          </div>
        </CardPanel>
        {this.renderButtons()}
      </div>
    )
  }

  renderSecurityTab() {
    const {permitterUsers, onClickAddUser, onClickRemoveUser} = this.props
    return (
      <div>
        <CardPanel title="Permitted Users"
                   tools={<AddIcon className="link" onClick={onClickAddUser}/>}>
          <div style={cardStyle}>
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
          </div>
        </CardPanel>
        {this.renderButtons()}
      </div>
    )
  }

  renderTabActions() {
    const {brainCells, onClickEditIncident} = this.props
    const incidentCells = brainCells.filter(p => p.type === 'Incident');
    return (
      <div>
        <CardPanel title="Actions">
          <div style={cardStyle}>
            <div>
              <Field name="openIncident" component={FormCheckbox} label="Open Incident"/>
              <Field name="incidentTemplateId" component={FormSelect}
                     options={incidentCells.map(p => ({label: p.name, value: p.id}))}/>
              <Button variant="raised" className="margin-md-left" onClick={onClickEditIncident}>Edit</Button>

              <Field name="incidentSeverity" component={FormSelect}
                     options={severities.map(p => ({label: p, value: p}))} className="hidden"/>
              <Field name="incidentDesc" floatingLabel="Format" component={FormInput} fullWidth className="hidden"/>
            </div>

            <div className="margin-md-top hidden">
              <Field name="blockIP" component={FormCheckbox} label="Block IP"/>
            </div>
          </div>
        </CardPanel>

        {this.renderButtons()}
      </div>
    )
  }

  renderTabSchedule() {
    const {timeOptions} = this.props
    return (
      <div>
        <CardPanel title="Schedule">
          <div style={cardStyle}>
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
          </div>
        </CardPanel>

        {this.renderButtons()}
      </div>
    )
  }

  renderAppliedTo() {
    const {allValues, devices, onCheckAppliedDevice, applyDeviceIds} = this.props
    const {applyAllDevices} = allValues || {}

    const servers = devices.filter(p => !!p.monitors)

    return (
      <div>
        <CardPanel title="Applied To">
          <div style={cardStyle}>
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
          </div>
        </CardPanel>

        {this.renderButtons()}
      </div>
    )
  }

  renderTabContent() {
    const {
      tab
    } = this.props

    switch (tab) {
      case "wf":
        return this.renderWfTab()
      case "filter":
        return this.renderFilterTab()
      case "general":
        return this.renderGeneralTab()
      case "security":
        return this.renderSecurityTab()
      case "actions":
        return this.renderTabActions()
      case "schedule":
        return this.renderTabSchedule()
      case "appliedto":
        return this.renderAppliedTo()
      default:
        return null
    }
  }

  cumulativeOffset(element) {
    var top = 0, left = 0;
    do {
      top += element.offsetTop  || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent
    } while(element)

    return {
      top: top,
      left: left
    }
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

  renderButtons() {
    const {onClickClose, noModal} = this.props
    return (
      <SubmitBlock name="Save" onCancel={noModal ? null : onClickClose}/>
    )
  }

  render() {
    const {
      onSubmit, children,
      tab, onChangeTab, noModal
    } = this.props

    // const mainStyle = tab === 'wf' ? {
    //   height: panelHeight + 100,
    //   overflow: 'auto'
    // } : null

    const content = (
      <div>
        <form onSubmit={onSubmit}>
          <Tabs value={tab} onChange={onChangeTab} scrollable scrollButtons="off">
            <Tab label="Filter" value="filter"/>
            <Tab label="General" value="general"/>
            <Tab label="Workflow" value="wf"/>
            <Tab label="Actions" value="actions"/>
            <Tab label="Security" value="security"/>
            <Tab label="Schedule" value="schedule"/>
            <Tab label="Applied To" value="appliedto"/>
          </Tabs>

          {this.renderTabContent()}
        </form>
        {this.renderEditPopover()}
        {/*{this.renderRuleDetail()}*/}
        {children}
      </div>
    )

    if (noModal) {
      return content
    } else {
      return (
        <Modal title="Workflow" contentStyle={{width: 1200}}>
          {content}
        </Modal>
      )
    }
  }
}

export default WorkflowEditModalView
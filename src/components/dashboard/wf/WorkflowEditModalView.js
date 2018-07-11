import React from 'react'
import {Field} from 'redux-form'
import {Menu, MenuItem, Tab,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Checkbox, FormControlLabel
} from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import Tabs from '@material-ui/core/Tabs'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
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

// const panelHeight = cardStyle.height + 90

class WorkflowEditModalView extends React.Component {
  renderShapeMenu () {

  }
  renderWfTab() {
    const {
      wfDataItems, onClickAddShape, onCloseShapeMenu, shapeAnchorEl,
      shapes, onClickShape, onClickDeleteShape, onClickEditShape
    } = this.props
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>Rules</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{width: '100%'}}>
            <div>
              {shapes.map((p, i) =>
                <MenuItem key={i} onClick={() => onClickShape(p)}>
                  <div className="inline-block valign-middle">
                    <img src={`/images/${p.img}`} width={24} height={24} alt=""/>
                  </div>
                  &nbsp;&nbsp;
                  <span>{p.title}</span>
                </MenuItem>
              )}
            </div>
            <div>
              {wfDataItems.map((p, i) =>
                <div key={i} className="text-center">
                  <div>
                    {i ? (
                      <img src="/images/arrow-down.png" style={{marginTop: 7}} alt=""/>
                    ) : null}
                  </div>
                  <div className="inline-block wf-item-main" onClick={() => onClickEditShape(i)}>
                    <div className="inline-block wf-item-label">{p.label}</div>
                    <label className="wf-item-value">{p.value}</label>
                    <div className="wf-item-delete">
                      <DeleteIcon onClick={() => onClickDeleteShape(i)}/>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {this.renderButtons()}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
    const {brainCells} = this.props
    const incidentCells = brainCells.filter(p => p.type === 'Incident');
    return (
      <div>
        <CardPanel title="Actions">
          <div style={cardStyle}>
            <div>
              <Field name="openIncident" component={FormCheckbox} label="Open Incident"/>
              <Field name="incidentTemplateId" component={FormSelect}
                     options={incidentCells.map(p => ({label: p.name, value: p.id}))}/>

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
        {this.renderRuleDetail()}
        {children}
      </div>
    )

    if (noModal) {
      return content
    } else {
      return (
        <Modal title="Workflow" width={1100}>
          {content}
        </Modal>
      )
    }
  }
}

export default WorkflowEditModalView
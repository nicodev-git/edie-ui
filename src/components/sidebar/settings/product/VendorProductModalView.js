import React from 'react'
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import {Button, Chip, Tooltip} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import RefreshOverlay from 'components/common/RefreshOverlay'

import { FormInput } from 'components/modal/parts'

const panelStyle = {width: 1000, height: 623, overflow: 'auto'}

class SimulationModalView extends React.Component {
  renderTags () {
    const {tags, onClickAddTag, onClickDeleteTag, onClickNewTag} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <div>
            <span className="valign-middle">Tags</span>
            <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickAddTag}>Add</Button>
            <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickNewTag}>Create New</Button>
          </div>
        </div>
        <div>
          {tags.map((t, i) =>
            <Chip key={t} label={t} className="margin-sm" onDelete={() => onClickDeleteTag(i)}/>
          )}
        </div>
      </div>
    )
  }

  renderClasses () {
    const {classifierCells, onClickAddClass, onClickNewClass, onClickDeleteClass} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <div>
            <span className="valign-middle">Classifiers</span>
            {/*<AddIcon className="link valign-middle" onClick={onClickAddClass}/>*/}
            <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickAddClass}>Add</Button>
            <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickNewClass}>Create New</Button>
          </div>
        </div>
        <div>
          {classifierCells.map((t, i) =>
            <Tooltip key={t.id} title={t.key}>
              <Chip label={t.name} className="margin-sm" onDelete={() => onClickDeleteClass(t.id)}/>
            </Tooltip>
          )}
        </div>
      </div>
    )
  }

  renderGroks () {
    const {grokCells, onClickAddGrok, onClickDeleteGrok, onClickNewGrok} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <span className="valign-middle">Parser</span>
          <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickAddGrok}>Add</Button>
          <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickNewGrok}>Create New</Button>
        </div>
        <div>
          {grokCells.map((t, i) =>
            <Chip key={t.id} label={t.name} className="margin-sm" onDelete={() => onClickDeleteGrok(t.id)}/>
          )}
        </div>
      </div>
    )
  }

  renderWorkflows () {
    const {workflows, onClickDeleteWf} = this.props
    return (
      <div >
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {workflows.map((t, i) =>
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.description}</td>
              <td><DeleteIcon className="link" onClick={() => onClickDeleteWf(t.id)}/></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  renderIncidents () {
    const {incidentCells, onClickDeleteIncident} = this.props
    return (
      <div>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {incidentCells.map((t, i) =>
              <tr key={t.id}>
                <td>{t.name}</td>
                <td><DeleteIcon className="link" onClick={() => onClickDeleteIncident(t.id)}/></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render () {
    const {onSubmit, onClickAddWf, onClickAddIncident, onClickNewIncident} = this.props
    return (
      <div className="flex-1">
        <form onSubmit={onSubmit}>
          <div className="panel panel-default margin-lg-bottom" style={panelStyle}>
            <div className="panel-heading">
              <h3>Vendor Product Info</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-8 col-lg-6">
                  <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
                </div>
              </div>
              <div className="row margin-md-top">
                <div className="col-md-8 col-lg-6">
                  <Field name="version" component={FormInput} floatingLabel="Version" className="margin-md-right" fullWidth/>
                </div>
              </div>
              <div className="row margin-md-top">
                <div className="col-md-8 col-lg-6">
                  <Field name="description" component={FormInput} floatingLabel="Description" className="margin-md-right" fullWidth/>
                </div>
              </div>

              {this.renderTags()}
              {this.renderClasses()}
              {this.renderGroks()}
            </div>
          </div>

          <div className="panel panel-default margin-lg-bottom" style={panelStyle}>
            <div className="panel-heading">
              <h3>
                <span className="valign-middle">Workflows</span>
                <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickAddWf}>Add</Button>
                <Button variant="outlined" size="small" className="valign-middle margin-md-left">Create New</Button>
              </h3>
            </div>
            <div className="panel-body">
              {this.renderWorkflows()}
            </div>
          </div>

          <div className="panel panel-default margin-lg-bottom" style={panelStyle}>
            <div className="panel-heading">
              <h3>
                <span className="valign-middle">Incidents</span>
                <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickAddIncident}>Add</Button>
                <Button variant="outlined" size="small" className="valign-middle margin-md-left" onClick={onClickNewIncident}>Create New</Button>
              </h3>
            </div>
            <div className="panel-body">
              {this.renderIncidents()}
            </div>
          </div>

          <div className="padding-md">
            <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
          </div>
        </form>

        {this.props.loading && <div style={{position: 'fixed', left: 0, right: 0, bottom: 0, top: 0}}><RefreshOverlay/></div>}
        {this.props.children}
      </div>
    )
  }
}

export default withStyles({})(SimulationModalView)
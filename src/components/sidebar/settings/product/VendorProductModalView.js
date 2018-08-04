import React from 'react'
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import {Button, Chip, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { FormInput } from 'components/modal/parts'

const panelStyle = {width: 1000, height: 623, overflow: 'auto'}

class SimulationModalView extends React.Component {
  renderTags () {
    const {tags, onClickAddTag, onClickDeleteTag} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <div>
            <span className="valign-middle">Tags</span>
            <AddIcon className="link valign-middle" onClick={onClickAddTag}/>
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
    const {classifierCells, onClickAddClass, onClickDeleteClass} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <div>
            <span className="valign-middle">Classifiers</span>
            <AddIcon className="link valign-middle" onClick={onClickAddClass}/>
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
    const {grokCells, onClickAddGrok, onClickDeleteGrok} = this.props
    return (
      <div>
        <div className="group-header padding-md-top padding-md-bottom">
          <span className="valign-middle">Parser</span>
          <AddIcon className="link valign-middle" onClick={onClickAddGrok}/>
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
    const {workflows, onClickAddWf, onClickDeleteWf} = this.props
    return (
      <div>
        <div className="group-header">
          <span className="valign-middle">Workflows</span>
          <AddIcon className="link valign-middle" onClick={onClickAddWf}/>
        </div>
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
                <td><DeleteIcon onClick={() => onClickDeleteWf(t.id)}/></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderIncidents () {
    const {onClickAddIncident, onClickDeleteIncident} = this.props
    return (
      <div>
        <div className="group-header">
          <span className="valign-middle">Incidents</span>
          <AddIcon className="link valign-middle" onClick={onClickAddIncident}/>
        </div>
        <div>

        </div>
      </div>
    )
  }

  render () {
    const {onSubmit} = this.props
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
              <h3>Workflows</h3>
            </div>
            <div className="panel-body">
              {this.renderWorkflows()}
            </div>
          </div>

          <div className="panel panel-default margin-lg-bottom" style={panelStyle}>
            <div className="panel-heading">
              <h3>Incidents</h3>
            </div>
            <div className="panel-body">
              {this.renderIncidents()}
            </div>
          </div>

          <div className="padding-md">
            <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
          </div>
        </form>

        {this.props.children}
      </div>
    )
  }
}

export default withStyles({})(SimulationModalView)
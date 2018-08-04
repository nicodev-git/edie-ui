import React from 'react'
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import {Button, Chip, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { FormInput } from 'components/modal/parts'

class SimulationModalView extends React.Component {
  renderTags () {
    const {tags, onClickAddTag, onClickDeleteTag} = this.props
    return (
      <div>
        <div className="group-header">
          <div>Tags</div>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddTag}/>
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
        <div className="group-header">
          <div>Classifiers</div>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddClass}/>
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
        <div className="group-header">
          <div>Parser</div>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddGrok}/>
          </div>
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
          <div>Workflows</div>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddWf}/>
          </div>
        </div>
        <div >
          <div style={{maxHeight: 300, overflow: 'auto'}}>
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
      </div>
    )
  }

  renderIncidents () {
    return (
      <div>
        <div className="padding-md">
          <h3>Incidents</h3>
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

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Vendor Product Info</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
                </div>
                <div className="col-md-2 col-lg-2">
                  <Field name="version" component={FormInput} floatingLabel="Version" className="margin-md-right" fullWidth/>
                </div>
                <div className="col-md-8 col-lg-6">
                  <Field name="description" component={FormInput} floatingLabel="Description" className="margin-md-right" fullWidth/>
                </div>
              </div>


              {this.renderTags()}
              {this.renderClasses()}
              {this.renderGroks()}
              {this.renderWorkflows()}
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
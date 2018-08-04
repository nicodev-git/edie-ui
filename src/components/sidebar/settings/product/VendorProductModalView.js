import React from 'react'
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import {Button, Chip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'

import { FormInput } from 'components/modal/parts'

class SimulationModalView extends React.Component {
  renderTags () {
    const {tags, onClickAddTag, onClickDeleteTag} = this.props
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Tags</h3>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddTag}/>
          </div>
        </div>
        <div className="panel-body">
          {tags.map((t, i) =>
            <Chip key={t} label={t} className="margin-sm" onDelete={() => onClickDeleteTag(i)}/>
          )}
        </div>
      </div>
    )
  }

  renderClasses () {
    const {classifiers, onClickAddClass, onClickDeleteClass} = this.props
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Classifiers</h3>
          <div className="panel-options">
            <AddIcon className="link margin-md-top" onClick={onClickAddClass}/>
          </div>
        </div>
        <div className="panel-body">
          {classifiers.map((t, i) =>
            <Chip key={t} label={t} className="margin-sm" onDelete={() => onClickDeleteClass(i)}/>
          )}
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
            </div>
          </div>

          {this.renderTags()}

          {this.renderClasses()}

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Parser</h3>
            </div>
            <div className="panel-body">
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Workflows</h3>
            </div>
            <div className="panel-body">
            </div>
          </div>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Incidents</h3>
            </div>
            <div className="panel-body">
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
import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Header, TwoButtonsBlock } from './parts'

export default class WorkflowStep1 extends Component {
  render () {
    const {categories, onAddCategory, categoryModal} = this.props
    return (
      <div>
        <div className="row margin-md-bottom">
          <label className="col-md-3">Name</label>
          <div className="col-md-9">
            <Field name="name" component="input" className="form-control"/>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <label className="col-md-3">Description</label>
          <div className="col-md-9">
            <Field name="desc" component="input" className="form-control"/>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <label className="col-md-3 control-label">Display Incident Description</label>
          <div className="col-md-8 pr-none">
            <Field name="display_incident_desc" component="input" className="form-control"/>
          </div>
          <div className="col-md-1 text-right pl-none margin-sm-top">
            <a href="javascript:;">
              <i className="fa fa-question-circle fa-x"
                data-class="tt-workflow"
                data-tip={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}/>
            </a>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <label className="col-md-3">Category</label>
          <div className="col-md-8 pr-none">
            <Field name="category" component="select" className="form-control">
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </Field>
          </div>
          <div className="col-md-1 text-right pl-none margin-sm-top">
            <a href="javascript:;" onClick={onAddCategory}><i className="fa fa-plus-square fa-x"/></a>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <label className="col-md-3">Severity</label>
          <div className="col-md-9">
            <Field name="severity" component="select" className="form-control">
              <option>HIGH</option>
              <option>MEDIUM</option>
              <option>LOW</option>
              <option>AUDIT</option>
              <option>IGNORE</option>
              <option>IGNOREDELETE</option>
              <option>DEVICE</option>
            </Field>
          </div>
        </div>
        <div className="row margin-md-bottom">
          <label className="col-md-3">Enabled</label>
          <div className="col-md-9">
            <Field name="enable" component="input" type="checkbox"/>
          </div>
        </div>
        {categoryModal}
      </div>
    )
  }
}

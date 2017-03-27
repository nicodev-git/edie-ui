import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FormInput, SubHeader } from './parts'
import FlatButton from 'material-ui/FlatButton'
import ActionList from 'material-ui/svg-icons/action/list'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import { selectedItemStyle } from 'style/materialStyles'

export default class WorkflowStep0 extends Component {
  render () {
    const {workflowEditType, updateWorkflowEditType} = this.props
    return (
      <div>
        <Field name="name" component={FormInput} label="Name"/>
        <div className="wizard-diagram-choice">
          <SubHeader name="Add by"/>
          <div className="col-md-9">
            <FlatButton
              icon={<ActionList />}
              style={selectedItemStyle}
              onTouchTap={updateWorkflowEditType.bind(null, 'wizard')}
              backgroundColor={workflowEditType === 'wizard' ? '#C0C0C0' : null}/>
            <FlatButton
              icon={<ActionTrendingUp />}
              style={selectedItemStyle}
              onTouchTap={updateWorkflowEditType.bind(null, 'diagram')}
              backgroundColor={workflowEditType === 'diagram' ? '#C0C0C0' : null}/>
          </div>
        </div>
      </div>
    )
  }
}

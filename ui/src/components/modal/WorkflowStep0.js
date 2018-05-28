import React, { Component } from 'react'
import { Field } from 'redux-form'
import { FormInput } from 'components/modal/parts'
import ActionList from '@material-ui/icons/List'
import ActionTrendingUp from '@material-ui/icons/TrendingUp'
import {Button} from '@material-ui/core'
import { selectedItemStyle } from 'style/common/materialStyles'

export default class WorkflowStep0 extends Component {
  render () {
    const {workflowEditType, updateWorkflowEditType} = this.props
    return (
      <div>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Name"/>
        </div>
        <div className="wizard-diagram-choice">
          <div className="col-md-3">Add By</div>
          <div className="col-md-9">
            <Button variant="flat"
              icon={<ActionList color={workflowEditType === 'wizard' ? 'white' : null}/>}
              style={selectedItemStyle}
              onClick={updateWorkflowEditType.bind(null, 'wizard')}

              backgroundColor={workflowEditType === 'wizard' ? '#2383F3' : null}/>
            <Button variant="flat"
              icon={<ActionTrendingUp color={workflowEditType === 'diagram' ? 'white' : null}/>}
              style={selectedItemStyle}
              onClick={updateWorkflowEditType.bind(null, 'diagram')}
              backgroundColor={workflowEditType === 'diagram' ? '#2383F3' : null}/>
          </div>
        </div>
      </div>
    )
  }
}

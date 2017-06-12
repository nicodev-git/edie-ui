import React, { Component } from 'react'
import { Field } from 'redux-form'
import {Chip} from 'material-ui'
import { FormInput, SubHeader } from './parts'
import FlatButton from 'material-ui/FlatButton'
import ActionList from 'material-ui/svg-icons/action/list'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import { selectedItemStyle, chipStyles } from 'style/materialStyles'

export default class WorkflowStep0 extends Component {
  render () {
    const {workflowEditType, updateWorkflowEditType, tags, onClickDeleteTag} = this.props
    return (
      <div>
        <div className="form-column">
          <Field name="name" component={FormInput} label="Name"/>
        </div>
        <div style={chipStyles.wrapper}>
          {tags.map((t, i) =>
            <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
          )}
        </div>
        <div className="wizard-diagram-choice">
          <SubHeader name="Add by"/>
          <div className="col-md-9">
            <FlatButton
              icon={<ActionList color={workflowEditType === 'wizard' ? 'white' : null}/>}
              style={selectedItemStyle}
              onTouchTap={updateWorkflowEditType.bind(null, 'wizard')}

              backgroundColor={workflowEditType === 'wizard' ? '#2383F3' : null}/>
            <FlatButton
              icon={<ActionTrendingUp color={workflowEditType === 'diagram' ? 'white' : null}/>}
              style={selectedItemStyle}
              onTouchTap={updateWorkflowEditType.bind(null, 'diagram')}
              backgroundColor={workflowEditType === 'diagram' ? '#2383F3' : null}/>
          </div>
        </div>
      </div>
    )
  }
}

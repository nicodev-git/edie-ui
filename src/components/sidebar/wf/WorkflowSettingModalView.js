import React from 'react'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, Modal, CardPanel } from 'components/modal/parts'
import {severities} from 'shared/Global'

export default class WorkflowNameModalView extends React.Component {
    render () {
        const {
            onClickClose, onSubmit
        } = this.props
        return (
            <Modal title="Setting" onRequestClose={onClickClose}>
                <form onSubmit={onSubmit}>
                    <CardPanel title="Setting">
                        <Field name="sendToChat" component={FormCheckbox} label="Send Slack"/>
                        <Field name="channel" component={FormInput} floatingLabel="Channel"/>
                        <Field name="incidentSeverity" component={FormSelect} floatingLabel="Severity"
                               className="margin-md-left"
                               options={severities}/>
                    </CardPanel>
                    <SubmitBlock name="Save"/>
                </form>
            </Modal>
        )
    }
}

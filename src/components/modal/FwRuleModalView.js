import React from 'react'
import Modal from 'react-bootstrap-modal'
import {Field, Form} from 'redux-form'
import {
    Header, FormInput, SubmitBlock, FormSelect
} from './parts'

const actions = [
    {label: 'Allow', value: 'allow'},
    {label: 'Block', value: 'block'}
]
const protocols = [
    {label: 'TCP', value: 'tcp'},
    {label: 'UDP', value: 'udp'},
    {label: 'ICMPv4', value: 'icmpv4'},
    {label: 'ICMPv6', value: 'icmpv6'}
]
export default class FwRuleModalView extends React.Component {
    render () {
        const { onSubmit, onHide } = this.props
        return (
            <Modal show onHide={onHide} aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">
                <Header name="Rule"/>
                <div className="modal-body bootstrap-dialog-message pt-none">
                    <Form onSubmit={onSubmit}>
                        <div>
                            <Field name="rule" component={FormInput} floatingLabel="Rule Name"/>&nbsp;
                            <Field name="localip" component={FormInput} floatingLabel="Source"/>&nbsp;
                        </div>
                        <div>
                            <Field name="remoteip" component={FormInput} floatingLabel="Destination"/>&nbsp;
                            <Field name="remoteport" component={FormInput} floatingLabel="Destination Port"/>

                        </div>
                        <div>
                            <Field name="protocol" component={FormSelect} floatingLabel="Protocol" options={protocols} className="valign-top"/>
                            <Field name="action" component={FormSelect} floatingLabel="Action" options={actions} className="valign-top"/>&nbsp;
                        </div>
                        <SubmitBlock name="OK" onCancel={onHide}/>
                    </Form>
                </div>
            </Modal>
        )
    }
}

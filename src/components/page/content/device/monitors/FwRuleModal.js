import React from 'react'
import {reduxForm, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'

import FwRuleModalView from 'components/modal'

@connect(
    state => ({
        initialValues: {protocol: 'tcp', action: 'block'},
        formValues: formValueSelector('tabFirewallForm')(
            state, 'rule', 'program')
    })
)
@reduxForm({form: 'firewallRuleForm'})
export default class FwRuleModal extends React.Component {
    onSubmit (values) {
        console.log(values)
        onSave && onSave(values)
        this.props.showRuleModal(false)
    }
    onHide () {
        this.props.showRuleModal(false)
    }
    render () {
        const {handleSubmit} = this.props
        return (
            <FwRuleModalView
                {...this.props}
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onHide={this.onHide.bind(this)}
            />
        )
    }
}

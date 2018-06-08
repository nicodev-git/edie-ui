import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'

import {
    FormSelect,
    Modal
} from 'components/modal/parts'

export default class QueryFieldModal extends Component {
    render () {
        const {
            onSubmit, onClickClose, queryFields, getImqueryFieldValues
        } = this.props
        return (
            <Modal title="Query" onRequestClose={onClickClose}>
                <div style={{minHeight: 250}}>
                    <Field name="imqueryField" component={FormSelect} floatingLabel="Target/Var"
                           options={queryFields}
                           className="margin-lg-top" fullWidth/>
                    <Field name="imqueryValue" component={FormSelect} floatingLabel="Value"
                           options={getImqueryFieldValues()}
                           className="margin-lg-top" fullWidth/>
                </div>
                <div className="margin-md-top text-right">
                    <Button variant="raised" color="primary" onClick={onSubmit}>OK</Button>
                </div>
            </Modal>
        )
    }
}
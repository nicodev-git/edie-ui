import React from 'react'
import { connect } from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {Button} from '@material-ui/core'

import {
    Modal,
    CardPanel,
    FormInput
} from 'components/modal/parts'

class CellParamModal extends React.Component {
    onSubmit (values) {
        const {onSave} = this.props
        onSave(values)
    }

    render() {
        const {handleSubmit, onClose} = this.props
        return (
            <Modal title="Param" onRequestClose={onClose}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <CardPanel title="Param">
                        <Field name="key" component={FormInput} floatingLabel="Name" className="margin-md-right valign-top"/>
                        <Field name="value" component={FormInput} floatingLabel="Value" className="margin-md-right valign-top"/>
                    </CardPanel>

                    <div className="margin-md-top">
                        <Button variant="raised" type="submit">OK</Button>
                    </div>
                </form>
            </Modal>
        )

    }
}

export default connect(
    (state) => ({
        initialValues: state.settings.editCellParam
    })
)(reduxForm({form: 'cellParamForm'})(CellParamModal))

import React from 'react'
import {Field} from 'redux-form'

import {
    FormInput,
    CardPanel
} from 'components/modal/parts'

export default class RemotePingForm extends React.Component {
    render () {
        return (
            <div>
                <CardPanel title="Basic">
                    <Field name="name" component={FormInput} floatingLabel="Name"
                           className="valign-top margin-md-right"/>
                    <Field name="ip" component={FormInput} floatingLabel="IP"
                           className="valign-top margin-md-right"/>
                </CardPanel>

            </div>
        )
    }
}

import React from 'react'
import {Field} from 'redux-form'

import {
    FormInput,
    CardPanel
} from 'components/modal/parts'

export default class ServiceMonitorForm extends React.Component {
    render () {
        return (
            <div>
                <CardPanel title="Basic">
                    <Field name="name" component={FormInput} floatingLabel="Name"
                           className="valign-top margin-md-right"/>
                    <Field name="serviceName" component={FormInput} floatingLabel="Service Name"
                           className="valign-top margin-md-right"/>
                </CardPanel>

            </div>
        )
    }
}

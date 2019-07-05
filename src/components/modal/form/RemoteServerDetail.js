import React from 'react'
import {Field} from 'redux-form'

import {
    FormInput,
    FormSelect
} from 'components/modal/parts'

export default class RemoteServerDetail extends React.Component {
    render () {
        const {collectors} = this.props
        const collectorOptions = collectors.map(p => ({
            value: p.id,
            label: p.name
        }))
        return (
            <div>
                <Field name="executorId" component={FormSelect} floatingLabel="Connector"
                       options={collectorOptions} className="valign-top margin-md-right"/>
            </div>
        )
    }
}

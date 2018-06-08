import React from 'react'
import {Field} from 'redux-form'
import uuid from 'uuid'

import {
    FormInput,
    CardPanel
} from 'components/modal/parts'
import {ROOT_URL} from 'actions/config'

export default class ShareVarForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            uuid: uuid.v4()
        }
    }

    componentDidMount () {
        const {varUuid} = this.props.initialValues || {}
        if (varUuid) {
            this.setState({
                uuid: varUuid
            })
        } else {
            this.props.change('varUuid', this.state.uuid)
        }
    }

    render () {
        return (
            <div>
                <CardPanel title="Basic">
                    <Field name="name" component={FormInput} floatingLabel="Name"
                           className="valign-top margin-md-right"/>
                </CardPanel>
                <CardPanel title="Share">
                    <div>
                        <Field name="variable" component={FormInput} floatingLabel="Variable"
                               className="valign-top margin-md-right"/>
                    </div>
                    <div className="margin-md-top">
                        <label>http:{ROOT_URL}/getvar/{this.state.uuid}</label>
                    </div>

                    <div className="hidden">
                        <Field name="varUuid" component={FormInput}/>
                    </div>
                </CardPanel>


            </div>
        )
    }
}

import React from 'react'
import {Field} from 'redux-form'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import {
    FormInput,
    FormSelect,
    CardPanel,
    FormCheckbox
} from 'components/modal/parts'

const labelStyle = {
    fontSize: 16,
    marginTop: 13,
    verticalAlign: 'middle',
    display: 'inline-block',
    marginRight: 16
}

const unitOptions = [{
    label: 'Minutes',
    value: 'min'
}, {
    label: 'Hours',
    value: 'hour'
}, {
    label: 'Days',
    value: 'day'
}]

export default class FlowFinishForm extends React.Component {
    constructor (props) {
        super(props)

        const fields = []

        let {wfConditions} = props.initialValues || {}
        wfConditions = wfConditions || []
        wfConditions.forEach((value, id) => {
            fields.push({
                ...value,
                id
            })
        })

        if (!fields.length) {
            fields.push({
                id: 0
            })
        }

        this.state = {
            fields
        }
    }
    componentDidMount () {
        const {fields} = this.state
        fields.forEach(f => {
            this.props.change(`wfCondition.checkFlowId${f.id}`, f.checkFlowId)
            this.props.change(`wfCondition.duration${f.id}`, f.duration)
            this.props.change(`wfCondition.durationUnit${f.id}`, f.durationUnit)
        })
    }

    onClickDelete (id) {
        const {fields} = this.state
        this.setState({
            fields: fields.filter(p => p.id !== id)
        })
        this.props.change(`wfCondition.checkFlowId${id}`, '')
        this.props.change(`wfCondition.duration${id}`, '')
        this.props.change(`wfCondition.durationUnit${id}`, '')
    }
    onClickAdd () {
        const {fields} = this.state

        const maxId = Math.max.apply(null, fields.map(p => p.id)) + 1
        this.setState({
            fields: [...fields, {
                id: maxId
            }]
        })
    }
    render () {
        const {fields} = this.state
        const {workflows} = this.props
        const workflowOptions = workflows.map(p => ({
            label: p.name,
            value: p.uuid
        }))
        return (
            <div>
                <CardPanel title="Basic">
                    <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
                    <Field name="desc" component={FormInput} floatingLabel="Description"/>
                </CardPanel>
                <CardPanel title="Details">
                    <div>
                        {fields.map((p, i) =>
                            <div key={p.id}>
                                <label style={labelStyle}>Check </label>
                                <Field name={`wfCondition.checkFlowId${p.id}`} component={FormSelect} label="Workflow"
                                       options={workflowOptions} className="valign-top margin-md-right"/>
                                <label style={labelStyle}> for last </label>
                                <Field name={`wfCondition.duration${p.id}`} component={FormInput} label="Duration"
                                       className="valign-top margin-md-right"
                                       style={{width: 60}}/>
                                <Field name={`wfCondition.durationUnit${p.id}`} component={FormSelect} label="Time"
                                       className="valign-top margin-md-right"
                                       options={unitOptions}
                                       style={{width: 150}}/>
                                <div className="inline-block valign-top" style={{marginTop: 10}}>
                                    <DeleteIcon
                                        className="link"
                                        onClick={this.onClickDelete.bind(this, p.id)}/>
                                </div>
                            </div>
                        )}

                        <div className="inline-block valign-top" style={{marginTop: 10}}>
                            <AddIcon
                                className="link"
                                onClick={this.onClickAdd.bind(this)}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            name="gotoFirstStep"
                            component={FormCheckbox}
                            label="If not found, goto the first step"
                        />
                    </div>
                </CardPanel>
            </div>
        )
    }
}

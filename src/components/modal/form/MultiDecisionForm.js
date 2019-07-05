import React from 'react'
import {Field} from 'redux-form'
import {
    FormInput, FormSelect, CardPanel
} from 'components/modal/parts'
import {findIndex} from 'lodash'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

const conditions = [{
    "label": "Match at least 1",
    "value": "match1"
}, {
    "label": "Not match all",
    "value": "notmatchall"
}, {
    "label": "Contain at least 1",
    "value": "contain1"
}, {
    "label": "Not contain all",
    "value": "notcontainall"
}]

const underlineStyle = {
    borderColor: 'transparent'
}

const halfStyle = {
    height: 36
}

const hintStyle = {
    bottom: 6
}

export default class MultiDecisionForm extends React.Component {
    constructor (props) {
        super(props)

        const fields = []

        let {matches} = props.initialValues || {}
        matches = matches || []
        matches.forEach((value, id) => {
            fields.push({
                id,
                field: value.field,
                condition: value.condition,
                values: value.values.map((value, id) => ({
                    id,
                    value
                }))
            })
        })

        if (!fields.length) {
            fields.push({
                id: 0,
                values: [{
                    id: 0
                }]
            })
        }

        this.state = {
            fields
        }
    }
    componentDidMount () {
        const {fields} = this.state
        fields.forEach(f => {
            if (f.field) {
                this.props.change(`match.name${f.id}`, f.field)
                this.props.change(`match.condition${f.id}`, f.condition)
                f.values.forEach((v) => {
                    this.props.change(`match.value_${f.id}_${v.id}`, v.value)
                })

            }
        })
    }

    ///////////////////////////////////

    onClickDelete (id) {
        const {fields} = this.state

        const index = findIndex(fields, {id})
        fields[index].values.forEach(v => {
            this.props.change(`match.value_${id}_${v.id}`, '')
        })
        this.props.change(`match.name${id}`, '')
        this.props.change(`match.condition${id}`, '')

        this.setState({
            fields: fields.filter(p => p.id !== id)
        })
    }
    onClickAdd () {
        const {fields} = this.state

        const maxId = Math.max.apply(null, fields.map(p => p.id)) + 1
        this.setState({
            fields: [...fields, {
                id: maxId,
                values: [{
                    id: 0
                }]
            }]
        })
    }

    ///////////////////////////////////

    onClickAddValue (id) {
        const {fields} = this.state
        this.setState({
            fields: fields.map(p => {
                if (p.id !== id) return p

                const maxId = Math.max.apply(null, p.values.map(p => p.id)) + 1
                return {
                    ...p,
                    values: [
                        ...p.values,
                        {
                            id: maxId
                        }
                    ]
                }
            })
        })
    }

    onClickDeleteValue (pid, vid) {
        const {fields} = this.state
        this.props.change(`match.value_${pid}_${vid}`, '')
        this.setState({
            fields: fields.map(p => {
                if (p.id !== pid) return p

                return {
                    ...p,
                    values: p.values.filter(v => v.id !== vid)
                }
            })
        })
    }

    render () {
        const {fields} = this.state
        return (
            <CardPanel title="Details">
                <div style={{maxHeight: 500, overflow: 'auto'}}>
                    <div>
                        <Field name="name" component={FormInput} floatingLabel="Name"
                               underlineStyle={underlineStyle}/>
                    </div>
                    <table className="table table-p-sm table-panel">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Condition</th>
                                <th>Values</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {fields.map((p) =>
                            <tr key={p.id}>
                                <td className="valign-top">
                                    <Field name={`match.name${p.id}`} component={FormInput} label="Field Name"
                                           className="valign-top margin-md-right"
                                           underlineStyle={underlineStyle}
                                           style={{...halfStyle, width: 150}}
                                           hintStyle={hintStyle}/>
                                </td>
                                <td className="valign-top">
                                    <Field name={`match.condition${p.id}`} component={FormSelect} label="Condition"
                                           options={conditions} className="valign-top margin-md-right"
                                           underlineStyle={underlineStyle}
                                           style={{...halfStyle, width: 200, marginTop: -6}}
                                           hintStyle={{bottom: 0}}/>
                                </td>
                                <td className="valign-top">
                                    {p.values.map(v =>
                                        <div key={`${p.id}_${v.id}`}>
                                            <Field name={`match.value_${p.id}_${v.id}`}
                                                   component={FormInput}
                                                   label="Value"
                                                   className="valign-top"
                                                   underlineStyle={underlineStyle}
                                                   style={{...halfStyle, width: 180}}
                                                   hintStyle={hintStyle}
                                            />
                                            <div className="inline-block valign-top" style={{marginTop: 10}}>
                                                <img src="/images/delete.png" className="link"
                                                     width="16" alt=""
                                                     onClick={this.onClickDeleteValue.bind(this, p.id, v.id)}/>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="valign-top">
                                    <AddIcon
                                        className="link"
                                        onClick={this.onClickAddValue.bind(this, p.id)}
                                        style={{marginTop: 8}}
                                    />

                                    <div className="inline-block valign-top" style={{marginTop: 8}}>
                                        <DeleteIcon
                                            className="link"
                                            onClick={this.onClickDelete.bind(this, p.id)}/>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="4">
                                <AddIcon
                                    className="link"
                                    onClick={this.onClickAdd.bind(this)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </CardPanel>
        )
    }
}

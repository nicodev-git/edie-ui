import React from 'react'
import {Field} from 'redux-form'
import {keys} from 'lodash'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import {
    FormInput,
    CardPanel
} from 'components/modal/parts'

export default class BuildForm extends React.Component {
    constructor (props) {
        super(props)

        const {mapping} = props.initialValues || {}
        const fields = []
        let id = 0
        keys(mapping || {}).forEach(key => {
            fields.push({
                id,
                key,
                value: mapping[key]
            })
            id++
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
            if (f.key) this.props.change(`mapping.from${f.id}`, f.key)
            if (f.value) this.props.change(`mapping.to${f.id}`, f.value)
        })
    }

    onClickDelete (id) {
        const {fields} = this.state
        this.setState({
            fields: fields.filter(p => p.id !== id)
        })
        this.props.change(`mapping.from${id}`, '')
        this.props.change(`mapping.to${id}`, '')
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
        return (
            <CardPanel title="Details">
                <div>
                    <Field name="name" component={FormInput} floatingLabel="Name"/>
                </div>
                {fields.map((p) =>
                    <div key={p.id}>
                        <Field name={`mapping.from${p.id}`}
                               component={FormInput}
                               floatingLabel="Field Name"
                               className="valign-top margin-md-right"
                               style={{width: 150}}
                        />
                        <Field name={`mapping.to${p.id}`}
                               component={FormInput}
                               floatingLabel="Value"
                               className="valign-top"
                               style={{width: 400}}
                        />
                        <div className="inline-block valign-top" style={{marginTop: 36}}>
                            <DeleteIcon
                                className="link"
                                onClick={this.onClickDelete.bind(this, p.id)}/>
                        </div>
                    </div>
                )}
                <div className="margin-md-top">
                    <AddIcon
                        className="link"
                        onClick={this.onClickAdd.bind(this)}
                    />
                </div>
            </CardPanel>
        )
    }
}

import React from 'react'
import {Field} from 'redux-form'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import {
    FormInput
} from 'components/modal/parts'

class MapperForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fields: [{
                id: 0
            }]
        }
    }
    onClickDelete (id) {
        const {fields} = this.state
        this.setState({
            fields: fields.filter(p => p.id !== id)
        })
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
            <div>
                {fields.map((p) =>
                    <div key={p.id}>
                        <Field name={`mapping.from${p.id}`}
                               component={FormInput}
                               floatingLabel="From"
                               className="valign-top margin-md-right"/>
                        <Field name={`mapping.to${p.id}`}
                               component={FormInput}
                               floatingLabel="To"
                               className="valign-top"/>
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
            </div>
        )
    }
}

export default MapperForm
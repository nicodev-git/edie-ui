import React from 'react'
import {Field} from 'redux-form'
import {Dialog} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import {
    FormInput,
    FormSelect,
    SubmitBlock
} from 'components/modal/parts'

import {mappingFieldOptions} from 'shared/Global'

export default class MappingModalView extends React.Component {
    render () {
        const {fields, onClickAdd, onClickDelete, onSubmit, onClickClose} = this.props
        return (
            <Dialog open title="Mapping">
                <form onSubmit={onSubmit}>
                    {fields.map((p) =>
                        <div key={p.id}>
                            <Field name={`mapping.from${p.id}`}
                                   component={FormInput}
                                   floatingLabel="From"
                                   className="valign-top margin-md-right"
                                   style={{width: 150}}
                            />
                            <Field name={`mapping.existing${p.id}`}
                                   component={FormSelect}
                                   floatingLabel="Existing"
                                   className="valign-top margin-md-right"
                                   options={mappingFieldOptions}
                                   style={{width: 150}}
                            />
                            <Field name={`mapping.to${p.id}`}
                                   component={FormInput}
                                   floatingLabel="To"
                                   className="valign-top"
                                   style={{width: 150}}/>
                            <div className="inline-block valign-top" style={{marginTop: 36}}>
                                <DeleteIcon
                                    className="link"
                                    onClick={() => onClickDelete(p.id)}/>
                            </div>
                        </div>
                    )}
                    <div className="margin-md-top">
                        <AddIcon
                            className="link"
                            onClick={onClickAdd}
                        />
                    </div>
                    <SubmitBlock name="Save" onCancel={onClickClose}/>
                </form>
            </Dialog>
        )
    }
}
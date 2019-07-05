import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Button} from '@material-ui/core'
import InputIcon from '@material-ui/icons/Input'
import SaveIcon from '@material-ui/icons/Save'
import DefaultIcon from '@material-ui/icons/PlaylistAddCheck'
import {
    FormInput,
    FormSelect,
    Modal,
    CardPanel
} from 'components/modal/parts'


export default class UserConnectorModalView extends Component {
    render () {
        const {
            onSubmit, onClickClose, types, allValues,
            jsonMapping, onReadJson, existingVars,
            onClickJsonRow, selectedJsonRow, onClickJsonRowUpdate, onClickSetResult,
            id, mailTypes, baseUrl
        } = this.props
        const {type, mailType} = allValues || {}
        return (
            <Modal title="Connector" onRequestClose={onClickClose} contentStyle={{width: 1000, maxWidth: 'initial'}}>
                <form onSubmit={onSubmit}>
                    <CardPanel title="Connector">
                        <Field name="type" component={FormSelect} options={types} floatingLabel="Type"
                               className="margin-md-right valign-top" style={{minWidth: 160}}/>
                        {type === 'RocketChat' ? (
                            <Field name="url" component={FormInput} floatingLabel="Url" className="margin-md-right valign-top"
                                style={{width: 350}}/>
                        ) : null}

                        {type === 'Slack'? (
                            <Field name="token" component={FormInput} floatingLabel="ExternalToken" className="margin-sm-top" fullWidth/>
                        ) : null}

                        {type === 'Mail' ? (
                            <Field name="mailType" component={FormSelect} options={mailTypes} floatingLabel="Mail Type"
                                   className="margin-md-right valign-top" style={{minWidth: 160}}/>
                        ) : null}

                        {type === 'Mail' && mailType !== 'Gmail' ? (
                            <Field name="host" component={FormInput} floatingLabel="Host" className="margin-md-right"/>
                        ) : null}

                        {type === 'RocketChat' || type === 'Mail' ? (
                            <Field name="userName" component={FormInput} floatingLabel="UserName" className="margin-md-right"/>
                        ) : null}

                        {type === 'RocketChat' || type === 'Mail' ? (
                            <Field name="password" component={FormInput} floatingLabel="Password" type="password" className="margin-md-right"/>
                        ) : null}
                        {type === 'Rest' ? (
                            <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
                        ) : null }
                        {type === 'Rest' ? (
                            <Field name="description" component={FormInput} floatingLabel="Description" className="margin-md-right"/>
                        ) : null }
                    </CardPanel>
                    <div>
                        <label>Token: {id}</label>
                    </div>

                    {type === 'Rest' ? (
                        <CardPanel title="Curl" tools={<InputIcon onClick={onReadJson}/>}>
                            curl -d "{'{'}'id': '{id}', 'data': 'simple text'{'}'}" -X POST {baseUrl}/api/post
                        </CardPanel>
                    ) : null}

                    {type === 'Rest' ? (
                        <CardPanel title="Rest" tools={<InputIcon onClick={onReadJson}/>}>
                            <div>
                                <Field name="json" component={FormInput} floatingLabel="Json" multiline className="margin-md-right" fullWidth/>
                            </div>
                        </CardPanel>
                    ) : null}

                    {type === 'Rest' ? (
                        <CardPanel title="Rest">
                            <div>
                                <Field name="varExisting" component={FormSelect} floatingLabel="Existing" className="margin-md-right valign-top"
                                    options={existingVars.map(p => ({label: p, value: p}))}/>
                                <Field name="varNew" component={FormInput} floatingLabel="New" className="margin-md-right valign-top"/>
                                <SaveIcon className="link valign-middle margin-md-top" onClick={onClickJsonRowUpdate}/>
                                <DefaultIcon className="link valign-top margin-md-top margin-md-left" onClick={onClickSetResult}/>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Json Field</th>
                                    <th>Variable name</th>
                                    <th>Tag</th>
                                </tr>
                                </thead>
                                <tbody>
                                {jsonMapping.map((p, i) =>
                                    <tr key={p.field} onClick={() => onClickJsonRow(i)}
                                        className={selectedJsonRow === i ? 'selected' : ''}>
                                        <td>
                                            {p.field}
                                        </td>
                                        <td>
                                            {p.varName}
                                        </td>
                                        <td>
                                            {p.tag}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </CardPanel>
                    ) : null}

                    <div className="margin-md-top">
                        <Button variant="raised" type="submit">OK</Button>
                    </div>
                </form>
            </Modal>
        )
    }
}

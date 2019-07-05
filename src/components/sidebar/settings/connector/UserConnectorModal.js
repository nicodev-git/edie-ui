import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { keys, isObject } from 'lodash'

import UserConnectorModalView from './UserConnectorModalView'

const types = [{
    label: 'RocketChat', value: 'RocketChat'
}, {
    label: 'Slack', value: 'Slack'
}, {
    label: 'Rest', value: 'Rest'
}, {
    label: 'Mail', value: 'Mail'
}, {
    label: 'Gitlab', value: 'Gitlab'
}, {
    label: 'Jenkins', value: 'Jenkins'
}]

const mailTypes = [{
    label: 'SMTP', value: 'SMTP'
}, {
    label: 'Gmail', value: 'Gmail'
}, {
    label: 'Exchange', value: 'Exchange'
}]

const newVarOption = '[New]'
const existingVars = ['rawdata', 'description', newVarOption]

class UserConnectorModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonMapping: props.editUserConnector ? (props.editUserConnector.jsonMapping || []) : [],
            selectedJsonRow: -1,
        }
    }

    onSubmit (values) {
        const {onSave, editUserConnector} = this.props
        const {jsonMapping} = this.state

        const entity = {
            ...editUserConnector,
            ...values,
            jsonMapping
        }

        onSave(entity)

        this.onClickClose()
    }
    onClickClose () {
        this.props.showUserConnectorModal(false)
    }

    ///////////////////////////////////////////////////////////////////

    extractFields (parsed, path) {
        let jsonMapping = []
        keys(parsed).forEach(field => {
            if (parsed[field] && isObject(parsed[field])) {
                const subpath = path ? `${path}.${field}` : field
                jsonMapping = [...jsonMapping, ...this.extractFields(parsed[field], subpath)]
            } else {
                jsonMapping.push({
                    field: path ? `${path}.${field}` : field,
                    varName: ''
                })
            }

        })

        return jsonMapping
    }

    onReadJson () {
        const {json} = this.props.allValues
        let parsed
        try {
            parsed = JSON.parse(json)
        } catch (e) {
            window.alert('Parse failed.')
            return
        }

        const jsonMapping = this.extractFields(parsed)

        this.setState({
            jsonMapping,
            selectedJsonRow: -1
        })
    }

    onClickJsonRow (index) {
        const {jsonMapping} = this.state
        const row = jsonMapping[index]
        const {varName} = row
        if (existingVars.includes(row.varName)) {
            this.props.change('varNew', '')
            this.props.change('varExisting', varName)
        } else {
            this.props.change('varNew', varName)
            this.props.change('varExisting', newVarOption)
        }

        this.setState({
            selectedJsonRow: index
        })
    }

    onClickJsonRowUpdate () {
        const {selectedJsonRow, jsonMapping} = this.state
        const {varExisting, varNew} = this.props.allValues
        if (selectedJsonRow < 0) return
        const varName = varExisting === newVarOption ? varNew : varExisting
        jsonMapping[selectedJsonRow].varName = varName
        this.setState({jsonMapping})
    }

    onClickSetResult () {
        const {selectedJsonRow, jsonMapping} = this.state
        if (selectedJsonRow < 0) return
        this.setState({
            jsonMapping: jsonMapping.map((p, i) => ({
                ...p,
                tag: selectedJsonRow === i ? 'result' : ''
            }))
        })
    }
    //////////////////////////////////////////////////////////////////

    render () {
        const { handleSubmit, allValues, initialValues, baseUrl } = this.props
        return (
            <UserConnectorModalView
                id={initialValues.id}
                types={types}
                mailTypes={mailTypes}
                allValues={allValues}
                baseUrl={baseUrl}

                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onClickClose={this.onClickClose.bind(this)}

                jsonMapping={this.state.jsonMapping}
                onReadJson={this.onReadJson.bind(this)}

                existingVars={existingVars}
                selectedJsonRow={this.state.selectedJsonRow}
                onClickJsonRow={this.onClickJsonRow.bind(this)}
                onClickJsonRowUpdate={this.onClickJsonRowUpdate.bind(this)}
                onClickSetResult={this.onClickSetResult.bind(this)}
            />
        )
    }
}
export default connect(
    (state, props) => ({
        initialValues: {
            type: 'RocketChat',
            varExisting: newVarOption,
            json: '{\n' +
            '\t"temperature": 33.3\n' +
            '}',
            id: state.settings.editUserConnector ?
                state.settings.editUserConnector.id : props.uuid,

            ...state.settings.editUserConnector
        },
        allValues: getFormValues('userConnectorForm')(state)
    })
)(reduxForm({form: 'userConnectorForm'})(UserConnectorModal))

import React from 'react'
import {util} from '../WizardUtil.jsx'
import { Field } from 'redux-form'

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {config} = this.props

        return (
            <Field type="checkbox"
                   name={config.name}
                   component={this.renderField.bind(this)}
                   config={config}/>
        )
    }



    renderField(params) {

        const { input, type, config, meta: { touched, error } } = params
        let label

        var width = util.calcWidth(config.width);

        if(config.label != null) {
            label = this.props.buildLabel(config.label);
            width = util.calcWidth(config.width) - util.calcWidth(config.label.width);
        }

        // let defaultValue = config.checked == true
        //
        // if (config.name && values[config.name] != undefined)
        //     defaultValue = values[config.name] == "true" || values[config.name] == true

        const field = (
            <div className={"col-md-" + width}  style={util.convertStyle(config.style)}>
                <label className="control-label">
                    <input {...input} type={type}
                           className={config.cls}/>
                </label>

            </div>
        )

        return util.wrapInputs(label, field, config.useColumn)
    }
}

Checkbox.defaultProps = {
    config: {},
    values: {},
    buildLabel: null,
}
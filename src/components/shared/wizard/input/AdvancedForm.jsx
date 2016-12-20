import React from 'react'
import Modal from 'react-bootstrap-modal'
import { BasicForm, InputBase } from 'react-serial-forms';
import { assign } from 'lodash';

import {util} from '../WizardUtil.jsx'

export default class AdvancedForm extends InputBase {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            currentValue: null,
        }
    }

    getInitialValue() {
        return {}
    }



    // componentDidMount() {
    //     this.updateValue(this.refs.form.serialize() || {})
    // }
    //
    // componentDidUpdate() {
    //     if (!this.state.hasValue && !this.state.open)
    //         this.updateValue(this.refs.form.serialize() || {})
    // }

    render() {
        let config = this.props.config
        let label, input, modal

        var width = util.calcWidth(config.width);

        if(config.label != null) {
            label = this.props.buildLabel(config.label);
            width = util.calcWidth(config.width) - util.calcWidth(config.label.width);
        }

        let form = (
            <div>
                {this.buildContent()}
            </div>
        )

        if (this.state.open) {
            modal = (
                <Modal show={this.state.open}
                       onHide={this.onHide.bind(this)}
                       aria-labelledby="ModalHeader"
                       className="bootstrap-dialog type-primary modal-device-wizard-advanced">
                    <div className="modal-header">
                        <h4 className="modal-title bootstrap-dialog-title">
                            Advanced
                        </h4>
                    </div>
                    <div className="modal-body bootstrap-dialog-message padding-lg">
                        <BasicForm ref="form">
                            {form}
                        </BasicForm>

                        <div className="text-right mb-none">

                            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
                            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-left" onClick={this.onClickSave.bind(this)}>OK</a>
                        </div>
                    </div>
                </Modal>
            )
        }

        input = (
            <div className={"col-md-" + util.calcWidth(width)}
                 style={util.convertStyle(config.style)}>

                <a href="javascript:;" onClick={this.onClickAdvanced.bind(this)}>Advanced</a>

                {modal}
                {(!this.state.open && !this.state.currentValue) ? (
                    <div style={{display: "none"}}>
                        {form}
                    </div>
                ) : null}

            </div>
        )

        return util.wrapInputs(label, input, config['useColumn']);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buildContent() {
        let config = this.props.config

        let items= []

        let values = assign({}, this.props.values, this.state.currentValue || {})
        config.items.forEach(item => {
            let inputs = this.props.buildInput(item, values);
            items = items.concat(inputs)
        })

        return (
            <div>
                {items}
            </div>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickAdvanced() {
        this.setState({
            open: true
        })
    }

    onHide() {
        this.onClickClose()
    }

    onClickClose() {
        this.closeModal();
    }

    onClickSave() {
        this.closeModal();

        let currentValue = this.refs.form.serialize() || {}
        this.updateValue(currentValue)

        this.setState({currentValue})
    }

    closeModal(data) {
        this.setState({
            open: false
        }, () => {
            ////////////////////
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

AdvancedForm.defaultProps = {
    config: {},
    values: {},
    buildInput: null,

}
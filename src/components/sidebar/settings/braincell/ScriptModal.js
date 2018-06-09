import React from 'react'
import {Button, TextField} from '@material-ui/core'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'

export default class ScriptModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            script: props.script || ''
        }
    }

    onChange (e) {
        this.setState({
            script: e.target.value
        })
    }

    onClickOK () {
        const {onSave} = this.props
        onSave(this.state.script)
    }

    render() {
        const {onClose} = this.props
        return (
            <Modal title="Script" onRequestClose={onClose}>
                <CardPanel title="Script">
                    <TextField value={this.state.script} onChange={this.onChange.bind(this)} fullWidth multiline/>
                </CardPanel>

                <div className="margin-md-top">
                    <Button variant="raised" onClick={this.onClickOK.bind(this)}>OK</Button>
                </div>
            </Modal>
        )

    }
}

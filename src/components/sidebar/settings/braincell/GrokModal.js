import React from 'react'
import {Button, TextField} from '@material-ui/core'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'

export default class GrokModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text || ''
        }
    }

    onChange (e) {
        this.setState({
            text: e.target.value
        })
    }

    onClickOK () {
        const {onSave} = this.props
        onSave(this.state.text)
    }

    render() {
        const {onClose} = this.props
        return (
            <Modal title="Grok" onRequestClose={onClose}>
                <CardPanel title="Grok">
                    <TextField value={this.state.text} onChange={this.onChange.bind(this)} fullWidth multiline/>
                </CardPanel>

                <div className="margin-md-top">
                    <Button variant="raised" onClick={this.onClickOK.bind(this)}>OK</Button>
                </div>
            </Modal>
        )

    }
}

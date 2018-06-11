import React, {Component} from 'react'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'

export default class AuditDetailModal extends Component {
    onClickClose () {
        this.props.showAuditDetailModal(false)
    }

    render () {
        const {auditDetail} = this.props
        return(
            <Modal title="Message" onRequestClose={this.onClickClose.bind(this)}>
                <CardPanel title="Message">
                    <div style={{wordWrap: 'break-word'}}>
                        {auditDetail}
                    </div>
                </CardPanel>
            </Modal>
        )
    }
}

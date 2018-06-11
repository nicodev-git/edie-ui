import React, {Component} from 'react'
import moment from 'moment'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'

export default class FlowMessageModal extends Component {
    onClickClose () {
        this.props.showFlowMessageModal(false)
    }

    render () {
        const {flowMessage} = this.props
        return(
            <Modal title="Message" onRequestClose={this.onClickClose.bind(this)}>
                <CardPanel title="Message">
                    <div style={{wordWrap: 'break-word'}}>
                        <table className="table table-hover table-p-sm">
                            <thead>
                            <tr>
                                <th>Message</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {flowMessage.map((m, i) =>
                                <tr key={i}>
                                    <td>{m.message}</td>
                                    <td className="nowrap">{moment(m.time || m.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </CardPanel>
            </Modal>
        )
    }
}

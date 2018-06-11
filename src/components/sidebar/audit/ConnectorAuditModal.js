import React, {Component} from 'react'
import moment from 'moment'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'

import {channelIcons as icons} from 'shared/global'

export default class ConnectorAuditModal extends Component {
    onClickClose () {
        this.props.showConnectorAuditModal(false)
    }

    render () {
        const {connectorMessage} = this.props
        return(
            <Modal title="Message" onRequestClose={this.onClickClose.bind(this)} contentStyle={{width: 1200}}>
                <CardPanel title="Message">
                    <div style={{wordWrap: 'break-word'}}>
                        <table className="table table-hover table-p-sm">
                            <thead>
                            <tr>
                                <th>Time</th>
                                <th>App</th>
                                <th>Action</th>
                                <th>Channel</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {connectorMessage.map(p =>{
                                const component = p.component || 'srflow'
                                return (
                                    <tr key={p.id}>
                                        <td className="nowrap">{moment(p.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>
                                            {icons[component] ? <img src={`/images/${icons[component]}`} alt="" width={32}/> : component}
                                        </td>
                                        <td>{p.action}</td>
                                        <td>
                                            {icons[p.channel] ? <img src={`/images/${icons[p.channel]}`} alt="" width={32}/> : p.channel}
                                        </td>
                                        <td>{p.description}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </CardPanel>
            </Modal>
        )
    }
}

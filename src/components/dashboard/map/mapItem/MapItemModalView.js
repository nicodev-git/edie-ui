import React from 'react'
import {Field} from 'redux-form'

import {
    Modal,
    CardPanel,
    FormSelect,
    FormInput
} from 'components/modal/parts'
import {Button} from '@material-ui/core'

const mapItemTypes = [{
    label: 'Device', value: 'DEVICE'
}, {
    label: 'Monitor', value: 'MONITOR'
}, {
    label: 'Product', value: 'PRODUCT'
}]

export default class MapItemModalView extends React.Component {
    renderDeviceList() {
        const {devices, selIndex, onClickRow} = this.props
        return (
            <CardPanel title="Servers">
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {devices.map((device, i) =>
                            <tr key={device.id}
                                className={device.id === selIndex ? 'selected' : ''}
                                onClick={() => onClickRow(device.id)}
                            >
                                <td>{device.name}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </CardPanel>
        )
    }

    renderMonitors() {
        const {devices, selIndex, onClickRow} = this.props
        return (
            <CardPanel title="Monitors">
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Device</th>
                        </tr>
                        </thead>
                        <tbody>
                        {devices.map((device, i) => (device.monitors || []).map(monitor =>
                            <tr key={`${monitor.uid}`}
                                className={monitor.uid === selIndex ? 'selected' : ''}
                                onClick={() => onClickRow(monitor.uid)}
                            >
                                <td>{monitor.name}</td>
                                <td>{device.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardPanel>
        )
    }

    renderContent() {
        const {type} = this.props
        switch (type) {
            case 'DEVICE':
                return this.renderDeviceList()
            case 'MONITOR':
                return this.renderMonitors()

        }
    }


    render() {
        const {onSubmit, onClose, type} = this.props
        return (
            <Modal title="Map Item" onRequestClose={onClose}>
                <form onSubmit={onSubmit}>
                    {this.renderContent()}

                    <div className="padding-md">
                        <Button variant="raised" type="submit" className="margin-md-top">OK</Button>
                    </div>
                </form>
            </Modal>
        )
    }
}
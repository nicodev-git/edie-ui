import React from 'react'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'
import {Button} from '@material-ui/core'

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
                                onClick={() => onClickRow(monitor.uid, device)}
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

    // renderProductDevices (product) {
    //     const {devices} = this.props
    //     const deviceNames = devices.filter(device => (device.productIds || [])
    //         .includes(product.id)).map(p => p.name)
    //     return deviceNames.join(', ')
    // }

    getProductDevices (product) {
        const {devices} = this.props
        return devices.filter(device => (device.productIds || [])
            .includes(product.id))
    }

    renderProducts () {
        const {vendorProducts, onClickRow, selIndex} = this.props
        return (
            <CardPanel title="Products">
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Device</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            vendorProducts.map(p => {
                                const prodDevices = this.getProductDevices(p)
                                const deviceNames = prodDevices.map(p => p.name)
                                return (
                                    <tr key={p.id}
                                        className={p.id === selIndex ? 'selected' : ''}
                                        onClick={() => onClickRow(p.id, prodDevices[0])}
                                    >
                                        <td>{p.name}</td>
                                        <td>{deviceNames.join(', ')}</td>
                                    </tr>
                                )
                            })
                        }
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
            case 'PRODUCT':
                return this.renderProducts()
            default:
                return null
        }
    }


    render() {
        const {onSubmit, onClose} = this.props
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
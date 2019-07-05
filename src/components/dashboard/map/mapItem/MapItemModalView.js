import React from 'react'

import {
    Modal,
    CardPanel
} from 'components/modal/parts'
import {Button} from '@material-ui/core'
import AppletCard from 'components/common/AppletCard'
import { 
    extImageBaseUrl, 
    appletColors as colors,
    trimOSName
} from 'shared/Global'

export default class MapItemModalView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isClickedDevice: false,
            selectedDevice: null
        }
    }

    onClickDevice(device) {
        this.setState({selectedDevice: device, isClickedDevice: true});
    }

    renderDeviceList() {
        const {devices, selIndex} = this.props
        return (
            <CardPanel title="Devices">
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    {devices.map((device, index) => (
                        <AppletCard 
                            key={device.id}
                            selected={selIndex}
                            color={colors[index % colors.length]}
                            name={device.templateName || 'Unknown'}
                            desc={device.name}
                            desc2={<span>{trimOSName(device.osDetails)}<br/>{device.wanip || ''}</span>}
                            desc3={device.hostname || 'Unknown'}
                            onClick={() => this.onClickDevice(device)}
                            titleLimit={15}
                            img={`${extImageBaseUrl}${device.image}`}
                        />
                    ))}
                </div>
            </CardPanel>
        )
    }

    renderMonitors() {
        const {devices, selIndex, onClickRow} = this.props
        const { selectedDevice } = this.state
        return (
            <CardPanel title="Monitors" isBack={true} onBack={() => this.setState({isClickedDevice: false})}>
                <div style={{maxHeight: 300, overflow: 'auto'}}>
                    {devices
                        .filter(device => device.id === selectedDevice.id)
                        .map((device, i) => (device.monitors || []).map((monitor, index)=>
                        <AppletCard 
                            key={monitor.uid}
                            selected={selIndex}
                            color={colors[index % colors.length]}
                            name={monitor.name || 'Unknown'}
                            desc={monitor.name}
                            onClick={() => onClickRow(monitor.uid, device)}
                            titleLimit={15}
                            img={`${extImageBaseUrl}${device.image}`}
                            verified={true}
                        />
                    ))}
                </div>
            </CardPanel>
        )
    }

    getProductByDevice (product) {
        const {devices} = this.props        
        let device = devices.filter(device => device.id === this.state.selectedDevice.id)[0]
        return device.productIds && device.productIds.includes(product.id);
    }

    renderProducts () {
        const {vendorProducts, onClickRow, selIndex} = this.props
        const { selectedDevice } = this.state
        return (
            <CardPanel title="Products"  isBack={true} onBack={() => this.setState({isClickedDevice: false})}>
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
                                return this.getProductByDevice(p) && (
                                    <tr key={p.id}
                                        className={p.id === selIndex ? 'selected' : ''}
                                        onClick={() => onClickRow(p.id, selectedDevice )}
                                    >
                                        <td>{ p.name }</td>
                                        <td>{ selectedDevice.name }</td>
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
        if (!this.state.isClickedDevice) {
            return this.renderDeviceList()
        }

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
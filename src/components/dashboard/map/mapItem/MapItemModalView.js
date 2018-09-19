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
        const {devices} = this.props
        return (
            <CardPanel title="Servers">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {devices.map(device =>
                        <tr key={device.id}>
                            <td>{device.name}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </CardPanel>
        )
    }

    renderMonitors() {

    }

    renderContent() {
        const {type} = this.props
        switch (type) {
            case 'DEVICE':
                return this.renderDeviceList()

        }
    }


    render() {
        const {onSubmit, onClose, type} = this.props
        return (
            <Modal title="Map Item" onRequestClose={onClose}>
                <form onSubmit={onSubmit}>
                    {this.renderContent()}

                    <div className="padding-md">
                        <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
                    </div>
                </form>
            </Modal>
        )
    }
}
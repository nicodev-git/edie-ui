import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { assign } from 'lodash'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

import DeviceEditWizard from 'components/shared/wizard/DeviceEditWizard.jsx'
import { deviceTypeMap } from 'components/shared/wizard/WizardConfig.jsx'

import { updateMapDevice } from 'actions/index'

class Info extends React.Component {
    constructor(props) {
        super(props)

        const {location} = props
        const loc = location.state || {}

        this.state = {
            device: loc.device
        }
    }

    render() {
        const {device} = this.props

        return (
            <TabPage>
                <TabPageHeader title={device.name}>
                </TabPageHeader>
                <TabPageBody>
                    {this.renderContent()}
                </TabPageBody>
            </TabPage>
        )
    }

    renderContent() {

        const {device} = this.props

        let type = deviceTypeMap[device.type] || device.type || 'custom'
        let extraParams = {

        }

        // let values = $.extend(true, {}, device)
        // values['notes'] = values['devicenotes']

        return (
            <DeviceEditWizard
                deviceType={type}
                values={device}
                extraParams={extraParams}
                onFinish={this.onFinish.bind(this)}
            />
        )
    }

    onFinish(params) {
        const device = assign({}, this.props.device, params)
        this.props.updateMapDevice(device)
    }
}

Info.defaultProps = {
    
}


function mapStateToProps(state) {
    return {device: state.dashboard.selectedDevice}
}

export default withRouter(connect(mapStateToProps, {updateMapDevice})(Info))
// export default withRouter(Info)
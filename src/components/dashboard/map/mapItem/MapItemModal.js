import React from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {find} from 'lodash'

import MapItemModalView from './MapItemModalView'

class MapItemModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selIndex: null,
            selParent: null
        }
    }

    componentWillMount() {
        this.props.fetchDevices()
        this.props.fetchVendorProducts()
    }

    handleFormSubmit(values) {
        const {vendorProducts, editMapItem} = this.props
        const {type} = editMapItem
        const {selIndex, selParent} = this.state
        let item = null

        if (!selIndex) return

        const servers = this.getServers()

        switch (type) {
            case 'DEVICE':
                item = find(servers, {id: selIndex})
                break
            case 'MONITOR':
                servers.forEach(server => {
                    const found = find(server.monitors, {uid: selIndex})
                    if (found) item = found
                })
                break
            case 'PRODUCT':
                item = find(vendorProducts, {id: selIndex})
                break
            default:
                item = null
        }
        if (!item) return
        this.props.onSave({
            type,
            item,
            parent: selParent
        })
    }

    getServers() {
        return this.props.devices.filter(p => !!p.monitors)
    }

    onClickRow (selIndex, selParent) {
        this.setState({
            selIndex,
            selParent
        })
    }

    render() {
        const {handleSubmit, onClose, editMapItem, vendorProducts} = this.props
        return (
            <MapItemModalView
                selIndex={this.state.selIndex}
                onClickRow={this.onClickRow.bind(this)}

                vendorProducts={vendorProducts}

                type={editMapItem.type}
                devices={this.getServers()}
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                onClose={onClose}
            />
        )
    }
}

export default connect(
    (state, props) => ({
        initialValues: props.editMapItem
    })
)(reduxForm({form: 'mapItemForm'})(MapItemModal))
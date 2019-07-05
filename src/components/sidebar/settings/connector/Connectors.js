import React from 'react'
import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import SettingTabs from '../SettingTabs'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import ConnectorModal from './ConnectorModal'
import UserConnectorModal from './UserConnectorModal'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class Connectors extends React.Component {
    componentDidMount () {
        this.props.fetchCollectors()
    }
    onClickAdd () {
        this.props.showCollectorModal(true)
    }
    onClickEdit (item) {
        this.props.showCollectorModal(true, item)
    }
    onClickDelete (item) {
        if (!window.confirm('Click OK to delete.')) return
        this.props.removeCollector(item)
    }
    renderModal () {
        if (!this.props.collectorModalOpen) return null
        return (
            <ConnectorModal {...this.props}/>
        )
    }

    renderUserConnectorModal () {
        if (!this.props.userConnectorModalOpen) return null
        return (
            <UserConnectorModal {...this.props}/>
        )
    }

    renderContent () {
        const {collectors} = this.props
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mode</th>
                    <th>OS</th>
                    <th>Host</th>
                    <th>IP</th>
                    <th>Related</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {collectors.map(p =>
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.mode}</td>
                        <td>{p.ostype}</td>
                        <td>{p.host}</td>
                        <td>{p.ip}</td>
                        <td>{p.relatedIPs ? p.relatedIPs.join(', ') : ''}</td>
                        <td className="text-right padding-lg-right nowrap">
                            <EditIcon className="link margin-md-right" onClick={this.onClickEdit.bind(this, p)}/>
                            <DeleteIcon className="link margin-md-right" onClick={this.onClickDelete.bind(this, p)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
    renderOverlay () {
        if (!this.props.preloaderOpen) return null
        return (
            <RefreshOverlay />
        )
    }
    render () {
        return (
            <TabPage>
                <TabPageHeader title="Connectors">
                    <div className="text-center margin-md-top">
                        <div className="pull-right">
                            <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody tabs={SettingTabs} tab={1} history={this.props.history} location={this.props.location}>
                    {this.renderContent()}
                    {this.renderModal()}
                </TabPageBody>
                {this.renderOverlay()}
            </TabPage>
        )
    }
}

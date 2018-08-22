import React, {Component} from 'react'
import {getFormValues, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import uuid from 'uuid'

import ConnectorModalView from './ConnectorModalView'
import UserConnectorModal from './UserConnectorModal'

class ConnectorModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            entity: {},
            checkModalOpen: false,
            saving: false,
            relatedIPs: props.editCollector ? (props.editCollector.relatedIPs || []) : [],
            userConnectors: props.editCollector? (((props.editCollector.config || {}).userConnectors) || []) : [],
            newUuid: '',
            agents: props.editCollector ? (props.editCollector.agents || []) : []
        }
    }

    componentDidMount () {
        const {initialValues} = this.props
        if (initialValues) {
            const {host, ip} = initialValues
            this.props.change('addrType', host ? 'host' : 'ip')
            this.props.change('address', host || ip)
        }
    }

    componentDidUpdate (prevProps) {
        const {resolvedAddr, testConnectorStatus, testConnectorResult} = this.props
        if (!prevProps.resolvedAddr && resolvedAddr) {
            //Resolve addr finished
            this.props.showPreloader(false)

            if (resolvedAddr.ip) {
                const {entity} = this.state
                entity.ip = resolvedAddr.ip
                this.props.addCollector(entity)
                this.onHide()
            } else {
                this.setState({
                    checkModalOpen: true
                })
            }
        }

        if (prevProps.testConnectorStatus === 'testing' && !testConnectorStatus) {
            if (testConnectorResult.success) {
                if (!this.state.saving) window.alert('Successfully connected!')
            } else {
                window.alert(testConnectorResult.info)
            }

            this.setState({
                saving: false
            })
        }
    }

    handleFormSubmit (values) {
        const {editCollector} = this.props
        const {userConnectors, agents} = this.state
        if (!values.address) {
            window.alert('Please type address')
            return
        }
        if (!values.mode) {
            window.alert('Please choose mode')
            return
        }
        const entity = {
            ...editCollector,
            ...values,
            relatedIPs: this.state.relatedIPs,
            agents
        }
        entity.config = entity.config || {}
        entity.config.userConnectors = userConnectors

        if (values.addrType === 'host') {
            entity.host = values.address
        } else {
            entity.ip = values.address
        }

        // this.setState({
        //     saving: true
        // })
        if (editCollector) {
            this.props.updateCollector(entity)
        } else {
            this.props.addCollector(entity)

            // if (values.addrType === 'host') {
            //     this.setState({entity})
            //     this.props.showPreloader(true)
            //     this.props.resolveAddr(values.address)
            // } else {
            //     this.props.addCollector(entity)
            // }
        }
    }

    onHide () {
        this.props.showCollectorModal(false)
    }

    onAddIP () {
        const ip = window.prompt('Type IP')
        if (!ip) return
        const {relatedIPs} = this.state
        relatedIPs.push(ip)
        this.setState({relatedIPs})
    }
    onSaveIP (ip) {
        if (!ip) return
        const {relatedIPs} = this.state
        relatedIPs.push(ip)
        this.setState({relatedIPs})
    }
    onDeleteIP (index) {
        const {relatedIPs} = this.state
        relatedIPs.splice(index, 1)
        this.setState({relatedIPs})
    }

    onClickHostOK () {
        this.onClickHostClose()

        const {entity} = this.state
        this.props.addCollector(entity)
        this.onHide()
    }

    onClickHostClose () {
        this.setState({
            checkModalOpen: false
        })
    }

    /////////////////////////////////////////////////////////////

    onAddConfig () {
        this.setState({
            newUuid: uuid.v4()
        }, () => {
            this.props.showUserConnectorModal(true)
        })
    }

    onEditUserConnector (item) {
        this.props.showUserConnectorModal(true, item)
    }

    onSaveUserConnector (item) {
        const {userConnectors} = this.state
        if (this.props.editUserConnector) {
            this.setState({
                userConnectors: userConnectors.map(p => p.id === item.id ? item : p)
            })
        } else {
            this.setState({
                userConnectors: [...userConnectors, item]
            })
        }

    }

    onDeleteUserConnector (item) {
        if (!window.confirm('Click OK to remove')) return

        const {userConnectors} = this.state
        this.setState({
            userConnectors: userConnectors.filter(p => p.id !== item.id)
        })
    }

    getBaseUrl () {
        const {allValues} = this.props
        if (!allValues) return ''
        const port = allValues.port === 80 ? '' : `:${allValues.port}`
        return `http://${allValues.address}${port}`
    }

    /////////////////////////////////////////////////////////////

    onAddAgent () {
        this.props.showAgentModal(true)
    }

    onEditAgent (agent) {
        this.props.showAgentModal(true, agent)
    }

    onDeleteAgent (uuid) {
        const {agents} = this.state
        if (!window.confirm('Click OK to remove')) return
        this.setState({
            agents: agents.filter(p => p.uuid !== uuid)
        })
    }

    onSaveAgent (entity) {
        if (this.props.editAgent) {
            this.setState({
                agents: this.state.agents.map(p => p.uuid === entity.uuid ? entity : p)
            })
        } else {
            this.setState({
                agents: [...this.state.agents, entity]
            })
        }

    }

    onCloseAgentModal () {
        this.props.showAgentModal(false)
    }

    /////////////////////////////////////////////////////////////

    getRestUrl (p) {
        const baseUrl = this.getBaseUrl()
        if (p.type === 'Rest' || p.type === 'Gitlab') return `${baseUrl}/api/post`
        if (p.type === 'Jenkins') return `${baseUrl}/api/post?token=${p.id}`
        return p.url
    }

    /////////////////////////////////////////////////////////////

    renderUserConnectorModal () {
        if (!this.props.userConnectorModalOpen) return null
        return (
            <UserConnectorModal
                baseUrl={this.getBaseUrl()}
                uuid={this.state.newUuid}
                editUserConnector={this.props.editUserConnector}
                showUserConnectorModal={this.props.showUserConnectorModal}
                onSave={this.onSaveUserConnector.bind(this)}
            />
        )
    }

    renderModals () {
        return (
            <div>
                {this.renderUserConnectorModal()}
            </div>
        )
    }

    render () {
        const {handleSubmit} = this.props
        return (
            <ConnectorModalView
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                onClickClose={this.onHide.bind(this)}
                relatedIPs={this.state.relatedIPs}
                onAddIP={this.onAddIP.bind(this)}
                onSaveIP={this.onSaveIP.bind(this)}
                onDeleteIP={this.onDeleteIP.bind(this)}

                getRestUrl={this.getRestUrl.bind(this)}
                userConnectors={this.state.userConnectors}
                onAddConfig={this.onAddConfig.bind(this)}
                onEditUserConnector={this.onEditUserConnector.bind(this)}
                onDeleteUserConnector={this.onDeleteUserConnector.bind(this)}

                agents={this.state.agents}
                onAddAgent={this.onAddAgent.bind(this)}
                onEditAgent={this.onEditAgent.bind(this)}
                onDeleteAgent={this.onDeleteAgent.bind(this)}

                modals={this.renderModals()}
            />
        )
    }
}

export default connect(
    state => ({
        initialValues: state.settings.editCollector || {
            mode: 'COLLECTOR',
            addrType: 'ip',
            ostype: 'LINUX'
        },

        allValues: getFormValues('connectorForm')(state)
    })
)(reduxForm({form: 'connectorForm'})(ConnectorModal))

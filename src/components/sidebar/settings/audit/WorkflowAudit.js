import React from 'react'
import moment from 'moment'
import {IconButton, Select, MenuItem} from '@material-ui/core'
import NavIcon from '@material-ui/icons/Computer'
import MessageIcon from '@material-ui/icons/Message'
import ReactTooltip from 'react-tooltip'
import {debounce} from 'lodash'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import SimulationModal from './SimulationModal'
import AuditTabs from './AuditTabs'
import FlowMessageModal from './FlowMessageModal'
import ConnectorAuditModal from './ConnectorAuditModal'

const flexStyle = {
    overflow: 'auto',
    height: '100%'
}

export default class WorkflowAudit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '',
            workflow: null,
            msgs: [],
            filterMode: 'last'
        }
        this.buildTooltip = debounce(() => {
            ReactTooltip.rebuild()
        }, 500)
    }
    componentWillMount () {
        this.fetchFinished()
        this.props.fetchAuditByCloned()
    }

    fetchFinished () {
        this.props.fetchFinishedWfs(this.state.filterMode === 'last', this.getFilterMessageId())
    }

    onChangeWf (e, index, value) {
        this.setState({
            selected: value
        })
    }

    onClickFinished (finished) {
        this.setState({
            workflow: finished.dataObj.clonedFlow,
            msgs: finished.dataObj.clonedFlow.messages || []
        })
        this.props.fetchAuditByCloned(finished.dataObj.clonedFlow.id)
    }

    onClickSimul () {
        this.props.showSimulationModal(true)
    }

    getFilterMessageId () {
        const {id} = this.props.match.params || {}
        return id
    }

    ///////////////////////////////////////////////////////////////

    onClickWfMsg (messages) {
        this.props.showFlowMessageModal(true, messages)
    }

    onClickConnector (audit) {
        const filtered = this.props.audit.filter(p => p.messageUniqueId === audit.extra1)
        this.props.showConnectorAuditModal(true, filtered)
    }

    ///////////////////////////////////////////////////////////////

    onChangeFilter (e) {
        this.setState({filterMode: e.target.value}, () => {
            this.fetchFinished()
        })
    }

    ///////////////////////////////////////////////////////////////

    renderFinishedWfTable () {
        const {finishedWfs} = this.props

        this.buildTooltip()

        return (
            <table className="table table-hover table-p-sm">
                <thead>
                <tr>
                    <th>Workflow</th>
                    <th>Last Run</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {finishedWfs.map(p =>
                    <tr key={p.id} className="link" onClick={this.onClickFinished.bind(this, p)}>
                        <td>{p.dataObj.clonedFlow.name}</td>
                        <td className="nowrap">{moment(p.dataObj.finishedTime).fromNow()}</td>
                        <td className="nowrap">
                            <MessageIcon className="link" onClick={this.onClickWfMsg.bind(this, p.dataObj.clonedFlow.messages)}/>
                            <img src="/images/userid.png" className="link" width="24" height="24"
                                 data-tip={`Id: ${p.dataObj.clonedFlow.uuid} UserConnectorId: ${p.dataObj.clonedFlow.userConnectorId}`} alt=""/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }

    renderWorkflows () {
        // const {workflow} = this.state
        let {audit} = this.props

        // if (workflow) {
        //     audit = audit.filter(p => p.clonedFlowId === workflow.id)
        // } else {
        //     audit = []
        // }

        return (
            <div className="flex-1 flex-horizontal"style={flexStyle}>
                <div className="flex-1">
                    &nbsp;
                </div>
                <div className="bg-white" style={{overflow: 'auto'}}>
                    {this.renderFinishedWfTable()}
                </div>
                <div className="margin-md-left bg-white" style={{overflow: 'auto', wordBreak: 'break-all', minWidth: '50%'}}>
                    <table className="table table-hover table-p-sm">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workflow</th>
                            <th>Shape</th>
                            <th>Description</th>
                            <th>Step</th>
                            <th>ItemStep</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {audit.map(m =>
                            <tr key={m.id}>
                                <td className="nowrap">{moment(m.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</td>
                                <td>{m.workflowName}</td>
                                <td>{m.shape}</td>
                                <td>{m.description}</td>
                                <td>{m.step}</td>
                                <td>{m.itemStep}</td>
                                <td>
                                    {m.extra1 && <img src="/images/connector.png" className="link" width="24" height="24" onClick={this.onClickConnector.bind(this, m)} alt=""/>}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex-1">
                    &nbsp;
                </div>
            </div>
        )
    }

    renderSimulationModal () {
        if (!this.props.simulationModalOpen) return null
        return (
            <SimulationModal {...this.props}/>
        )
    }

    renderToolbar () {
        return (
            <div>
                <div className="pull-left">
                    <Select value={this.state.filterMode} onChange={this.onChangeFilter.bind(this)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="last">Last Run</MenuItem>
                    </Select>
                </div>
                <div className="pull-right">
                    <IconButton onClick={this.onClickSimul.bind(this)}>
                        <NavIcon />
                    </IconButton>
                </div>
            </div>
        )
    }

    renderMessageModal () {
        if (!this.props.flowMessageModalOpen) return null
        return (
            <FlowMessageModal {...this.props}/>
        )
    }

    renderConnectorAuditModal () {
        if (!this.props.connectorAuditModalOpen) return null
        return (
            <ConnectorAuditModal {...this.props}/>
        )
    }

    render () {
        return (
            <TabPage>
                <TabPageHeader title="Audit">
                    {this.renderToolbar()}
                </TabPageHeader>

                <TabPageBody tabs={AuditTabs} tab={1} history={this.props.history} location={this.props.location} transparent >
                    {this.renderWorkflows()}
                    {this.renderSimulationModal()}
                    {this.renderMessageModal()}
                    {this.renderConnectorAuditModal()}
                </TabPageBody>
                <ReactTooltip />
            </TabPage>
        )
    }
}

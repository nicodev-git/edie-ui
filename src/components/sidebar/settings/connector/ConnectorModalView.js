import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Button, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Create'

import {
    FormInput,
    FormSelect,
    Modal,
    CardPanel
} from 'components/modal/parts'

const osTypes = [{
    label: 'Windows', value: 'WINDOWS'
}, {
    label: 'Linux', value: 'LINUX'
}]

const addressTypes = [{
    label: 'Host', value: 'host'
}, {
    label: 'IP', value: 'ip'
}]

const modeOptions = [{
    label: 'Collector', value: 'COLLECTOR',
}, {
    label: 'Agent', value: 'AGENT'
}]

export default class ConnectorModalView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          newIp: '',
          addedIp: []
        }
    }

    handleChange = key => event => {
        this.setState({
          [key]: event.target.value
        })
    }

    onNewIpAdd = () => (event) => {
        event.preventDefault()
    
        // this.props.onSave({
        //   name: this.state.newAction,
        //   id: uuid()
        // })
    
        // this.setState({
        //   newAction: ''
        // })
    }

    onClickAddEmptyField = key => event => {
        this.setState({
          [key]: [1]
        })
    }

    onAddField = key => event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          if (key === 'ip') {
            if (this.state.newIp.trim()) {
              this.props.onSaveIP(this.state.newIp)
            }
            
            this.setState({
              newIp: '',
              addedIp: []
            })
          } else {
            // if (this.state.newAgent.trim()) {
              
            //   this.props.onSaveGrokField(this.state.newGrok.trim())
            //   this.setState({
            //     newGrok: '',
            //     addedGrok: []
            //   })
            // }
          }
        }
      }
    render () {
        const {
            onSubmit, 
            onClickClose, 
            relatedIPs,
            onDeleteIP,
            onAddConfig,
            modals,
            userConnectors,
            onEditUserConnector,
            onDeleteUserConnector,
            agents,
            onAddAgent,
            onEditAgent,
            onDeleteAgent,
            getRestUrl
        } = this.props
        return (
            <Modal title="Connector" onRequestClose={onClickClose} contentStyle={{width: 1200, maxWidth: 'initial1'}}>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-12">

                            <CardPanel title="Connector">
                                <div className="row margin-md-bottom">
                                    <div className="col-md-3">
                                        <Field name="name" component={FormInput} floatingLabel="Name" fullWidth/>
                                    </div>
                                    <div className="col-md-3">
                                        <Field name="desc" component={FormInput} floatingLabel="Description" fullWidth/>
                                    </div>

                                    <div className="col-md-3">
                                        <Field 
                                            name="ostype" 
                                            component={FormSelect} 
                                            floatingLabel="OS" 
                                            options={osTypes}
                                            className="valign-bottom" 
                                            fullWidth/>
                                    </div>
                                    <div className="col-md-3">
                                        <Field 
                                            name="mode" 
                                            component={FormSelect} 
                                            options={modeOptions}
                                            floatingLabel="Mode"
                                            className="valign-bottom"
                                            fullWidth/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3 valign-bottom">
                                        <Field name="addrType" component={FormSelect} options={addressTypes}
                                               floatingLabel="Address Type" className="valign-bottom" fullWidth/>
                                    </div>
                                    <div className="col-md-3 valign-bottom">
                                        <Field name="address" component={FormInput} className="valign-bottom"
                                               floatingLabel="Address" fullWidth/>
                                    </div>
                                    <div className="col-md-3 valign-bottom">
                                        <Field name="port" component={FormInput} className="valign-bottom"
                                               floatingLabel="Port" fullWidth/>
                                    </div>
                                </div>
                            </CardPanel>
                        </div>

                        <div className="col-md-6">

                            <CardPanel title="IP List" tools={<AddIcon onClick={this.onClickAddEmptyField('addedIp')} className="link"/>}>
                                <div style={{height: 180, overflow: 'auto'}}>
                                    <table className="table mb-none">
                                        <tbody>
                                        {relatedIPs.map((ip,i) =>
                                            <tr key={i}>
                                                <td>{ip}</td>
                                                <td>
                                                    <DeleteIcon onClick={() => onDeleteIP(i)} className="link"/>
                                                </td>
                                            </tr>
                                        )}
                                        {this.state.addedIp.map((p, i) =>
                                            <tr key={i}>
                                                <td>
                                                    <TextField
                                                        autoFocus
                                                        fullWidth
                                                        value={this.state.newIp} 
                                                        onChange={this.handleChange('newIp')}
                                                        onKeyPress={this.onAddField('ip')}
                                                        label="Name"/>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardPanel>

                        </div>

                        <div className="col-md-6">
                            <CardPanel title="Agents" tools={<AddIcon onClick={onAddAgent} className="link"/>}>
                                <div style={{height: 180, width: '100%', overflow: 'auto'}}>
                                    <table className="table mb-none">
                                        <tbody>
                                        {agents.map(agent =>
                                            <tr key={agent.uuid}>
                                                <td>{agent.uuid}</td>
                                                <td>{agent.name}</td>
                                                <td>{agent.ip}</td>
                                                <td>
                                                    <EditIcon onClick={() => onEditAgent(agent)} className="link"/>
                                                    <DeleteIcon onClick={() => onDeleteAgent(agent.uuid)} className="link"/>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardPanel>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <CardPanel title="Connectors" tools={<AddIcon onClick={onAddConfig}/>}>
                                <div style={{overflow: 'auto', width: '100%'}}>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Token</th>
                                        <th>Url</th>
                                        <th>ExternalToken</th>
                                        <th>User</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userConnectors.map(p =>
                                        <tr key={p.id}>
                                            <td>{p.type}</td>
                                            <td>{p.id}</td>
                                            <td>{getRestUrl(p)}</td>
                                            <td>{p.token}</td>
                                            <td>{p.userName}</td>
                                            <td className="nowrap">
                                                <EditIcon onClick={() => onEditUserConnector(p)} className="link"/>
                                                <DeleteIcon onClick={() => onDeleteUserConnector(p)} className="link"/>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                                </div>
                            </CardPanel>

                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>

                    <div className="margin-md-top">
                        <Button variant="raised" type="submit">Save</Button>
                    </div>
                </form>
                <div>
                    {modals}
                </div>
            </Modal>
        )
    }
}

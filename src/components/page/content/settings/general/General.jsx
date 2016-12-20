import React from 'react'
import InlineEdit from 'react-edit-inline'
import {
    ButtonGroup,
    Button,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { assign } from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

import { fetchEnvVars, addEnvVar, updateEnvVar } from 'actions/index'

class General extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            sysName: '',
            traffic: false,
            dmz: false,
            dmzIP: '127.0.0.1',
            pause: false,

            logEnabled: false,
            logBatch: '',
            sendMobile: false,
            mobileIP: '',
        }
    }

    componentWillMount() {
        this.props.fetchEnvVars()
    }

    render() {
        return (
            <TabPage>
                <TabPageHeader title="Settings">
                    <div className="text-center margin-md-top">
                        <div style={{position:"absolute", right:"25px"}}>
                            <ButtonGroup>

                                <Button>System Backup</Button>

                                <Button>System Restore</Button>

                            </ButtonGroup>
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody tabs={SettingTabs} tab={0}>
                    {this.renderContent()}
                </TabPageBody>
            </TabPage>
        )
    }

    renderContent() {
        return (
            <div className="padding-md-top form-inline">
                <div className="col-md-12 margin-md-bottom">
                    <label className="margin-sm-top margin-sm-bottom" style={{width: "150px"}}>System Name:</label>
                    <InlineEdit
                        text={this.getOptionValue('SYSTEM_NAME') || '[Empty]'}
                        paramName="message"
                        change={this.onChangeSysName.bind(this)}
                        className="inline"
                        minLength={0}
                    />
                </div>

                <div className="col-md-12 margin-md-bottom">
                    <div className="checkbox">
                        <label style={{width: "150px"}} className="margin-sm-top margin-sm-bottom">
                            <input type="checkbox" className="margin-xs-right" ref="dmz"
                                   checked={this.getOptionValue('DMZ') == 'true'}
                                   onChange={this.onChangeDmz.bind(this)}/>
                            Enable DMZ
                        </label>
                    </div>

                    <label className="margin-md-left hidden">DMZ IP Address:</label>
                    <InlineEdit
                        text={this.getOptionValue('DMZ', 'value2')}
                        paramName="message"
                        change={this.onChangeDmzIP.bind(this)}
                        className="inline"
                        ref="dmzIp"
                    />
                </div>
                <div className="col-md-12 margin-md-bottom">
                    <div className="checkbox">
                        <label className="margin-sm-top margin-sm-bottom">
                            <input type="checkbox" className="margin-xs-right"
                                   checked={this.getOptionValue('PAUSE') == 'true'} onChange={this.onChangePause.bind(this)}/>
                            Pause System
                        </label>
                    </div>
                </div>
                <div className="col-md-12 margin-md-bottom">
                    <div className="checkbox">
                        <label className="margin-sm-top margin-sm-bottom">
                            <input type="checkbox" className="margin-xs-right"
                                   checked={this.getOptionValue('NETWORK_TRAFFIC') == 'true'} onChange={this.onChangeTraffic.bind(this)}/>
                            Display Network Traffic
                        </label>
                    </div>
                </div>
                <div className="col-md-12 margin-md-bottom">
                    <div className="checkbox">
                        <label style={{width: "150px"}} className="margin-sm-top margin-sm-bottom">
                            <input type="checkbox" className="margin-xs-right"
                                   checked={this.getOptionValue('REMOTE_LOG_ENABLED') == 'true'} onChange={this.onChangeLogEnabled.bind(this)}/>
                            Send Error Logs With
                        </label>

                        <label className="margin-md-left hidden">Error Logs Batch:</label>
                        <InlineEdit
                            text={this.getOptionValue('REMOTE_LOG_BATCH') || '[Empty]'}
                            paramName="message"
                            change={this.onChangeLogBatch.bind(this)}
                            className="inline"
                        />
                    </div>
                </div>

                <div className="col-md-12 margin-md-bottom">
                    <div className="checkbox">
                        <label style={{width: "150px"}} className="margin-sm-top margin-sm-bottom">
                            <input type="checkbox" className="margin-xs-right"
                                   checked={!!this.getOptionValue('IMMOBILE')} onChange={this.onChangeSendMobile.bind(this)}/>
                            Send to mobile
                        </label>
                        <InlineEdit
                            text={this.getOptionValue('IMMOBILE')}
                            paramName="message"
                            change={this.onChangeMobileIP.bind(this)}
                            className="inline"
                            ref="mobileIp"
                            minLength={0}
                        />
                    </div>
                </div>
            </div>
        )
    }

    /////////////////////////////////////////////

    getOption(key) {
        const list = (this.props.envVars || []).filter(u => u.envvars && u.envvars.key == key)
        if (list.length) return list[0]
        return null
    }

    getOptionValue(key, value = 'value1') {
        const option = this.getOption(key)
        if (!option) return ''
        return option.envvars[value]
    }

    /////////////////////////////////////////////

    onChangeSysName(value) {
        this.updateOption('SYSTEM_NAME', value.message)
    }

    /////////////////////////////////////////////

    onChangeDmz(e) {
        let {checked} = e.target
        this.updateOption('DMZ', '' + checked, this.refs.dmzIp.state.text || '127.0.0.1')
    }

    onChangeDmzIP(value) {
        const checked = !!value.message
        this.updateOption('DMZ', '' + checked, value.message)
    }

    /////////////////////////////////////////////

    onChangePause(e) {
        let {checked} = e.target
        this.updateOption('PAUSE', '' + checked)
    }

    /////////////////////////////////////////////

    onChangeTraffic(e) {
        let {checked} = e.target
        this.updateOption('NETWORK_TRAFFIC', '' + checked)
    }

    /////////////////////////////////////////////

    onChangeLogEnabled(e) {
        let {checked} = e.target
        this.updateOption('REMOTE_LOG_ENABLED', '' + checked)
    }

    onChangeLogBatch(value) {
        this.updateOption('REMOTE_LOG_BATCH', value.message)
    }

    /////////////////////////////////////////////

    onChangeSendMobile(e) {
        let {checked} = e.target
        this.updateOption('IMMOBILE', checked ? (this.refs.mobileIp.state.text || '127.0.0.1') : '')
    }

    onChangeMobileIP(value) {
        this.updateOption('IMMOBILE', value.message)
    }

    /////////////////////////////////////////////

    updateOption(name, value1, value2 = '') {
        if (!name) return false

        let option = this.getOption(name)
        if (!option) {
            option = {
                envvars: {
                    "key" : name,
                    "value1" : value1,
                    "value2" : value2
                }
            }

            this.props.addEnvVar(option)
        } else {
            assign(option.envvars, { value1, value2 })

            this.props.updateEnvVar(option)
        }
    }
}

General.defaultProps = {}

function mapStateToProps(state) {
    return {
        envVars: state.settings.envVars,
    }
}

const actions = {
    fetchEnvVars,
    addEnvVar, updateEnvVar
}

export default connect(mapStateToProps, actions)(General)
import React from 'react'
import InlineEdit from 'react-edit-inline'
import {Checkbox, RaisedButton} from 'material-ui'
import { assign } from 'lodash'

import SettingTabs from '../SettingTabs' // Never used
import TabPage from 'components/common/TabPage' // Never used
import TabPageBody from 'components/common/TabPageBody' // Never used
import TabPageHeader from 'components/common/TabPageHeader' // Never used

import {defaultDateFormat} from 'shared/Global'

const rowStyle = {
  float: 'left',
  width: '100%',
  height: 30
}
export default class General extends React.Component {
  constructor (props) {
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

      customerId: ''
    }
  }

  componentWillMount () {
    this.props.fetchEnvVars()
  }

  renderContent () {
    return (
      <div className="padding-md form-inline">
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <label className="margin-sm-top margin-sm-bottom width-200">System Name:</label>
          <InlineEdit
            text={this.getOptionValue('SYSTEM_NAME') || '[Empty]'}
            paramName="message"
            change={this.onChangeSysName.bind(this)}
            className="inline-block"
            minLength={0}
          />
        </div>

        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Enable DMZ"
              checked={this.getOptionValue('DMZ') === 'true'}
              onCheck={this.onChangeDmz.bind(this)}/>
          </div>
          <InlineEdit
            text={this.getOptionValue('DMZ', 'value2')}
            paramName="message"
            change={this.onChangeDmzIP.bind(this)}
            className="pull-left margin-xs-top"
            ref="dmzIp"
          />
        </div>
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Pause System"
              checked={this.getOptionValue('PAUSE') === 'true'}
              onCheck={this.onChangePause.bind(this)}/>
          </div>
        </div>
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Display Network Traffic"
              checked={this.getOptionValue('NETWORK_TRAFFIC') === 'true'}
              onCheck={this.onChangeTraffic.bind(this)}/>
          </div>
        </div>
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Send Error Logs With"
              checked={this.getOptionValue('REMOTE_LOG_ENABLED') === 'true'}
              onCheck={this.onChangeLogEnabled.bind(this)}/>
          </div>
          <InlineEdit
            text={this.getOptionValue('REMOTE_LOG_BATCH') || '[Empty]'}
            paramName="message"
            change={this.onChangeLogBatch.bind(this)}
            className="pull-left margin-xs-top"
          />
        </div>

        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Send to mobile"
              checked={this.getOptionValue('IMMOBILE') === 'true'}
              onCheck={this.onChangeSendMobile.bind(this)}/>
          </div>

          <InlineEdit
            text={this.getOptionValue('IMMOBILE')}
            paramName="message"
            change={this.onChangeMobileIP.bind(this)}
            className="pull-left margin-xs-top"
            ref="mobileIp"
            minLength={0}
          />
        </div>

        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Show absolute date"
              checked={this.getUserOptionValue('useAbsoluteDate', false)}
              onCheck={this.onChangeAbsDate.bind(this)}/>
          </div>
          <InlineEdit
            text={this.getUserOptionValue('dateFormat', defaultDateFormat)}
            paramName="dateFormat"
            change={this.onChangeDateFormat.bind(this)}
            className="pull-left margin-xs-top"
            ref="dateFormat"
            minLength={0}
          />

        </div>

        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-200">
            <Checkbox
              label="Keep Incident Alert"
              checked={!!this.getUserOptionValue('keepIncidentAlert', false)}
              onCheck={this.onChangeKeepIncidentAlert.bind(this)}/>
          </div>
        </div>

        <div style={{...rowStyle, color: '#888'}} className="margin-lg-top">
          <label className="margin-sm-top margin-sm-bottom">
            Customer ID: {this.getOptionValue('CUSTOMER_ID') || '[None]'}
          </label>
        </div>
      </div>
    )
  }

  renderCustomerIdEdit () {
    return (
      <InlineEdit
        text={this.getOptionValue('CUSTOMER_ID') || '[None]'}
        paramName="message"
        change={this.onChangeCustomerId.bind(this)}
        className="inline-block"
        ref="mobileIp"
        minLength={0}
      />
    )
  }

  getOption (key) {
    const list = (this.props.envVars || []).filter(u => u.envvars && u.envvars.key === key)
    if (list.length) return list[0]
    return null
  }

  getOptionValue (key, value = 'value1') {
    const option = this.getOption(key)
    if (!option) return ''
    return option.envvars[value]
  }

  getUserOptionValue (key, defVal) {
    const {userInfo} = this.props
    if (!userInfo) return defVal
    return userInfo[key] || defVal
  }

  onChangeSysName (value) {
    this.updateOption('SYSTEM_NAME', value.message)
  }

  onChangeDmz (e) {
    let {checked} = e.target
    this.updateOption('DMZ', `${checked}`, this.refs.dmzIp.state.text || '127.0.0.1')
  }

  onChangeDmzIP (value) {
    const checked = !!value.message
    this.updateOption('DMZ', `${checked}`, value.message)
  }

  onChangePause (e) {
    let {checked} = e.target
    this.updateOption('PAUSE', `${checked}`)
  }

  onChangeTraffic (e) {
    let {checked} = e.target
    this.updateOption('NETWORK_TRAFFIC', `${checked}`)
  }

  onChangeLogEnabled (e) {
    let {checked} = e.target
    this.updateOption('REMOTE_LOG_ENABLED', `${checked}`)
  }

  onChangeLogBatch (value) {
    this.updateOption('REMOTE_LOG_BATCH', value.message)
  }

  onChangeSendMobile (e) {
    let {checked} = e.target
    this.updateOption('IMMOBILE', checked ? (this.refs.mobileIp.state.text || '127.0.0.1') : '')
  }

  onChangeMobileIP (value) {
    this.updateOption('IMMOBILE', value.message)
  }

  onChangeCustomerId (value) {
    this.updateOption('CUSTOMER_ID', value.message)
  }

  onChangeAbsDate (e) {
    this.updateUserOption('useAbsoluteDate', e.target.checked)
  }

  onChangeDateFormat (value) {
    this.updateUserOption('dateFormat', value.dateFormat)
  }

  onChangeKeepIncidentAlert (e) {
    this.updateUserOption('keepIncidentAlert', e.target.checked)
  }

  updateUserOption (key, value) {
    if (!key) return
    this.props.updateUserOption(this.props.userInfo, key, value)
  }

  updateOption (name, value1, value2 = '') {
    if (!name) return false

    let option = this.getOption(name)
    if (!option) {
      option = {
        envvars: {
          'key': name,
          'value1': value1,
          'value2': value2
        }
      }

      this.props.addEnvVar(option)
    } else {
      assign(option.envvars, { value1, value2 })

      this.props.updateEnvVar(option)
    }
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <RaisedButton label="System Backup"/>
              <RaisedButton label="System Restore" className="margin-md-left"/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={0} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}

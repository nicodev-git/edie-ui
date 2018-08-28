import React from 'react'
import moment from 'moment'
import InlineEdit from 'components/common/ReactEditInline'
import {Checkbox, Button, Select, MenuItem} from '@material-ui/core'
import { assign } from 'lodash'
import { FormControlLabel } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import SettingTabs from '../SettingTabs' // Never used
import TabPage from 'components/common/TabPage' // Never used
import TabPageBody from 'components/common/TabPageBody' // Never used
import TabPageHeader from 'components/common/TabPageHeader' // Never used

import {defaultDateFormat} from 'shared/Global'
import {CardPanel} from 'components/modal/parts'
import {rolePermissions, hasPermission} from 'shared/Permission'
import Advanced from './advanced/Advanced'

const rowStyle = {
  width: '100%',
  height: 50
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

      removeEvents: "",

      customerId: ''
    }
  }

  componentWillMount () {
    this.props.fetchEnvVars()
    this.props.fetchRoles()
  }

  onClickSync () {
    this.props.syncData(false)
  }

  onClickEddieSync () {
    this.props.eddieSync()
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

  onChangeRemoveEvents (value) {
    this.updateOption('UNDEFINED_EVENTS_RETENTION_DAYS', value.message)
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

  onChangeShowPage (e) {
    this.updateUserOption('defaultPage', e.target.value)
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

  onCheckDashboardMenu (role, roleMenuId, e, checked) {
    let selected = [...role.permissions]
    if (checked) {
      selected.push(roleMenuId)
    } else {
      selected = selected.filter(p => p !== roleMenuId)
    }
    this.props.updateRole({
      ...role,
      permissions: selected
    })
  }

  /////////////////////////////////////////////////////////////////

  renderContent (canEdit) {
    return (
      <CardPanel title="General">
        <div className="form-inline relative" style={{minHeight: 400}}>
          <div style={rowStyle} >
            <label className="margin-sm-top margin-sm-bottom width-200">System Name: </label>
            <InlineEdit
              text={this.getOptionValue('SYSTEM_NAME') || '[Empty]'}
              paramName="message"
              change={this.onChangeSysName.bind(this)}
              className="inline-block"
              minLength={0}
            />
          </div>

          <div style={rowStyle} >
            <div className="inline-block width-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getOptionValue('DMZ') === 'true'}
                    onChange={this.onChangeDmz.bind(this)}/>
                }
                label="Enable DMZ"
              />
            </div>
            <InlineEdit
              text={this.getOptionValue('DMZ', 'value2')}
              paramName="message"
              change={this.onChangeDmzIP.bind(this)}
              className="inline-block margin-xs-top"
              ref="dmzIp"
            />
          </div>
          <div style={rowStyle} >
            <div className="inline-block width-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getOptionValue('PAUSE') === 'true'}
                    onChange={this.onChangePause.bind(this)}/>
                }
                label="Pause System"
              />
            </div>
          </div>
          <div style={rowStyle} >
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getOptionValue('NETWORK_TRAFFIC') === 'true'}
                    onChange={this.onChangeTraffic.bind(this)}/>
                }
                label="Display Network Traffic"
              />
            </div>
          </div>
          <div style={rowStyle} >
            <div className="width-200 pull-left">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getOptionValue('REMOTE_LOG_ENABLED') === 'true'}
                    onChange={this.onChangeLogEnabled.bind(this)}/>
                }
                label="Send Error Logs With"
              />
            </div>
            <InlineEdit
              text={this.getOptionValue('REMOTE_LOG_BATCH') || '[Empty]'}
              paramName="message"
              change={this.onChangeLogBatch.bind(this)}
              className="pull-left margin-md-top"
            />
          </div>

          <div style={rowStyle} >
            <div className="inline-block width-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getOptionValue('IMMOBILE') === 'true'}
                    onChange={this.onChangeSendMobile.bind(this)}/>
                }
                label="Send to mobile"
              />
            </div>

            <InlineEdit
              text={this.getOptionValue('IMMOBILE')}
              paramName="message"
              change={this.onChangeMobileIP.bind(this)}
              className="inline-block margin-md-top"
              ref="mobileIp"
              minLength={0}
            />
          </div>

          <div style={rowStyle} >
            <div className="pull-left width-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.getUserOptionValue('useAbsoluteDate', false)}
                    onChange={this.onChangeAbsDate.bind(this)}/>
                }
                label="Show absolute date"
              />
            </div>
            <InlineEdit
              text={this.getUserOptionValue('dateFormat', defaultDateFormat)}
              paramName="dateFormat"
              change={this.onChangeDateFormat.bind(this)}
              className="pull-left margin-md-top"
              ref="dateFormat"
              minLength={0}
            />

          </div>

          <div style={rowStyle} >
            <div className="inline-block width-200">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!this.getUserOptionValue('keepIncidentAlert', false)}
                    onChange={this.onChangeKeepIncidentAlert.bind(this)}/>
                }
                label="Keep Incident Alert"
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div className="inline-block width-200">
              <FormControlLabel
                control={
                  <Select
                    value={this.getUserOptionValue('defaultPage', 'dashboard')}
                    onChange={this.onChangeShowPage.bind(this)}>
                    <MenuItem value="main">Map</MenuItem>
                    <MenuItem value="dashboard">Dashboard</MenuItem>
                  </Select>
                }
                label="Time Zone"
              />
            </div>
          </div>

          <div style={rowStyle}>
            <label className="margin-sm-top margin-sm-bottom width-200">Remove Undefined Events After: </label>
            <InlineEdit
              text={this.getOptionValue('UNDEFINED_EVENTS_RETENTION_DAYS') || 'Days'}
              paramName="message"
              change={this.onChangeRemoveEvents.bind(this)}
              className="inline-block"
              minLength={0}
            />
            <label className="margin-sm-top margin-sm-bottom width-200">  Days</label>
          </div>

          {!canEdit && <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 5}}/>}
        </div>

        {this.renderSyncEddie()}
      </CardPanel>
    )
  }

  renderSyncEddie () {
    return (
      <div>
        <Button variant="raised" onClick={this.onClickEddieSync.bind(this)}>Eddie Sync</Button>
      </div>
    )
  }

  renderCustomer () {
    const lastSync = this.getOptionValue('LAST_WORKFLOW_TIME')
    return (
      <div style={{color: '#888'}} className="margin-lg-top">
        <label className="margin-sm-top margin-sm-bottom">
          Customer ID: {this.getOptionValue('CUSTOMER_ID') || '[None]'}&nbsp;&nbsp;&nbsp;&nbsp;
          Last Synced: {lastSync ? moment(parseInt(lastSync, 10)).fromNow() : 'Never'}
        </label>
        <br/>
        <Button variant="raised" onClick={this.onClickSync.bind(this)}>Sync</Button>
      </div>
    )
  }

  renderRoles () {
    const {roles} = this.props
    return (
      <table className="table">
        <thead>
        <tr>
          <th></th>
          {roles.map(p =>
            <th key={p.id}>{p.name}</th>
          )}
        </tr>
        </thead>
        <tbody>
        {rolePermissions.map(p =>
          <tr key={p}>
            <td>
              {p}
            </td>
            {roles.map(r =>
              <td key={r.id}>
                <Checkbox
                  checked={r.permissions.includes(p)}
                  onChange={this.onCheckDashboardMenu.bind(this, r, p)}
                />
              </td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    )
  }

  renderMenuConfig (canEdit) {
    return (
      <CardPanel title="Menu">
        <div style={{minHeight: 485, overflow: 'auto'}}>
          <div>
            <FormControl>
              <InputLabel>Default Page</InputLabel>
              <Select
                value={this.getUserOptionValue('defaultPage', 'dashboard')}
                onChange={this.onChangeShowPage.bind(this)}>
                <MenuItem value="main">Map</MenuItem>
                <MenuItem value="dashboard">Dashboard</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/*{this.renderRoles()}*/}
        </div>

        {!canEdit && <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 5}}/>}
      </CardPanel>
    )
  }

  renderAdvanced () {
    return (
      <CardPanel title="Advanced">
        <div style={{minHeight: 485, overflow: 'auto'}}>
          <Advanced {...this.props}/>
        </div>
      </CardPanel>
    )
  }

  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <Button variant="raised">System Backup</Button>
              <Button variant="raised" className="margin-md-left">System Restore</Button>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={0} history={this.props.history} location={this.props.location} transparent>
          <div>
            <div className="col-md-6">
              {this.renderContent(canEdit)}
              {this.renderCustomer()}
            </div>
            <div className="col-md-6">
              {this.renderAdvanced()}
            </div>
          </div>
          <br/>&nbsp;
          <br/>&nbsp;
        </TabPageBody>
      </TabPage>
    )
  }
}

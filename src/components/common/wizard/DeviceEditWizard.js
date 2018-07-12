import React from 'react'
import { assign, debounce } from 'lodash'
import { reduxForm, Form } from 'redux-form'
import {Button, IconButton, CircularProgress, Tooltip} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { wizardEditConfig } from './WizardConfig'
import { util } from './WizardUtil'
import {isWindowsDevice, getAgentStatusMessage, mergeCredentials} from 'shared/Global'
import {showAlert} from 'components/common/Alert'

import TextInput from './input/TextInput'
import Checkbox from './input/Checkbox'
import IconUploader from './input/IconUploader'
import Credentials from './input/Credentials'
import RemoveAfter from './input/RemoveAfter'
import AgentPicker from './input/AgentPicker'

import ImageUploaderModal from 'components/sidebar/settings/template/ImageUploaderModal'
import TagsView from './input/TagsView'

import CollectorModal from 'components/sidebar/settings/collector/CollectorModal'
import MonitorTable from 'components/common/wizard/input/MonitorTable'
import {CardPanel} from 'components/modal/parts'

const fixedBarStyle = {
  position: 'fixed',
  bottom: 0,
  background: '#e6e8ed',
  left: 0,
  right: 0,
  borderTop: '1px solid lightgray',
  zIndex: 10,
  padding: '13px 20px 20px 0'
}

class DeviceEditWizard extends React.Component {
  constructor (props) {
    super(props)

    let config = wizardEditConfig[this.props.deviceType]
    console.log(`Device type: ${this.props.deviceType}`)

    this.state = {
      currentDevice: config,
      monitors: props.selectedDevice ? (props.selectedDevice.monitors || []) : []
    }

    this.mapping = {
      'text': this.buildText.bind(this),
      'check': this.buildCheck.bind(this),
      'row': this.buildRow.bind(this),
      'uploader': this.buildIconUploader.bind(this),
      'removeafter': this.buildRemoveAfter.bind(this),
      'agentpicker': this.buildAgentPicker.bind(this)

    }

    this.fnSaveDeb = debounce(this.onRequestSave.bind(this), 2000)
  }

  componentDidMount () {
    const {initialValues} = this.props
    if (initialValues) {
      this.props.updateDeviceTags(initialValues.tags || [])
    }
    this.props.closeTplImageModal('')
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchCollectors()
    this.props.fetchMonitorTemplates()
    this.props.updateDeviceHost('')
  }

  componentWillReceiveProps (nextProps) {
    const {installAgentMessage} = nextProps
    if (!this.props.installAgentMessage && installAgentMessage) {
      showAlert(installAgentMessage)
    }
  }

  componentDidUpdate (prevProps) {
    const {deviceHost} = this.props
    // if (deviceType !== prevProps.deviceType) {
    //   const config = wizardConfig[deviceType]
    //   const stepItems = config.steps
    //
    //   this.setState({
    //     currentDevice: {...config, steps: stepItems},
    //     monitors: this.props.monitors || [],
    //   })
    // }

    if (deviceHost && deviceHost !== prevProps.deviceHost) {
      this.props.change('name', deviceHost)
      this.fnSaveDeb()
    }
  }

  onRequestSave () {
    this.props.submit(this.props.handleSubmit(this.handleFormSubmit.bind(this)))
  }

  onChangeForm (e) {
    this.fnSaveDeb()
  }

  onChangeIntegrated () {
    this.fnSaveDeb()
  }

  onUpdateTags (tags) {
    this.props.updateDeviceTags(tags)
    this.fnSaveDeb()
  }

  didSave (res) {
    if (!res) return
    const {onFinish} = this.props
    onFinish && onFinish(res)
  }

  handleFormSubmit (formProps) {
    const {currentDevice, monitors} = this.state
    const {initialValues, selectedTplImage, deviceTags, deviceCreds} = this.props

    // let elem = document.getElementById('submitButton')
    // elem.style.backgroundColor = '#d1d1d1'
    const entity = {...formProps}
    assign(entity, currentDevice.server.params)
    assign(entity, this.props.extraParams)
    assign(entity, {
      image: selectedTplImage ? selectedTplImage.uuid : initialValues['image'],
      tags: deviceTags || [],
      credentials: deviceCreds,
      monitors
    })

    const params = formProps.params || {}
    if (formProps.remove_after) {
      switch (formProps.remove_after_unit) {
        case 'months':
          params.remove_after = formProps.remove_after * 30
          break
        case 'years':
          params.remove_after = formProps.remove_after * 365
          break
        default:
          params.remove_after = formProps.remove_after
      }
    }
    formProps.params = params

    console.log(entity)
    this.didSave(entity)
  }

  buildContent (tab, index) {
    const currentDevice = this.state.currentDevice
    let items = []

    currentDevice.steps.forEach(stepConfig => {
      stepConfig.items.forEach(itemConfig => {
        if (!itemConfig.name) return
        if (tab.include.indexOf(itemConfig.name) < 0) return

        let inputs = this.buildInput(itemConfig)
        if (!inputs) return true

        items = items.concat(inputs)
      })
    })

    if (tab.extra) {
      tab.extra.forEach(item => {
        let inputs = this.buildInput({
          name: item.name,
          type: 'text',
          label: {
            text: item.title,
            type: 'attach',
            width: 3
          },
          disabled: true
        })
        if (!inputs) return true

        items = items.concat(inputs)
      })
    }

    return (
      <div style={tab.width ? {minHeight: 216} : null}>
        {items}
        {tab.include.indexOf('tags') >= 0 && this.buildTags()}
      </div>
    )
  }

  onChangedMonitors (monitors) {
    this.setState({monitors}, () => this.onRequestSave())
  }

  onReplaceCreds (oldCred, newCred) {
    const {selectedDevice} = this.props
    if ((oldCred.deviceIds || []).includes(selectedDevice.id)) {
      this.props.updateCredentials({
        ...oldCred,
        deviceIds: oldCred.deviceIds.filter(p => p !== selectedDevice.id)
      })
    }

    if (!(newCred.deviceIds || []).includes(selectedDevice.id)) {
      this.props.updateCredentials({
        ...newCred,
        deviceIds: [...(newCred.deviceIds || []), selectedDevice.id]
      })
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getDeviceCreds () {
    const { selectedDevice, credentials } = this.props
    const type = isWindowsDevice(selectedDevice) ? 'WINDOWS' : 'SSH'
    return credentials.filter(p =>
      (!p.global && p.deviceIds && p.deviceIds.indexOf(selectedDevice.id) >= 0) ||
      (p.global && p.default && p.type === type)
    )
  }

  onClickInstall () {
    const device = this.props.initialValues
    const {collectors} = this.props

    const exists = collectors.filter(p => p.ostype === 'WINDOWS').length > 0
    if (!exists) {
      showAlert('Please add collector.');
      return;
    }

    const creds = this.getDeviceCreds()
    if (!creds.length) {
      showAlert('Please add credential.', () => {
        this.onClickAddCred()
      });
      return;
    }

    this.props.installAgent(device)
  }
  onClickUninstall () {
    const device = this.props.initialValues
    this.props.uninstallAgent(device)
  }
  onClickAddCred () {
    this.props.showDeviceCredsPicker(true)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangeAgentType (e, value) {
    this.checkDeviceAgentStatus({
      agentType: value
    })
  }

  checkDeviceAgentStatus (options = {}) {
    const {selectedDevice, formValues, credentials} = this.props

    const entity = {
      ...selectedDevice,
      ...formValues,
      ...options
    }

    entity.credentials = mergeCredentials(entity, credentials, [], [])

    if (!entity.wanip) {
      // showAlert('Please input IP')
      return
    }

    if (!entity.collectorId && entity.agentType === 'collector') {
      this.props.showCollectorInstallModal(true)
      return
    }

    console.log(entity)
    this.props.fixNewDevice(entity)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  buildTags () {
    return (
      <TagsView
        {...this.props}
        showMonitorTagModal={this.props.showDeviceTagModal}
        updateMonitorTags={this.onUpdateTags.bind(this)}
        monitorTagModalOpen={this.props.deviceTagModalOpen}
        monitorTags={this.props.deviceTags}
      />
    )
  }

  buildInput (config) {
    let items = []
    config.type = config.type || ''
    let func = this.mapping[config.type.toLowerCase()]

    if (typeof func === 'function') {
      items = func(config, {})
    } else {
      console.error(`Mapping not found! : ${config.type}`)
    }

    return items
  }

  buildText (config) {
    return (
      <TextInput
        key={config.name}
        config={config}
        buildLabel={this.buildLabel.bind(this)}
        onChange={this.onChangeForm.bind(this)}
      />
    )
  }

  buildCheck (config) {
    return (<Checkbox key={config.name}
      config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildLabel (config) {
    return (
      <div className={`col-md-${util.calcWidth(config.width)}`}
        style={util.convertStyle(config.style)}>
          <label className={`control-label ${config.cls || ''}`}
            dangerouslySetInnerHTML={{__html: config.html || config.text || ''}} // eslint-disable-line react/no-danger
          />
      </div>
    )
  }

  buildRow (config) {
    let children = []
    let items = config.items || []
    items.forEach(item => {
      let inputs = this.buildInput(item)
      children = children.concat(inputs)
    })

    return (
      <div className="row margin-md-bottom">
        {children}
      </div>
    )
  }

  buildIconUploader (config) {
    return (
      <IconUploader
        key={config.name}
        config={config}
        values={this.props.initialValues}
        openTplImageModal={this.props.openTplImageModal}
        selectedTplImage={this.props.selectedTplImage}
        onChange={this.onChangeForm.bind(this)}
      />
    )
  }

  buildCredentials () {
    const isWin = isWindowsDevice(this.props.selectedDevice)
    return (
      <div className="padding-md-top">
        <Credentials
          {...this.props}
          isWin={isWin}
          onChangeIntegrated={this.onChangeIntegrated.bind(this)}
          showGlobal
          onReplaceCreds={this.onReplaceCreds.bind(this)}
        />
      </div>
    )
  }

  buildMonitors () {
    const {monitorTemplates, openDeviceMonitorWizard,
      deviceTemplates, collectors, addBasicMonitors, selectedDevice} = this.props
    return (
      <MonitorTable
        device={selectedDevice}
        monitors={this.state.monitors}
        templates={monitorTemplates}
        onChanged={this.onChangedMonitors.bind(this)}
        openDeviceMonitorWizard={openDeviceMonitorWizard}
        deviceTemplates={deviceTemplates}
        collectors={collectors}
        hideDevices
        addBasicMonitors={addBasicMonitors}
      />
    )
  }

  buildRemoveAfter (config, values, meta) {
    return (
      <RemoveAfter
        key="remove_after"
        onChange={this.onChangeForm.bind(this)}
      />
    )
  }

  buildAgentPicker (config, values, meta) {
    const {selectedDevice, formValues, extraParams, fixResult, fixStatus} = this.props

    let msg = ''
    if (fixStatus === 'checking' ) {
      msg = <div style={{color: '#600000'}}>Trying to access server, please wait…<CircularProgress className="valign-top margin-md-left" size={24}/></div>
    } else if (fixStatus === 'done') {
      if (!fixResult.code) msg = <div style={{color: '#008000'}}>Connection successful</div>
      else msg = <div style={{color: '#600000'}}>{getAgentStatusMessage(fixResult.code)}</div>
    }

    return (
      <div key="agentPicker">
        {msg}
        <AgentPicker
          {...this.props}
          values={values}
          config={config}
          meta={meta}
          editDevice={{
            ...extraParams,
            ...selectedDevice,
            ...formValues
          }}
          onChange={this.onChangeAgentType.bind(this)}
        />
      </div>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  renderTplImageModal () {
    if (!this.props.tplImageModalVisible) return null
    return (
      <ImageUploaderModal {...this.props} closeOnSelect/>
    )
  }
  renderCollectorModal () {
    if (!this.props.collectorModalOpen) return null
    return (
      <CollectorModal
        showCollectorModal={this.props.showCollectorModal}
        addCollector={this.props.addCollector}
      />
    )
  }
  renderCredButtons () {
    return (
      <div>
        <Tooltip title="Add Credentials">
          <IconButton onClick={this.onClickAddCred.bind(this)}>
            <AddCircleIcon size={32}/>
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  render () {
    const { handleSubmit, tabs/*, selectedDevice*/ } = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="tab-options hidden">
            <div className="margin-md-top"
              style={{position: 'absolute', top: '40px', right: '20px'}}>
              <Button variant="raised" type="submit" color="primary" className="hidden">Save</Button>&nbsp;
              &nbsp;
              <Button variant="raised" onClick={this.onClickAddCred.bind(this)}>Add Credential</Button>
            </div>
          </div>

          <div style={{paddingLeft: 5, paddingRight: 5}}>
            {
              tabs.map((tab, i) => (
                <div key={i} className={`col-md-${tab.width}`}>
                  <CardPanel title={tab.title}>
                    {this.buildContent(tab, i)}
                  </CardPanel>
                </div>
              ))
            }
            <div className="col-md-12">
              <CardPanel title="Credentials" tools={this.renderCredButtons()}>
                {this.buildCredentials()}
              </CardPanel>
            </div>

            <div className="col-md-12">
              {this.buildMonitors()}
            </div>
          </div>

          <div style={{height: 140, width: '100%'}} className="pull-left">&nbsp;</div>
          <div style={fixedBarStyle} className="text-right">
            <Button variant="raised" type="submit">Save</Button>
          </div>
        </Form>

        {this.renderTplImageModal()}
        {this.renderCollectorModal()}
      </div>
    )
  }
}

export default reduxForm({
  form: 'deviceEditForm'
})(DeviceEditWizard)

import React from 'react'

import { assign } from 'lodash'
import { reduxForm } from 'redux-form'
import {Step, Stepper, StepLabel} from '@material-ui/core'

import TextInput from './input/TextInput'
import Checkbox from './input/Checkbox'
import Combo from './input/Combo'
import MonitorTable from './input/MonitorTable'
import ParamEditModal from './input/ParamEditModal'
import ParamList from './input/ParamList'
import {wizardConfig, commonconfig} from './WizardConfig'
import {util} from './WizardUtil'
import DeviceEditModalView from './DeviceEditModalView'
import TagsView from './input/TagsView'
import CredPickerInput from './input/CredPicker'
import AgentPicker from './input/AgentPicker'
import {showAlert, showConfirm} from 'components/common/Alert'
import {CardPanel} from 'components/modal/parts'
import CredentialModal from 'components/credentials/CredentialModal'
import IconUploader from './input/IconUploader'
import ImageUploaderModal from 'components/sidebar/settings/template/ImageUploaderModal'

class DeviceEditModal extends React.Component {
  constructor (props) {
    super(props)

    const config = wizardConfig[this.props.deviceType]
    console.log(`Device type: ${this.props.deviceType}`)

    const stepItems = config.steps

    this.state = {
      current: 1,
      steps: stepItems.length,
      currentDevice: {...config, steps: stepItems},
      monitors: props.monitors || [],

      credentialSelect: 'existing',

      deviceCredentials: []
    }

    this.mapping = {
      'text': this.buildText.bind(this),
      'check': this.buildCheck.bind(this),
      'monitors': this.buildMonitors.bind(this),
      'paramlist': this.buildParamList.bind(this),
      'combo': this.buildCombo.bind(this),
      'row': this.buildRow.bind(this),
      'credpicker': this.buildCredPicker.bind(this),
      'agentpicker': this.buildAgentPicker.bind(this),
      'icon': this.buildIconUploader.bind(this),
      'tags': this.buildTags.bind(this)
    }
  }

  componentWillMount () {
    this.props.fetchMonitorTemplates()
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchCollectors()

    this.props.closeTplImageModal('')
  }

  componentDidMount () {
    this.updateDistribution()
    const {initialValues} = this.props
    if (initialValues) {
      this.props.updateDeviceTags(initialValues.tags || [])
    }
  }

  onFetchCreds (creds) {
    const {id} = this.props.editDevice
    const {deviceCredentials} = this.state
    creds.forEach(cred => {
      if (cred.deviceIds && cred.deviceIds.includes(id)) {
        deviceCredentials.push(cred)
      }
    })
  }
  getDistribution () {
    const {tags} = this.props.editDevice
    const dists = commonconfig.distribution.values.map(p => p.value)
    const found = (tags || []).filter(p => dists.includes(p))
    if (found.length) return found
    return []
  }
  updateDistribution () {
    const found = this.getDistribution()
    if (found.length) {
      this.props.change('distribution', found[0])
    }
  }

  onChangeCredential (value) {
    this.setState({
      credentialSelect: value
    })
  }

  onCloseCredPicker (selected) {
    if (selected) {
      this.setState({
        deviceCredentials: [...this.state.deviceCredentials, selected]
      })
    }
    this.props.showDeviceCredsPicker(false)
  }

  onDeleteDeviceCred (index) {
    const {deviceCredentials} = this.state
    showConfirm('Click OK to delete', btn => {
      if (btn !== 'ok') return

      if (deviceCredentials[index].id) {
        this.props.removeCredentials(deviceCredentials[index])
      }

      this.setState({
        deviceCredentials: deviceCredentials.filter((p, i) => i !== index)
      })
    })
  }

  handleFormSubmit (formProps) {
    const { extraParams, onFinish, editParams, deviceTags, selectedTplImage } = this.props
    const { monitors, currentDevice } = this.state
    const params = {}

    if (formProps.agentType === 'collector') {
      if (!formProps.collectorId) {
        showAlert('Please install collector.')
        return
      }
    }

    if (editParams) {
      editParams.forEach(p => {
        params[p.key] = p.value
      })
    }

    const props = assign(
      {},
      formProps,
      currentDevice.server.params || {},
      extraParams, {
        monitors: monitors.map(m => assign({}, m, {id: null})),
        tags: deviceTags,
        params
      }
    )
    if (selectedTplImage) props.image = selectedTplImage.uuid

    const oldTags = this.getDistribution()
    const tags = (props.tags || []).filter(p => !oldTags.includes(p))
    if (props.distribution) tags.push(props.distribution)
    props.tags = tags

    // if (this.state.credentialSelect === 'existing') {
    //   const index = findIndex(this.props.credentials, {id: formProps.credentialId})
    //   if (index >= 0) {
    //     props.credential = this.props.credentials[index]
    //   }
    // } else {
    //   if (formProps.creduser && formProps.credtype) {
    //     props.credential = {
    //       username: formProps.creduser,
    //       password: formProps.credpassword,
    //       global: false,
    //       type: formProps.credtype,
    //       name: `Cred-${props.name || 'device'}`
    //     }
    //   }
    // }
    props.credential = []
    console.log(props)
    this.closeModal(true)
    onFinish && onFinish(props)
  }

  buildProgressBar () {
    if (this.state.steps <= 1) return null

    const markers = []
    for (let i = 0; i < this.state.steps; i++) {
      markers.push(
        <Step key={i}>
          <StepLabel>{this.state.currentDevice.steps[i].title}</StepLabel>
        </Step>
      )
    }

    return (
      <Stepper activeStep={this.state.current - 1} style={{marginTop: 20}}>
        {markers}
      </Stepper>
    )
  }

  buildContent () {
    let tabs = []

    for (let i = 0; i < this.state.steps; i++) {
      let tab = this.buildStep(i)
      tabs.push(tab)
    }

    return tabs
  }

  buildStep (index) {
    const {canAddTags} = this.props
    const currentDevice = this.state.currentDevice
    const stepConfig = currentDevice.steps[index]

    return (
      <div key={index} className={`${(index === (this.state.current - 1)) ? ' active' : 'hidden'}`}>
        {stepConfig.panels.map((panel, pi) =>
          panel.skip ? (
            <div key={pi}>
              {panel.items.map(itemConfig => this.buildInput(itemConfig, this.props.values))}
            </div>
          ) : (
            <CardPanel key={pi} title={panel.title}>
              {panel.items.map(itemConfig => this.buildInput(itemConfig, this.props.values))}
            </CardPanel>
          )
        )}

        {index === 1 && canAddTags ? this.renderTags() : null}
      </div>
    )
  }

  buildInput (config, values) {
    let items = []

    if (this.props.hideNames && config.name) {
      let found = this.props.hideNames.indexOf(config.name) >= 0
      if (found) return items
    }

    config.type = config.type || ''
    let func = this.mapping[config.type.toLowerCase()]

    if (typeof func !== 'undefined') {
      items = func(config, values || {})
    } else {

    }

    return items
  }

  buildText (config, values) {
    return (<TextInput key={config.name}
                       config={config}
                       values={values}
                       buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildCombo (config, values) {
    return (<Combo key={config.name}
                   config={config}
                   values={values}
                   buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildCheck (config, values) {
    return (<Checkbox key={config.name}
                      config={config}
                      values={values}
                      buildLabel={this.buildLabel.bind(this)}
                      change={this.props.change}/>)
  }

  buildLabel (config) {
    return (
      <div style={util.convertStyle(config.style)}>
        <label className={`control-label ${config.cls || ''}`}
               dangerouslySetInnerHTML={{__html: config.html || config.text || ''}} // eslint-disable-line react/no-danger
        />
      </div>
    )
  }

  buildMonitors (config, values) {
    return (
      <MonitorTable
        key="monitors"
        name="monitorList"
        monitors={this.state.monitors}
        templates={this.props.monitorTemplates}
        onChanged={monitors => { this.setState({ monitors }) }}
        values={values}
        config={config}
        openDeviceMonitorWizard={this.props.openDeviceMonitorWizard}
        deviceTemplates={this.props.deviceTemplates}
        collectors={this.props.collectors}
        hideDevices
      />
    )
  }

  buildParamList (config, values) {
    return (
      <ParamList
        key="paramList"
        config={config}
        values={values}
        editParams={this.props.editParams}
        openParamEditModal={this.props.openParamEditModal}
        closeParamsModal={this.props.closeParamsModal}
        removeParam={this.props.removeParam}
        updateMonitorParams={this.props.updateMonitorParams}
        monitorConfig={this.props.monitorConfig}
      />
    )
  }

  buildCredPicker (config, values) {
    const {credentials, credentialTypes, showDeviceCredsPicker} = this.props
    const {deviceCredentials} = this.state
    return (
      <CredPickerInput
        key="credentialId"
        credentials={credentials}
        credentialTypes={credentialTypes}
        deviceCredentials={deviceCredentials}
        onChangeCredential={this.onChangeCredential.bind(this)}
        onClickDelete={this.onDeleteDeviceCred.bind(this)}
        showDeviceCredsPicker={showDeviceCredsPicker}
        values={values}
        config={config}/>
    )
  }

  buildAgentPicker (config, values) {
    return (
      <AgentPicker
        {...this.props}
        key="agentPicker"
        values={values}
        config={config}
      />
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
        className="margin-md-top"
      />
    )
  }

  buildTags () {
    return (
      <TagsView
        {...this.props}
        key="tags"
        showMonitorTagModal={this.props.showDeviceTagModal}
        updateMonitorTags={this.props.updateDeviceTags}
        monitorTagModalOpen={this.props.deviceTagModalOpen}
        monitorTags={this.props.deviceTags}
      />
    )
  }

  buildRow (config, values) {
    let children = []
    let items = config.items || []
    items.forEach(item => {
      let inputs = this.buildInput(item, values)
      children = children.concat(inputs)
    })

    return (
      <div className="row margin-md-bottom">
        {children}
      </div>
    )
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }

  onClickPrevious () {
    let current = this.state.current

    if (current > 1) {
      current--
      this.setState({current})
    } else {
      this.closeModal()
      this.props.onStep0 && this.props.onStep0()
    }
  }

  onClickNext () {
    let current = this.state.current

    current++
    this.setState({ current })
  }

  renderCredPicker () {
    if (this.props.deviceCredsPickerVisible !== 1) return null
    return (
      <CredentialModal
        credentialTypes={this.props.credentialTypes}
        addCredentials={this.onCloseCredPicker.bind(this)}/>
    )
  }

  renderParamEditModal () {
    if (!this.props.paramEditModalOpen) return null
    return (
      <ParamEditModal/>
    )
  }

  renderTags () {
    return (
      <TagsView {...this.props}/>
    )
  }

  renderTplImageModal () {
    if (!this.props.tplImageModalVisible) return null
    return (
      <ImageUploaderModal {...this.props} closeOnSelect/>
    )
  }

  render () {
    const { handleSubmit, canAddTags } = this.props
    const { current, steps } = this.state
    const header = this.props.title || this.state.currentDevice.title || ''
    const progressBar = this.buildProgressBar()
    const content = this.buildContent()
    const paramEditModal = this.renderParamEditModal()

    return (
      <DeviceEditModalView
        header={header}
        content={content}
        progressBar={progressBar}
        current={current}
        steps={steps}
        paramEditModal={paramEditModal}
        onHide={this.closeModal.bind(this)}
        onPrev={this.onClickPrevious.bind(this)}
        onNext={this.onClickNext.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        canAddTags={canAddTags}
        credPicker={this.renderCredPicker()}
        iconPicker={this.renderTplImageModal()}
      />
    )
  }
}

export default reduxForm({
  form: 'editDeviceForm'
})(DeviceEditModal)
import React, { Component } from 'react'
import { assign } from 'lodash'
import { reduxForm } from 'redux-form'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'

import TextInput from './input/TextInput'
import Checkbox from './input/Checkbox'
import Combo from './input/Combo'
import MonitorTable from './input/MonitorTable'
import ParamEditModal from './input/ParamEditModal'
import ParamList from './input/ParamList'
import {wizardConfig} from './WizardConfig'
import {util} from './WizardUtil'
import DeviceWizardView from './DeviceWizardView'
import TagsView from './input/TagsView'
import CredPickerInput from './input/CredPicker'
import AgentPicker from './input/AgentPicker'

import {CardPanel} from 'components/modal/parts'

// import CredPicker from 'containers/settings/credentials/CredsPickerContainer'
import CredentialModal from 'components/credentials/CredentialModal'

class DeviceWizard extends Component {
  constructor (props) {
    super(props)

    let config = wizardConfig[this.props.deviceType]
    console.log(`Device type: ${this.props.deviceType}`)
    console.log(props.monitorConfig)

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
      'agentpicker': this.buildAgentPicker.bind(this)
    }
  }

  componentWillMount () {
    this.props.fetchMonitorTemplates()
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchMonitorGroups()
    this.props.fetchCollectors()
  }

  componentWillUpdate(nextProps) {
    const {collectors} = nextProps
    if (this.props.collectors !== collectors && collectors.length) {
      if (!nextProps.formValues.collectorId) {
        nextProps.change('collectorId', collectors[0].id)
      }
    }
  }

  onChangeCredential (value) {
    this.setState({
      credentialSelect: value
    })
  }

  onChangeMonitorGroupType (value) {
    this.setState({
      monitorGroupType: value
    })
  }

  onChangeAgentType () {

  }

  handleFormSubmit (formProps) {
    const { extraParams, onFinish, editParams, canAddTags, monitorTags } = this.props
    const { monitors, currentDevice } = this.state
    const {distribution} = formProps
    const params = {}
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
        params
      }
    )

    if (canAddTags) props.tags = monitorTags || []
    if (distribution) {
      props.tags = [...(props.tags || []), distribution]
    }

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
    props.credential = this.state.deviceCredentials
    console.log(props)
    this.closeModal(true)
    onFinish && onFinish(null, props, currentDevice.server.url)
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
      <Stepper activeStep={this.state.current - 1} style={{marginTop: 0}}>
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
    return (
      <Combo
        key={config.name}
        config={config}
        values={values}
        buildLabel={this.buildLabel.bind(this)}
      />
    )
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
    const {credentials, credentialTypes, showDeviceCredsPicker, extraParams} = this.props
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
        config={config}
        extraParams={extraParams}
      />
    )
  }

  buildAgentPicker (config, values) {
    const {formValues, extraParams} = this.props
    return (
      <AgentPicker
        {...this.props}
        key="agentPicker"
        values={values}
        config={config}
        editDevice={{
          ...formValues,
          templateName: extraParams.templateName
        }}
        onChange={this.onChangeAgentType.bind(this)}
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

  onCloseCredPicker (selected) {
    if (selected) {
      // const {selectedDevice} = this.props
      // const props = {
      //   ...selectedDevice,
      //   credentials: [selected]
      // }
      // this.props.updateMapDevice(props)
      this.setState({
        deviceCredentials: [...this.state.deviceCredentials, selected]
      })
    }
    this.props.showDeviceCredsPicker(false)
  }

  onDeleteDeviceCred (index) {
    this.setState({
      deviceCredentials: this.state.deviceCredentials.filter((p, i) => i !== index)
    })
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

  renderCredPicker () {
    if (!this.props.deviceCredsPickerVisible) return null
    return (
      <CredentialModal
        credentialTypes={this.props.credentialTypes}
        addCredentials={this.onCloseCredPicker.bind(this)}
        onClose={this.onCloseCredPicker.bind(this)}
      />
    )
  }

  render () {
    const { handleSubmit, canAddTags } = this.props
    const { current, steps } = this.state
    /* let cssPrevious = ''
    if (current < 2) cssPrevious = onStep0 ? '' : 'hidden' */
    let header = this.props.title || this.state.currentDevice.title || ''
    let progressBar = this.buildProgressBar()
    let content = this.buildContent()
    let paramEditModal = this.renderParamEditModal()
    return (
      <DeviceWizardView
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
      />
    )
  }
}

DeviceWizard.defaultProps = {
  title: '',
  deviceType: '',
  extraParams: {},
  configParams: {},
  hideNames: [],
  monitors: [],
  values: {},
  onStep0: null,
  onFinish: null
}

// export const MonitorWizard = reduxForm({
//   form: 'monitorWizardForm'
// })(DeviceWizard)

export default reduxForm({
  form: 'deviceForm'
})(DeviceWizard)

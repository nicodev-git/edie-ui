import React from 'react'
import Modal from 'react-bootstrap-modal'
import {BasicForm} from 'react-serial-forms'
import {
    assign,
    keys,
    forIn,
    hasIn
} from 'lodash'

import {wizardConfig} from './WizardConfig'

import TextInput from './input/TextInput'
import Combo from './input/Combo'
import Password from './input/Password'
import RadioCombo from './input/RadioCombo'
import AdvancedForm from './input/AdvancedForm'
import Checkbox from './input/Checkbox'
import PortList from './input/PortList'
import MatchIgnore from './input/MatchIgnore'
import GlobalIgnore from './input/GlobalIgnore'
import MTable from './input/MTable'
import MonitorTable from './input/MonitorTable'

import {util} from './WizardUtil'

import { ROOT_URL } from 'actions/config'

export default class DeviceWizard extends React.Component {
  constructor (props) {
    super(props)

    let config = wizardConfig[this.props.deviceType]
    console.log(`Device type: ${this.props.deviceType}`)

    this.state = {
      current: 1,
      steps: config.steps.length,
      open: true,

      currentDevice: config,

      inputs: {

      }
    }

    this.mapping = {
      'text': this.buildText.bind(this),
      'combo': this.buildCombo.bind(this),
      'radiogroup': this.buildRadioGroup.bind(this),
      'radiocombo': this.buildRadioCombo.bind(this),
      'check': this.buildCheck.bind(this),
      'checklist': this.buildCheckList.bind(this),
      'label': this.buildLabel.bind(this),
      'password': this.buildPassword.bind(this),

      'advanced': this.buildAdvanced.bind(this),
      'form': this.buildForm.bind(this),

      'matchignore': this.buildMatchIgnore.bind(this),
      'globalignore': this.buildGlobalIgnore.bind(this),

      'monitors': this.buildMonitors.bind(this),
      'mtable': this.buildMTable.bind(this),

      'row': this.buildRow.bind(this)
    }
  }

  render () {
    let current = this.state.current
    let cssPrevious = ''

    if (current < 2) {
      cssPrevious = this.props.onStep0 ? '' : 'hidden'
    }
    return (
            <Modal show={this.state.open}
              onHide={this.onHide.bind(this)}
              aria-labelledby="ModalHeader"
              className="bootstrap-dialog type-primary modal-device-wizard"
              style={{width: '740px'}}>
                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        {this.props.title || this.state.currentDevice.title || ''}
                    </h4>
                </div>
                <div className="modal-body bootstrap-dialog-message p-none">
                    <BasicForm className="wizard-container" ref="form" onSubmit={this.onSubmit.bind(this)}>

                        {this.buildProgressBar()}

                        {this.buildContent()}

                        <div className="text-right mb-none">

                            <a href="javascript:;"
                              className="btn btn-default btn-sm"
                              onClick={this.onClickClose.bind(this)}>Cancel</a>

                            <a href="javascript:;"
                              className={`btn btn-default btn-sm margin-sm-left ${cssPrevious}`}
                              onClick={this.onClickPrevious.bind(this)}>Previous</a>

                            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-left"
                              onClick={this.onClickNext.bind(this)}>
                                {this.state.current < this.state.steps ? 'Next' : 'Finish'}
                            </a>

                        </div>

                    </BasicForm>
                </div>
            </Modal>
    )
  }

  onSubmit (e) {
    e.preventDefault()
    this.onClickNext()
  }

  buildProgressBar () {
    if (this.state.steps <= 1) return null

    let markers = []
    for (let i = 1; i <= this.state.steps; i++) {
      markers.push(
                <div className={`marker ${i <= this.state.current ? 'marker-checked' : ''}`}
                  style={{left: `${100 / this.state.steps * (i - 0.5)}%`}}
                  key={i}>
                    <div className="marker-label">{i}</div>
                </div>
            )
    }

    return (
            <div className="wizard-progress">
                {markers}
                <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
                    <div className="progress-bar" style={{width: `${100 * this.state.current / this.state.steps}%`}} />
                </div>
            </div>
    )
  }

  buildContent () {
    let tabs = []

    for (let i = 0; i < this.state.steps; i++) {
      let tab = this.buildStep(i)
      tabs.push(tab)
    }

    return (
            <div className="tab-content">
                {tabs}
            </div>
    )
  }

  buildStep (index) {
    const currentDevice = this.state.currentDevice
    const stepConfig = currentDevice.steps[index]

    let items = []

    stepConfig.items.forEach(itemConfig => {
      let inputs = this.buildInput(itemConfig, this.props.values)
      if (!inputs) return true

      items = items.concat(inputs)
    })

    return (
            <div key={index} className={`tab-pane p-none${(index === (this.state.current - 1)) ? ' active' : ''}`}>
                {items}
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

    if (func !== null) {
      items = func(config, values || {})
    } else {
      console.error(`Mapping not found! : ${config.type}`)
    }

    return items
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  buildText (config, values) {
    return (<TextInput config={config}
      values={values}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildCombo (config, values) {
    return (<Combo config={config}
      values={values}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildRadioGroup (config, values) {
    return null
  }

  buildRadioCombo (config, values) {
    return (<RadioCombo config={config}
      values={values}
      buildLabel={this.buildLabel.bind(this)}
      buildInput={this.buildInput.bind(this)}/>)
  }

  buildCheck (config, values) {
    return (<Checkbox config={config}
      values={values}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildCheckList (config, values) {
    return (<PortList config={config}
      values={values}
      name="portList"
      buildInput={this.buildInput.bind(this)}/>)
  }

  buildPassword (config, values) {
    let text = []
    let width = util.calcWidth(config.width)

    if (config.label !== null) {
      if (config.label.type === 'place') {

      } else {
        text.push(this.buildLabel(config.label))
        width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
      }
    }

    text.push(
            <div className={`col-md-${util.calcWidth(config.width)}`}
              style={util.convertStyle(config.style)}>
                <Password config={config} values={values}/>
            </div>
        )
    return text
  }

  buildLabel (config) {
    return (
            <div className={`col-md-${util.calcWidth(config.width)}`}
              style={util.convertStyle(config.style)}>
                <label className={`control-label ${config.cls || ''}`}
                  dangerouslySetInnerHTML={{__html: config.html || config.text || ''}}
                />
            </div>
    )
  }

  buildAdvanced (config, values) {
    return (<AdvancedForm config={config}
      values={values}
      name="advanced"
      buildInput={this.buildInput.bind(this)}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildForm (config, values) {
    return null
  }

  buildMatchIgnore (config, values) {
    return (<MatchIgnore name="matchIgnore"
      values={values}
      config={config}/>)
  }

  buildGlobalIgnore (config, values) {
    return (<GlobalIgnore name="globalIgnore"
      values={values}
      config={config}/>)
  }

  buildMonitors (config, values) {
    return (<MonitorTable name="monitorList"
      values={values}
      config={config}/>)
  }

  buildMTable (config, values) {
    return (<MTable name="mTable"
      values={values}
      config={config}/>)
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

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  closeModal (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.closeModal()
  }

  onClickPrevious () {
    let current = this.state.current

    if (current > 1) {
      current--
      this.setState({current})
    } else {
      this.closeModal()
      this.props.onStep0 &&
                this.props.onStep0()
    }
  }

  onClickNext () {
    let current = this.state.current
    let timer = 0

    let onNext = () => {
      if (current < this.state.steps) {
        current++
        this.setState({current})
      } else {
        this.onClickFinish()
      }
    }

    this.refs.form.validate(errors => {
      clearTimeout(timer)

      if (errors) return
      onNext()
    })

        // Tweak
    timer = setTimeout(onNext, 100)
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickFinish () {
    let req = this.prepareRequest()

    if (this.props.paramOnly) {
      this.closeModal(true)
      this.props.onFinish &&
                this.props.onFinish(null, req)

      return
    }

    $.get(`${req.url}?${req.paramString}`)
        .done(res => {
          if (!res.success) {
            const err = res.info || res.exceptionData
            alert(err ? err : 'Save Failed!')
          } else {
            const object = res.object
            this.callAddMonitors(req.monitors, object[0] || object)
          }

          this.closeModal(true)
          this.props.onFinish &&
                this.props.onFinish(res, req)
        }).fail(() => {
          alert('Save Failed')
        })
  }

  prepareRequest () {
    let params = {}
    let paramString = ''
    let jsonParams = {}
    let monitors = []

    let currentDevice = this.state.currentDevice
    let theform = this.refs.form
    let formValues = theform.serialize()

    assign(params, currentDevice.server.params)
    assign(params, this.props.extraParams)

    forIn(formValues, (value, key) => {
      if (key === 'advanced') {
        assign(params, value)
      } else if (key === 'mTable') {
        assign(params, value)
      } else if (key === 'matchIgnore') {
        jsonParams['textToMatch'] = []
        jsonParams['textToIgnore'] = []
        jsonParams['occurrence'] = []
        jsonParams['id'] = []

        value.forEach(item => {
          jsonParams['textToMatch'].push(item.match || '')
          jsonParams['textToIgnore'].push(item.ignore || '')
          jsonParams['occurrence'].push(item.occurrence || '')
          jsonParams['id'].push(item.id || '')
        })
      } else if (key === 'globalIgnore') {
        jsonParams['globalignore'] = []
        jsonParams['globalignoreid'] = []

        value.forEach(item => {
          jsonParams['globalignore'].push(item.ignore || '')
          jsonParams['globalignoreid'].push(item.id || '')
        })
      } else if (key === 'portList') {
        jsonParams = value
      } else if (key === 'monitorList') {
        monitors = value
      } else {
        params[key] = value
      }
    })

    let jsonMapping = ['protocol', 'path', 'file', 'type', 'tolog', 'textToMatch', 'textToIgnore',
      'dayskeep', 'chartType', 'dbtype', 'threshHold', 'text', 'contains',
      'dbname', 'query', 'expectedType', 'expectedResponse', 'db', 'table', 'id']

    let addParam = (key, value) => {
      let mapped = jsonMapping.indexOf(key) >= 0

      if (mapped) {
        jsonParams[key] = value
        return
      }
      if (paramString) paramString += '&'
      let param = {}
      param[key] = value
      paramString += $.param(param)
    }

    $.each(params, (key, value) => {
      addParam(key, value)
    })
    addParam('json', JSON.stringify(jsonParams))
    params['json'] = jsonParams

    params.monitors = this.props.monitors

    return {
      url: this.props.configParams.url || currentDevice.server.url,
      params,
      paramString,
      monitors
    }
  }

  callAddMonitors (monitors, device) {
    monitors.forEach(item => {
      $.get(`${ROOT_URL}${Api.deviceadmin.addDevice}`, assign({}, item, {
        mapid: device.mapid,
        fatherid: device.id
      }))
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

DeviceWizard.defaultProps = {
  title: '',

  deviceType: '',

  extraParams: {},
  configParams: {},

  paramOnly: false,
  hideNames: [],

  monitors: [],

  values: {},

  onStep0: null,
  onFinish: null

}

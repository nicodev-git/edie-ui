import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { assign } from 'lodash'
import { reduxForm } from 'redux-form'

import { wizardEditConfig } from './WizardConfig'
import { util } from './WizardUtil'

import TextInput from './input/TextInput'
import TextArea from './input/TextArea'
import Combo from './input/Combo'
import Password from './input/Password'
import RadioCombo from './input/RadioCombo'
import Checkbox from './input/Checkbox'
import IconUploader from './input/IconUploader'
import RaisedButton from 'material-ui/RaisedButton'

class DeviceEditWizard extends React.Component {
  constructor (props) {
    super(props)

    let config = wizardEditConfig[this.props.deviceType]
    console.log(`Device type: ${this.props.deviceType}`)

    this.state = {
      currentDevice: config
    }

    this.mapping = {
      'text': this.buildText.bind(this),
      'check': this.buildCheck.bind(this),
      'row': this.buildRow.bind(this),
      'uploader': this.buildIconUploader.bind(this)
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('receive props')
    console.log(this.props.dirty)
    console.log(nextProps.dirty)
    let elem = document.getElementById('submitButton')
    if (nextProps.dirty) {
      console.log('dirty')
      elem.style.backgroundColor = '#ffffff'
    } else {
      elem.style.backgroundColor = '#d1d1d1'
    }
  }

  onSelectTab () {

  }

  didSave (res) {
    if (!res) return
    const {onFinish} = this.props
    onFinish && onFinish(res)
  }

  handleFormSubmit (params) {
    const {currentDevice} = this.state
    console.log(params)
    let elem = document.getElementById('submitButton')
    elem.style.backgroundColor = '#d1d1d1'
    assign(params, currentDevice.server.params)
    assign(params, this.props.extraParams)

    this.didSave(params)
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
      <div className="row margin-xs-left padding-md-top">
        <div className="col-md-6">
          {items}
        </div>
      </div>
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
    return (<TextInput key={config.name}
      config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildCombo (config) {
    return (<Combo key={config.name}
      config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildRadioCombo (config) {
    return (<RadioCombo key={config.name}
      config={config}
      buildLabel={this.buildLabel.bind(this)}
      buildInput={this.buildInput.bind(this)}/>)
  }

  buildCheck (config) {
    return (<Checkbox key={config.name}
      config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildPassword (config) {
    let text = []
    if (config.label !== null) {
      if (config.label.type === 'place') {

      } else {
        text.push(this.buildLabel(config.label))
      }
    }

    text.push(
      <div className={`col-md-${util.calcWidth(config.width)}`}
        style={util.convertStyle(config.style)}>
          <Password config={config}/>
      </div>
    )
    return text
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
    return (<IconUploader key={config.name}
      config={config} values={this.props.initialValues}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildTextArea (config) {
    return (<TextArea config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildForm (config) {
    return null
  }

  render () {
    const { handleSubmit, tabs } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="tab-options">
            <div className="margin-md-right margin-md-top"
              style={{position: 'absolute', top: '40px', right: '20px'}}>
              <RaisedButton id="submitButton" type="submit" label="Save"/>
            </div>
          </div>

          <div className="panel panel-default panel-noborder tab-panel" style={{background: 'transparent'}}>
            <div className="panel-body p-none">
              <Tabs defaultActiveKey={0} animation={false}
                className="tabs-custom"
                onSelect={this.onSelectTab.bind(this)}
                id="tabs-device-incidents">
                {
                  tabs.map((tab, i) => (
                    <Tab eventKey={i} key={i} title={tab.title}>
                      {this.buildContent(tab, i)}
                    </Tab>
                  ))
                }
              </Tabs>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'deviceEditForm'
})(DeviceEditWizard)

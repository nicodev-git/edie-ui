import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import {assign} from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {wizardEditConfig} from './WizardConfig'
import {util} from './WizardUtil'

import TextInput from './input/TextInput'
import TextArea from './input/TextArea'
import Combo from './input/Combo'
import Password from './input/Password'
import RadioCombo from './input/RadioCombo'
import Checkbox from './input/Checkbox'
import IconUploader from './input/IconUploader'

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
            // 'combo'     : this.buildCombo.bind(this),
            // 'radiocombo': this.buildRadioCombo.bind(this),
      'check': this.buildCheck.bind(this),
            // 'label'     : this.buildLabel.bind(this),
            // 'password'  : this.buildPassword.bind(this),
            // 'textarea'  : this.buildTextArea.bind(this),
            //
            // 'form'      : this.buildForm.bind(this),
            // 'uploader'  : this.buildIconUploader.bind(this),

      'row': this.buildRow.bind(this)
    }
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    assign(params, currentDevice.server.params)
    assign(params, this.props.extraParams)

    this.didSave(params)
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  buildContent (tab, index) {
    // const include = tab.include // Never used
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

        // if (this.props.hideNames && config.name) {
        //     let found = this.props.hideNames.indexOf(config.name) >= 0
        //     if (found) return items
        // }

    config.type = config.type || ''
    let func = this.mapping[config.type.toLowerCase()]

    if (func !== null) {
      items = func(config, {})
    } else {
      console.error(`Mapping not found! : ${config.type}`)
    }

    return items
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    // let width = util.calcWidth(config.width) // Never used

    if (config.label !== null) {
      if (config.label.type === 'place') {
                // input.attr('placeholder', config.label.text || '');
      } else {
        text.push(this.buildLabel(config.label))
        // width = util.calcWidth(config.width) - util.calcWidth(config.label.width) // Never used
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
                  dangerouslySetInnerHTML={{__html: config.html || config.text || ''}}
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
      config={config}
      sid={this.context.sid}
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
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="tab-options">
            <div className="pull-right margin-md-right margin-md-top">
              <button action="submit" className="btn btn-white text-primary">
                Save</button>
            </div>
          </div>

          <div className="panel panel-default panel-noborder tab-panel" style={{background: 'transparent'}}>
            <div className="panel-body p-none">
              <Tabs defaultActiveKey={0} animation={false}
                className="tabs-custom"
                onSelect={this.onSelectTab.bind(this)}
                id="tabs-device-incidents">
                {
                  this.props.tabs.map((tab, i) => (
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

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

DeviceEditWizard.defaultProps = {
  deviceType: '',

  extraParams: {},
  configParams: {},

  onSaved: null,
  onFinish: null,

  tabs: [{
    title: 'General',
    include: ['name', 'agentid', 'ipaddress', 'wanip', 'lanip', 'hostname', 'port', 'dbtype', 'sql', 'disabled', 'customimage', 'url']
  }, {
    title: 'Credentials',
    include: ['credentialid']
  }, {
    title: 'Info',
    include: ['notes']
  }, {
    title: 'Advanced',
    id: 'tab-devinfo-advanced',
    include: ['server_url', 'deviceid', 'devicetype', 'response', 'checkinterval', 'status', 'basicchecks', 'externalIP'],
    extra: [{
      name: 'id',
      title: 'DeviceId'
    }, {
      name: 'devicetype',
      title: 'DeviceType'
    }]
  }]
}

function mapStateToProps (state) {
  return {
    initialValues: state.dashboard.selectedDevice
  }
}

const actions = {

}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'deviceEditForm'
    // destroyOnUnmount: false,
    // validate
  })(DeviceEditWizard)
)

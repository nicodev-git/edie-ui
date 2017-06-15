import React from 'react'
import { assign, debounce } from 'lodash'
import { reduxForm, Form } from 'redux-form'

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

import ImageUploaderModal from 'components/settings/template/ImageUploaderModal'
import ContentPanel from './ContentPanel'

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

    props.closeTplImageModal('')

    this.fnSaveDeb = debounce(this.onRequestSave.bind(this), 2000)
  }

  componentWillReceiveProps (nextProps) {
    let elem = document.getElementById('submitButton')
    if (nextProps.dirty) {
      elem.style.backgroundColor = '#ffffff'
    } else {
      elem.style.backgroundColor = '#d1d1d1'
    }
  }

  onSelectTab () {

  }

  onRequestSave () {
    this.props.submit(this.props.handleSubmit(this.handleFormSubmit.bind(this)))
  }

  onChangeForm (e) {
    this.fnSaveDeb()
  }

  didSave (res) {
    if (!res) return
    const {onFinish} = this.props
    onFinish && onFinish(res)
  }

  handleFormSubmit (params) {
    const {currentDevice} = this.state
    const {initialValues, selectedTplImage} = this.props
    let elem = document.getElementById('submitButton')
    elem.style.backgroundColor = '#d1d1d1'
    assign(params, currentDevice.server.params)
    assign(params, this.props.extraParams)
    assign(params, {
      image: selectedTplImage ? selectedTplImage.uuid : initialValues['image']
    })
    console.log(params)
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
      <div>
        {items}
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
    return (
      <TextInput
        key={config.name}
        config={config}
        buildLabel={this.buildLabel.bind(this)}
        onChange={this.onChangeForm.bind(this)}
      />
    )
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

  buildTextArea (config) {
    return (<TextArea config={config}
      buildLabel={this.buildLabel.bind(this)}/>)
  }

  buildForm (config) {
    return null
  }
  renderTplImageModal () {
    if (!this.props.tplImageModalVisible) return null
    return (
      <ImageUploaderModal {...this.props} closeOnSelect/>
    )
  }
  render () {
    const { handleSubmit, tabs } = this.props
    return (
      <div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="tab-options">
            <div className="margin-md-right margin-md-top"
              style={{position: 'absolute', top: '40px', right: '20px'}}>
              <RaisedButton id="submitButton" type="submit" label="Save"/>
            </div>
          </div>

          <div className="panel panel-default panel-noborder tab-panel" style={{background: 'transparent'}}>
            <div className="panel-body p-none">
              <div className="row m-none">
                {
                  tabs.map((tab, i) => (
                    <ContentPanel key={i} title={tab.title} width={tab.width}>
                      {this.buildContent(tab, i)}
                    </ContentPanel>
                  ))
                }
              </div>
              {this.renderTplImageModal()}
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'deviceEditForm'
})(DeviceEditWizard)

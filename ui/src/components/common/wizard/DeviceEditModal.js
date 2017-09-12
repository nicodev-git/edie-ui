import React from 'react'

import { assign, findIndex } from 'lodash'
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
import DeviceEditModalView from './DeviceEditModalView'
import TagsView from './input/TagsView'
import CredPickerInput from './input/CredPicker'

import {CardPanel} from 'components/modal/parts'

import CredPicker from 'containers/settings/credentials/CredsPickerContainer'


export default class DeviceEditModal extends React.Component {
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

      credentialSelect: 'existing'
    }

    this.mapping = {
      'text': this.buildText.bind(this),
      'check': this.buildCheck.bind(this),
      'monitors': this.buildMonitors.bind(this),
      'paramlist': this.buildParamList.bind(this),
      'combo': this.buildCombo.bind(this),
      'row': this.buildRow.bind(this),
      'credpicker': this.buildCredPicker.bind(this)
    }
  }

  render () {
    return (
      <DeviceEditModalView
        {...this.props}
        header="Device"
      />
    )
  }
}

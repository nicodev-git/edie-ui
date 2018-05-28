import React from 'react'
import {IconButton} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'
import DeviceTplPicker from 'containers/shared/wizard/DeviceTplPickerContainer'
import { wizardConfig, getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'

import { showAlert } from 'components/common/Alert'

export default class Device extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceWizardConfig: {},
      deviceWizardVisible: false,
    }
  }
  onClickAddDevice () {
    this.props.showDeviceTplPicker(true)
  }
  onClickDeviceTpl (tpl) {
    // console.log(tpl)
    this.props.showDeviceTplPicker(false)


    const options = {
      title: tpl.name,
      type: getDeviceType(tpl.name),
      imgName: tpl.image,
      imageUrl: `/externalpictures?name=${tpl.image}`,
      x: 0,
      y: 0,
      width: 50,
      height: 50,

      tpl,
      monitors: tpl.monitors,
      templateName: tpl.name,
      workflowids: tpl.workflowids || []
    }

    this.showAddWizard(options, (id, name, data) => {

    }, () => {

    })
  }

  showAddWizard (options, callback, closeCallback) {
    if (wizardConfig[options.type] === null) {
      showAlert(`Unrecognized Type: ${options.type}`) // eslint-disable-line no-undef
      return
    }

    this.setState({
      deviceWizardConfig: {
        options, callback, closeCallback
      },
      deviceWizardVisible: true
    })
  }

  onFinishAddWizard (callback, res, params, url) {
    console.log(params)
    this.props.addDevice(params, url)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  renderDeviceWizard () {
    if (!this.state.deviceWizardVisible) return null

    const {options, callback, closeCallback} = this.state.deviceWizardConfig

    let extra = {
      mapid: null,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      image: options.imgName,
      templateName: options.templateName,
      workflowids: options.workflowids,
      tags: options.tpl.tags || []
    }

    const config = {
      mapid: null
    }

    return (
      <DeviceWizardContainer
        deviceType={options.type}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        monitors={options.monitors}
        extraParams={extra}
        configParams={config}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
      />
    )
  }

  renderTpl (tpl, i) {
    const {onClickMenuItem} = this.props
    return (
      <AppletCard
        key={tpl.id}
        color={colors[i % colors.length]}
        name={tpl.templateName}
        desc={tpl.name}
        img={`${extImageBaseUrl}${tpl.image}`}
        onClick={() => onClickMenuItem(tpl)}
      />
    )
  }
  renderAddMenu () {
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton onClick={this.onClickAddDevice.bind(this)}>
          <AddCircleIcon />
        </IconButton>
      </div>
    )
  }
  renderDeviceTplPicker () {
    if (!this.props.deviceTplPickerOpen) return null
    return (
      <DeviceTplPicker
        onClickItem={this.onClickDeviceTpl.bind(this)}
        onHide={() => this.props.showDeviceTplPicker(false)}
        exclude={['SHAPES', 'GROUPS']}
      />
    )
  }
  render() {
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
          {this.props.devices.map(this.renderTpl.bind(this))}
        </ul>
        {this.renderDeviceTplPicker()}
        {this.renderDeviceWizard()}
      </div>
    )
  }
}
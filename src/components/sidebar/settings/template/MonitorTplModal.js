import React from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'

import MonitorTplModalView from './MonitorTplModalView'
import { getCustomImageUrl, extImageBaseUrl } from 'shared/Global'
import TagPickerModal from 'containers/settings/tag/TagPickerModalContainer'
import CredTypePicker from 'containers/settings/credentials/CredTypePickerContainer'

class MonitorTplModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      basicMonitor: props.monitorTpl && props.monitorTpl.params ? (props.monitorTpl.params.basicMonitor || {}) : {}
    }
    this.getImageUrl = this.getImageUrl.bind(this)
    this.onClickChangeImage = this.onClickChangeImage.bind(this)
    console.log(props.selectedDeviceTpl)
  }

  onClickAddTag () {
    this.props.showMonitorTplTagModal(true)
  }
  onPickTag (tag) {
    const {monitorTplTags} = this.props
    this.props.updateMonitorTplTags([...monitorTplTags, tag.name])
  }
  onClickDeleteTag (index) {
    const {monitorTplTags} = this.props
    this.props.updateMonitorTplTags(monitorTplTags.filter((p, i) => i !== index))
  }

  handleFormSubmit (formProps) {
    const {
      monitorTpl, selectedTplImage, monitorTplTags, monitorTplCredTypes,
      selectedDeviceTpl, selectedDeviceMonitors
    } = this.props
    const tpl = assign({}, (monitorTpl || {}), formProps, {
      tags: monitorTplTags || [],
      credentialTypes: monitorTplCredTypes
    })
    if (selectedTplImage) tpl.image = selectedTplImage.uuid

    if (selectedDeviceTpl) {
      if (monitorTpl) {
        this.props.updateSelectedDeviceTplMonitors(
          selectedDeviceMonitors.map(p => p.uid === tpl.uid ? tpl : p)
        )
      } else {
        this.props.updateSelectedDeviceTplMonitors(
          [...selectedDeviceMonitors, tpl]
        )
      }
      this.props.closeMonitorTplModal()
    } else {
      if (monitorTpl) {
        this.props.updateMonitorTemplate(tpl)
      } else {
        this.props.addMonitorTemplate(tpl)
      }
    }

  }

  getImageUrl () {
    const {selectedTplImage, monitorTpl} = this.props
    let imgUrl = ''
    if (selectedTplImage) {
      imgUrl = getCustomImageUrl(selectedTplImage)
    } else if (monitorTpl && monitorTpl.image) {
      imgUrl = extImageBaseUrl + monitorTpl.image
    }
    return imgUrl
  }

  onClickClose () {
    this.props.closeMonitorTplModal()
  }

  onClickChangeImage () {
    this.props.openTplImageModal()
  }
  onClickAddCredType () {
    this.props.showMonitorTplCredTypesPicker(true)
  }
  onClickDeleteCredType (sel) {
    const {monitorTplCredTypes} = this.props
    this.props.updateMonitorTplCredTypes(monitorTplCredTypes.filter((p, i) => i !== sel))
  }
  onCloseCredTypePicker (sel) {
    this.props.showMonitorTplCredTypesPicker(false)
    if (sel) {
      const {monitorTplCredTypes} = this.props
      if (monitorTplCredTypes.indexOf(sel.name) >= 0) return
      this.props.updateMonitorTplCredTypes([...monitorTplCredTypes, sel.name])
    }
  }

  ////////////////////////////////////////////////////////////////////////

  onClickAddBasic () {
    const {basicMonitor} = this.state
    const type = prompt('Please input monitor type')
    if (!type) return
    if (basicMonitor[type]) return
    this.setState({
      basicMonitor: {
        ...basicMonitor,
        [type]: {}
      }
    })
  }

  onClickRemoveBasic (type) {
    const {basicMonitor} = this.state
    if (!window.confirm('Click OK to remove')) return
    const value = {...basicMonitor}
    delete value[type]
    this.setState({basicMonitor: value})
  }

  onClickAddBasicParam (type) {
    const name = prompt('Please input name')
    if (!name) return
    const value = prompt('Please type value')
    if (value === null) return
    const {basicMonitor} = this.state
    if (basicMonitor[type][name] !== undefined) return
    this.setState({
      basicMonitor: {
        ...basicMonitor,
        [type]: {
          ...basicMonitor[type],
          [name]: value
        }
      }
    })
  }

  onClickDeleteBasicParam (type, name) {
    if (!window.confirm('Click OK to remove')) return
    const {basicMonitor} = this.state
    const value = {...basicMonitor}
    delete value[type][name]
    this.setState({basicMonitor: value})
  }

  ////////////////////////////////////////////////////////////////////////

  renderTagsModal () {
    if (!this.props.monitorTplTagModalOpen) return null
    return (
      <TagPickerModal
        onPick={this.onPickTag.bind(this)}
        onClickClose={() => this.props.showMonitorTplTagModal(false)}/>
    )
  }
  renderCredTypePicker () {
    if (!this.props.monitorTplCredTypePickerOpen) return null
    return (
      <CredTypePicker onClose={this.onCloseCredTypePicker.bind(this)} />
    )
  }
  render () {
    const { handleSubmit, monitorTplTags, monitorTplCredTypes, allValues } = this.props
    let header = 'Monitor Template'
    let imgUrl = this.getImageUrl()
    return (
      <MonitorTplModalView
        show
        header={header}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={this.onClickClose.bind(this)}
        imgUrl={imgUrl}
        onChange={this.onClickChangeImage}

        allValues={allValues}

        tags={monitorTplTags}
        onClickAddTag={this.onClickAddTag.bind(this)}
        onClickDeleteTag={this.onClickDeleteTag.bind(this)}
        tagModal={this.renderTagsModal()}

        credTypeModal={this.renderCredTypePicker()}
        monitorTplCredTypes={monitorTplCredTypes}
        onClickAddCredType={this.onClickAddCredType.bind(this)}
        onClickDeleteCredType={this.onClickDeleteCredType.bind(this)}

        basicMonitor={this.state.basicMonitor}
        onClickAddBasic={this.onClickAddBasic.bind(this)}
        onClickRemoveBasic={this.onClickRemoveBasic.bind(this)}

        onClickAddBasicParam={this.onClickAddBasicParam.bind(this)}
        onClickDeleteBasicParam={this.onClickDeleteBasicParam.bind(this)}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.monitorTpl || {},
    allValues: getFormValues('monitorTplEdit')(state)
  })
)(reduxForm({form: 'monitorTplEdit'})(MonitorTplModal))

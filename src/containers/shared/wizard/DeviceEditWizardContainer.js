import React from 'react'
import DeviceEditWizard from '../../../components/shared/wizard/DeviceEditWizard'
import { connect } from 'react-redux'
import {
  openTplImageModal,
  closeTplImageModal,
  fetchImages,
  uploadImage
} from 'actions'

@connect(
  state => ({
    initialValues: state.dashboard.selectedDevice,

    tplImageModalVisible: state.settings.tplImageModalVisible,
    selectedTplImage: state.settings.selectedTplImage,

    images: state.dashboard.images
  }), {
    openTplImageModal,
    closeTplImageModal,
    fetchImages,
    uploadImage
  }
)
export default class DeviceEditWizardContainer extends React.Component {
  render () {
    return (
      <DeviceEditWizard {...this.props} />
    )
  }
}

DeviceEditWizard.defaultProps = {
  deviceType: '',

  extraParams: {},
  configParams: {},

  onSaved: null,
  onFinish: null,

  tabs: [{
    title: 'General',
    include: ['name', 'agentid', 'ipaddress', 'wanip', 'lanip', 'hostname', 'port', 'dbtype', 'sql', 'disabled', 'image', 'url']
  }, {
    title: 'Credentials',
    include: ['credentialid']
  }, {
    title: 'Info',
    include: ['info']
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

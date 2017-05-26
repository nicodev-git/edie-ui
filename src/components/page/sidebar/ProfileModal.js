import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import $ from 'jquery'
import { showAlert } from 'components/shared/Alert'
import { extImageBaseUrl } from 'shared/Global'
import { ProfileModalView } from '../../modal'

class ProfileModal extends Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      imgSrc: '',
      maps: []
    }
    this.closeModal = this.closeModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
    this.onChangeMap = this.onChangeMap.bind(this)
    this.renderMapOptions = this.renderMapOptions.bind(this)
  }

  componentWillMount () {
    this.props.fetchUserInfo()
  }

  closeModal (data) {
    this.props.closeProfileModal()
  }

  handleFormSubmit (values) {
    const {user} = this.props
    this.uploadUserImage(image => {
      const props = assign({}, user, values, {
        mapids: []// [this.refs.defaultmap.value]
      })
      if (image) props.image = image
      console.log(props)
      this.props.updateUserProfile(props)
    })
    this.onChangeMap(values.map)
  }

  uploadUserImage (cb) {
    let input = this.refs.file
    if (!input || !input.files || !input.files.length) return cb()
    let file = input.files[0]
    let formData = new FormData() // eslint-disable-line no-undef
    formData.append('file', file, input.value.split(/(\\|\/)/g).pop())
    $.ajax({ // eslint-disable-line no-undef
      url: '/upload',
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: (data, textStatus, jqXHR) => {
        const img = data.filename
        cb(img)
      },
      error: (jqXHR, textStatus, errorThrown) => {
        showAlert('Failed to upload.')
      }
    })
  }

  onChangeImage (e) {
    console.log('change image')
    const input = e.target
    if (input.files && input.files[0]) {
      let reader = new FileReader() // eslint-disable-line no-undef
      reader.onload = v => {
        this.setState({
          imgSrc: v.target.result
        })
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  onChangeMap (map) {
    this.setState({
      defaultmap: map
    })
  }

  renderMapOptions () {
    let maps = this.props.maps
    let options = maps.map(item => ({value: item.id, label: item.name}))
    return options
  }

  render () {
    let { user, handleSubmit } = this.props
    let imgSrc = this.state.imgSrc || (`${extImageBaseUrl}${user.image || 'unknown.png'}`)
    console.log(imgSrc)
    let mapOptions = this.renderMapOptions()
    let roleOptions = [
      {value: 'USER', label: 'User'},
      {value: 'ADMIN', label: 'Admin'}
    ]
    let defaultChecked = (user.enabled === true)
    let checkboxLabel = 'User Enabled'
    return (
      <ProfileModalView
        show
        onHide={this.closeModal}
        imgSrc={imgSrc}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        onChangeImage={this.onChangeImage}
        mapOptions={mapOptions}
        roleOptions={roleOptions}
        defaultChecked={defaultChecked}
        checkboxLabel={checkboxLabel}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.dashboard.userInfo
  })
)(reduxForm({
  form: 'userProfileForm'
})(ProfileModal))

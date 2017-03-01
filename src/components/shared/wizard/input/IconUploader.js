import React from 'react'
import { util } from '../WizardUtil'
import { InputField } from 'react-serial-forms'

import IconSelectModal from './IconSelectModal'
import { appendComponent, removeComponent } from '../../../../util/Component'

export default class IconUploader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      icons: [],
      currentIcon: {

      }
    }

    let config = props.config
    let values = props.values

    if (config.name && values[config.name] !== undefined) {
      let defaultValue = values[config.name]
      this.setState({
        currentIcon: {
          filename: defaultValue,
          url: defaultValue.startsWith('/') ? defaultValue : (`/externalpictures?name=${defaultValue}`)
        }
      })
    }
  }

  onClickChange () {
    appendComponent(
      <IconSelectModal selected={this.state.currentIcon} onClose={this.onCloseChangeModal.bind(this)}/>
    )
  }

  onCloseChangeModal (modal, selected) {
    removeComponent(modal)
    if (!selected) return
    this.setState({
      currentIcon: selected
    })
  }

  onClickItem (item, e) {
    let currentIcon = item
    this.setState({currentIcon})
  }

  onChangeFile (e) {
    let formData = new FormData() // eslint-disable-line no-undef
    let input = e.target

    let name = input.attributes['name'].value
    let filename = input.value.split(/(\\|\/)/g).pop()
    let file = input.files[0]

    formData.append(name, file, filename)
    formData.append('sid', this.props.sid)

    input.value = ''

    $.ajax({ // eslint-disable-line no-undef
      url: Api.upload.uploadImage, // eslint-disable-line no-undef
      type: 'POST',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,

      success: (data, textStatus, jqXHR) => {
        if (typeof data.error === 'undefined' && data.success) {
          let url = `/externalpictures?name=${data.info}`

          let icons = this.state.icons
          icons.push({
            url: url,
            filename: url
          })
          this.setState({
            icons: icons,
            currentIcon: icons[icons.length - 1]
          })

          this.refs.field.updateValue(url)
        } else {
          window.alert('Failed to upload.')
        }
      },
      error: (jqXHR, textStatus, errorThrown) => {
        window.alert('Failed to upload.')
      }
    })
  }

  render () {
    let config = this.props.config
    let label
    let width = util.calcWidth(config.width)

    if (config.label !== null) {
      if (config.label.type === 'place') {

      } else {
        label = this.props.buildLabel(config.label)
        width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
      }
    }

    let uploader = (
      <div className={`col-md-${width}`}>
        <img className="file-preview" src={this.state.currentIcon.url}/>
        <a href="javascript:;" style={{position: 'relative', cursor: 'pointer'}} onClick={this.onClickChange.bind(this)}>
          Change
        </a>
        <InputField type="hidden"
          value={this.state.currentIcon.filename}
          name={config.name}
          ref="field"/>
      </div>
    )

    return util.wrapInputs(label, uploader, config['useColumn'])
  }
}

IconUploader.defaultProps = {
  config: {},
  buildLabel: null,
  sid: ''
}

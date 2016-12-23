import React from 'react'
import {util} from '../WizardUtil'
import {InputField} from 'react-serial-forms'

import IconSelectModal from './IconSelectModal'
import {appendComponent, removeComponent}
    from '../../../../util/Component'

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
      this.state.currentIcon = {
        filename: defaultValue,
        url: defaultValue.startsWith('/') ? defaultValue : (`/externalpictures?name=${defaultValue}`)
      }
    }
  }

  componentWillMount () {
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

    // render2() {
    //     let config = this.props.config
    //     let values = this.props.values
    //
    //     let label, input
    //     let width = util.calcWidth(config.width);
    //
    //     if(config.label !== null) {
    //         if(config.label.type === 'place'){
    //
    //         } else {
    //             label = this.props.buildLabel(config.label)
    //             width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
    //         }
    //     }
    //
    //     let uploader = (
    //         <div className={"col-md-" + width}>
    //             <img className="file-preview" src={this.state.currentIcon.url}/>
    //             <ul className="dropdown-image">
    //                 <li className="dropdown">
    //                     <a href="#"><b className="caret"></b></a>
    //                     <ul className="dropdown-menu">
    //                         {this.state.icons.map(item => (
    //                             <li key={item.url} onClick={this.onClickItem.bind(this, item)}>
    //                                 <img src={item.url} />
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </li>
    //             </ul>
    //             <a href="javascript:;" style={{position: "relative", cursor: "pointer"}}>
    //                 Add
    //                 <input type="file" name="file"
    //                        onChange={this.onChangeFile.bind(this)}
    //                        style={{
    //                             position: "absolute",
    //                             top: 0,
    //                             left: 0,
    //                             right: 0,
    //                             bottom: 0,
    //                             margin: 0,
    //                             padding: 0,
    //                             fontSize: "20px",
    //                             cursor: "pointer",
    //                             opacity: 0,
    //                        }}
    //                 />
    //             </a>
    //
    //             <InputField type="hidden"
    //                         value={this.state.currentIcon.filename}
    //                         name={config.name}
    //                         ref="field"/>
    //         </div>
    //     )
    //
    //     return util.wrapInputs(label, uploader, config['useColumn'])
    // }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        // upload/uploadImage

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
    // let values = this.props.values // Never used

    let label
    // let input //  Never used
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

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

IconUploader.defaultProps = {
  config: {},
  buildLabel: null,
  sid: ''
}

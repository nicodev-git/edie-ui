import React from 'react'
import Modal from 'react-bootstrap-modal'

class IconSelectModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      icons: [],
      currentIcon: props.selected
    }
  }

  componentWillMount () {
    $.get(Api.devices.getIcons, { // eslint-disable-line no-undef

    }).done(res => {
      if (!res.length) return

      let icons = res.map(item => {
        return {
          url: `/externalpictures?name=${item.filename}`,
          filename: item.filename
        }
      })
      this.setState({
        icons: icons
      })
    })
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.closeModal()
  }

  onClickSave () {
    this.closeModal(this.state.currentIcon)
  }

  closeModal (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    formData.append('thumb', 'true')

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
          const filename = data.info
          let url = `/externalpictures?name=${filename}`

          let icons = this.state.icons
          icons.push({
            url: url,
            filename: url
          })
          this.setState({
            icons: icons,
            currentIcon: icons[icons.length - 1]
          })

                    // ///////////////////////////////////

          $.get(Api.devices.addIcon, { filename }) // eslint-disable-line no-undef
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
    const {currentIcon} = this.state

    return (
      <Modal show={this.state.open}
             onHide={this.onHide.bind(this)}
             aria-labelledby="ModalHeader"
             className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Change Image
          </h4>
        </div>
        <div className="modal-body bootstrap-dialog-message">

          <div className="dropdown-image">
            {this.state.icons.map(item => (
              <div key={item.url}
                   className={currentIcon.url === item.url ? 'active' : ''}
                   onClick={this.onClickItem.bind(this, item)}>
                <img src={item.url}/>
              </div>
            ))}
          </div>

          <div className="text-right mb-none">

            <a href="javascript:;" style={{position: 'relative', cursor: 'pointer'}} className="pull-left">
              Upload File
              <input type="file" name="file"
                onChange={this.onChangeFile.bind(this)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: 0,
                  padding: 0,
                  fontSize: '20px',
                  cursor: 'pointer',
                  opacity: 0
                }}
              />
            </a>

            <a href="javascript:;" className="btn btn-default btn-sm"
               onClick={this.onClickClose.bind(this)}>Cancel</a>
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-left"
               onClick={this.onClickSave.bind(this)}>OK</a>
          </div>
        </div>
      </Modal>
    )
  }
}

IconSelectModal.defaultProps = {
  selected: {}
}

export default IconSelectModal

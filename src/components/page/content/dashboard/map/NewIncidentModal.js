import React from 'react'
import { showAlert } from '../../../../shared/Alert'
import { NewIncidentModalView } from '../../../../modal'

export default class NewIncidentModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      img: '/images/adminlogin.png'
    }
  }

  onHide () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {
    const refs = this.refs
    const input = refs.file
    const name = refs.name.value
    const desc = refs.desc.value
    const severity = refs.severity.value

    if (!name) return showAlert('Please input name.')
    if (input.files.length) {
      let img = input.files[0]

      let formData = new window.FormData()
      formData.append('file', img, img.name)
    } else {
      this.addIncident(name, desc, severity, '')
    }
  }

  addIncident (name, desc, severity, img) {

  }

    // /////////////////////////

  onChangeFile (e) {
    const img = window.URL.createObjectURL(e.target.files[0])
    this.setState({ img })
  }

  render () {
    return (
      <NewIncidentModalView
        show
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onChange={this.onChangeFile.bind(this)}
        onSave={this.onClickSave.bind(this)}
        imgSrc={this.state.img}
      />
    )
  }
}

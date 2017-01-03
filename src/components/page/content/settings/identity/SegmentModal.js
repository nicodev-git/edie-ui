import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import countries from 'country-data/data/countries'

import { showAlert } from '../../../../shared/Alert'
import { ROOT_URL } from '../../../../../actions/config'

export default class SegmentModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.setState({ open: false }, () => {
      this.props.onClose && this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.closeModal()
  }

  onClickSave () {
    const refs = this.refs
    let data = {
      name: refs.name.value,
      startip: refs.startip.value,
      endip: refs.endip.value,
      location: refs.location.value,
      country: refs.country.value
    }

    if (!data.name) {
      showAlert('Please fill the form.')
      return
    }

    const { segment } = this.props
    if (segment) data.id = segment.id

    const url = segment ? Api.admin.editSegment : Api.admin.addSegment // eslint-disable-line no-undef
    $.get(`${ROOT_URL}${url}`, data).done(res => { // eslint-disable-line no-undef
      if (!res.success) return showAlert('Save failed!')
      this.closeModal(res.object)
    }).fail(() => {
      showAlert('Save failed!')
    })
  }

  render () {
    const { segment } = this.props

    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Segment
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">

          <div className="row margin-md-bottom">
            <label className="control-label col-md-3">Name</label>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="name" defaultValue={segment ? segment.name : ''}/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="control-label col-md-3">Range</label>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Start Address" ref="startip"
                defaultValue={segment ? segment.startip : ''}/>
            </div>
            <div className="col-md-5">
              <input type="text" className="form-control" placeholder="End Address" ref="endip"
                defaultValue={segment ? segment.endip : ''}/>
            </div>
          </div>

          <div className="row form-group">
            <label className="control-label col-md-3">Location</label>
            <div className="col-md-9">
              <select className="form-control" ref="location" defaultValue={segment ? segment.location : ''}>
                <option>LAN</option>
                <option>DMZ</option>
                <option>Branch</option>
                <option>Internet</option>
                <option>External</option>
              </select>
            </div>
          </div>

          <div className="row margin-lg-bottom">
            <label className="control-label col-md-3">Country</label>
            <div className="col-md-9">
              <select className="form-control" ref="country"
                defaultValue={segment ? segment.country : ''}>
                {
                  countries.map(item =>
                    <option key={item.alpha2} value={item.name}>
                      {item.name}
                    </option>
                  )
                }
              </select>
            </div>
          </div>

          <div className="text-center">
            <Button className="btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>Save</Button>
            <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

SegmentModal.defaultProps = {
  segment: null
}

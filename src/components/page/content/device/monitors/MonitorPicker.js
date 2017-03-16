import React from 'react'
import Modal from 'react-bootstrap-modal'
import { extImageBaseUrl } from 'shared/Global'

export default class MonitorPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchMonitorTemplates()
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.closeDeviceMonitorPicker()
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickItem (item) {
    if (!this.props.onClickItem) return
    if (this.props.onClickItem(item)) {
      this.onClickClose()
    }
  }

  render () {
    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Choose Monitor
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="monitor-types text-center">
            <ul>
              {
                this.props.monitorTemplates.map(item =>
                  <li key={item.id}>
                    <a href="javascript:;" onClick={this.onClickItem.bind(this, item)}>
                      <img src={`${extImageBaseUrl}${item.image}`}/>
                      <span>{item.name}</span>
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </Modal>
    )
  }
}

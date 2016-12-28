import React from 'react'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'

import { closeDeviceMonitorPicker, fetchMonitorTemplates } from '../../../../../actions'

class MonitorPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

        // this.items = [
        //     {title: 'Ping Monitor', img: 'port.png', type: 'monitor-ping'},
        //     {title: 'Http Monitor', img: 'port.png', type: 'monitor-http'},
        //     {title: 'Log Monitor', img: 'log-file.png', type: 'monitor-log-file'},
        //     {title: 'File Monitor', img: 'file-monitor.png', type: 'monitor-file'},
        //     {title: 'EventLog Monitor', img: 'port.png', type: 'monitor-eventlog'},
        //     {title: 'Port Monitor', img: 'port.png', type: 'monitor-port'},
        //     {title: 'Security Monitor', img: 'sql.png', type: 'monitor-security'},
        //     {title: 'SQL Query', img: 'sql.png', type: 'monitor-sql'},
        //     {title: 'Web Service', img: 'webservice.png', type: 'monitor-web'},
        //     {title: 'DB Table Monitor', img: 'sql.png', type: 'monitor-db-table'},
        // ]
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
                      <img src={`/images/${item.image}`}/>
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

MonitorPicker.defaultProps = {
  onClose: null,
  onClickItem: null
}

function mapStateToProps (state) {
  return {
    monitorTemplates: state.settings.monitorTemplates
  }
}

const actions = {
  fetchMonitorTemplates,
  closeDeviceMonitorPicker
}

export default connect(mapStateToProps, actions)(MonitorPicker)

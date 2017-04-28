import React from 'react'
import Modal from 'react-bootstrap-modal'
import TimeAgo from 'react-timeago'

import InfiniteTable from 'components/shared/InfiniteTable'
import { ROOT_URL } from 'actions/config'

export default class ProcessModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      runTimes: [],
      children: []
    }

    this.cells = [{
      'displayName': 'RemoteAddress',
      'columnName': 'remoteaddress'
    }, {
      'displayName': 'Port',
      'columnName': 'remoteports'
    }, {
      'displayName': 'State',
      'columnName': 'state',
      'cssClassName': 'width-180'
    }]
  }

  componentWillMount () {
    $.get(`${ROOT_URL}${Api.incidents.getProcessRunTimes}`, { // eslint-disable-line no-undef
      processId: this.props.process.id
    }).done(res => {
      this.setState({
        runTimes: res
      })
    })

    $.get(`${ROOT_URL}${Api.incidents.getProcessChildren}`, { // eslint-disable-line no-undef
      processId: this.props.process.id
    }).done(res => {
      this.setState({
        children: res
      })
    })
  }

  onHide () {
    this.closeModal()
  }

  closeModal (data) {
    this.setState({open: false}, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.closeModal()
  }

  onChildDblClick (item) {
    this.setState({open: false}, () => {
      this.props.onClose &&
            this.props.onClose(this)

      const {onChildClicked} = this.props
      onChildClicked && onChildClicked(item)
    })
  }

  render () {
    const {process} = this.props
    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Process: {process.name}
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close"
              onClick={this.onClickClose.bind(this)}>×
            </button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message form-inline">
          <div className="row">
            <label className="col-md-2">ProcessID:</label>
            <label className="col-md-10">{process.processid}</label>
          </div>

          <InfiniteTable
            url="/incidentstable/getProcessConnectionDT"
            params={{processId: this.props.process.id}}
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            noDataMessage="None"
            bodyHeight={200}
          />

          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <label className="col-md-12">Last Run Times</label>
              </div>
              <div style={{maxHeight: '200px', overflow: 'auto'}}>
                <table>
                  <tbody>{
                    this.state.runTimes.map((item, i) =>
                      <tr key={i}>
                        <td><TimeAgo date={item}/></td>
                      </tr>)
                  }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <label className="col-md-6">Children</label>
                <label className="col-md-6">PID</label>
              </div>
              <div style={{maxHeight: '200px', overflow: 'auto'}}>
                <table>
                  <tbody>{
                    this.state.children.map(item =>
                      <tr key={item.id} onDoubleClick={this.onChildDblClick.bind(this, item)}>
                        <td width="200">{item.name}</td>
                        <td>{item.processid}</td>
                      </tr>)
                  }</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

ProcessModal.defaultProps = {
  onClose: null,
  process: {},
  onChildClicked: null
}

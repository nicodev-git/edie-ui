import React from 'react'
import Modal from 'react-bootstrap-modal'
import { findIndex } from 'lodash'
import InfiniteTable from '../../../../shared/InfiniteTable'

export default class AttackersModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }

    let { countries } = this.props

    this.cells = [{
      'displayName': 'Source IP',
      'columnName': 'ipaddress',
      'customComponent': (props) => {
        let row = props.rowData
        let val = props.data
        let index = findIndex(countries, {name: row.ipcountry})
        if (index < 0) return <span>{val}</span>

        let isoCode = (countries[index].alpha2 || '').toLowerCase()
        let flag
        if (!isoCode) isoCode = '_European Union'
        if (isoCode) flag = <img src={`/images/flags/32/${isoCode}.png`} title={row.ipcountry}/>

        return <span>{flag}&nbsp;{val}</span>
      }
    }, {
      'displayName': '# Of Attacks',
      'columnName': 'result'
    }, {
      'displayName': 'Attack Duration',
      'columnName': 'min',
      'customComponent': (props) => {
        let row = props.rowData
        let val = props.data
        let from = this.dateFormatter2(val)
        let to = this.dateFormatter(row.max)
        return <span>{`${from} - ${to}`}</span>
      }
    }, {
      'displayName': 'Attack Risk',
      'columnName': 'incidentseverity',
      'cssClassName': 'text-center'
    }, {
      'displayName': 'Attacked Systems',
      'columnName': 'devicename'
    }]
  }

  renderTable () {

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

  dateFormatter (date) {
    let serverTZ = '+0300'
    let diff = (new Date() - new Date(`${date} ${serverTZ}`)) / 1000
    diff = diff.toFixed(0)
    if (diff < 1) diff = 1
    let label = ''

    if (diff < 60) {
      label = 'Attacking Now'
    } else if (diff < 3600) {
      diff = parseInt(diff / 60)
      if (diff === 1) { label = `${diff} minute ago` } else {
        label = `${diff} minutes ago`
      }
    } else {
      diff = parseInt(diff / 3600)
      if (diff === 1) {
        label = `${diff} hour ago`
      } else {
        label = `${diff} hours ago`
      }
    }

    return label
  }

  dateFormatter2 (date) {
    let serverTZ = '+0300'
    let diff = (new Date() - new Date(`${date} ${serverTZ}`)) / 1000
    diff = diff.toFixed(0)
    if (diff < 1) diff = 1
    let label = ''

    if (diff < 60) {
      label = 'Attacking Now'
    } else if (diff < 3600) {
      diff = parseInt(diff / 60)
      if (diff === 1) {
        label = `${diff} minute ago`
      } else {
        label = `${diff} minutes ago`
      }
    } else {
      diff = parseInt(diff / 3600)
      if (diff === 1) {
        label = `${diff} hour ago`
      } else {
        label = `${diff} hours ago`
      }
    }

    return label
  }

  render () {
    let { ROOT_URL } = this.props
    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-md">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Attackers Today
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <InfiniteTable
            url={`${ROOT_URL}/bi/getAllAttackers`}
            params={this.state.params}
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'ipaddress'}}
            bodyHeight={500}
            selectable
          />
        </div>
      </Modal>
    )
  }
}

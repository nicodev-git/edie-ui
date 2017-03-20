import React from 'react'
import { findIndex } from 'lodash'
import { SmallModalTable } from '../../../../modal'

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
      'cssClassName': 'width-80',
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
      'columnName': 'result',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'Attack Duration',
      'columnName': 'min',
      'customComponent': (props) => {
        let row = props.rowData
        let val = props.data
        let from = this.dateFormatter(val)
        let to = this.dateFormatter(row.max)
        return <span>{`${from} - ${to}`}</span>
      }
    }, {
      'displayName': 'Attack Risk',
      'columnName': 'incidentseverity',
      'cssClassName': 'text-center'
    }, {
      'displayName': 'Attacked Systems',
      'columnName': 'devicename',
      'cssClassName': 'width-140'
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

  render () {
    return (
      <SmallModalTable
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        params={this.state.params}
        cells={this.cells}
        header="Attackers Today"
        url="/bi/getAllAttackers"
        row={{'key': 'ipaddress'}}
        height={500}
      />
    )
  }
}

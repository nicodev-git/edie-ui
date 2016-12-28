import React from 'react'
import { BootstrapTable } from 'react-bootstrap-table'
import { ROOT_URL } from '../../actions/config'

export default class DataTable extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      activePage: 1,
      draw: 1,
      data: [],
      selectedRow: null
    }
  }

  componentWillMount () {
    this.loadPage()
  }

  render () {
    return (
            <BootstrapTable {...this.props} data={this.state.data} ref="table">
                {this.props.children}
            </BootstrapTable>
    )
  }

  getSelectedRow (keyName = 'id') {
    let rows = this.getSelectedRows(keyName)

    if (rows.length) return rows[0]

    return null
  }

  getSelectedRows (keyName = 'id') {
    if (!this.refs.table) return []
    let keys = this.refs.table.state.selectedRowKeys

    let rows = keys.map(key => {
      let found = null
      this.state.data.forEach(row => {
        if (row[keyName] === key) {
          found = row
          return false
        }
      })

      return found
    })

    return rows
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadPage (page) {
    if (!page) page = this.state.activePage

    if (!this.props.url) {
      console.log('No url for datatable api.')
      return
    }

    $.get(`${ROOT_URL}${this.props.url}`, {
      draw: this.state.draw,
      start: (page - 1) * this.props.pageLength,
      length: this.props.pageLength
    }).done(res => {
      this.setState({
        data: res.data,
        pages: parseInt(res.recordsTotal / this.props.pageLength + 1)
      })
    }).fail(() => {
      console.log('Failed to load datatable.')
    })

    this.setState({
      draw: this.state.draw + 1
    })
  }
}

DataTable.defaultProps = {
  url: '',
  pageLength: 10
}

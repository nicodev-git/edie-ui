import React from 'react'
import {Dialog} from 'material-ui'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {renderEntity} from 'components/common/CellRenderers'

export default class IncidentEventsModal extends React.Component {
  renderTable () {
    const {events} = this.props.incident
    return (
      <table className="table table-hover dataTable">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Description</th>
            <th>Rawdata</th>
            <th>Parsed Json</th>
          </tr>
        </thead>
        <tbody>{
          (events || []).map((e, i) =>
          <tr key={i}>
            <td className="nowrap">{moment(e.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>{e.description}</td>
            <td>{e.rawdata}</td>
            <td>{renderEntity(e.dataobj)}</td>
          </tr>)
        }</tbody>
      </table>
    )
  }

  onClickClose () {
    this.props.onClose &&
        this.props.onClose(this)
  }

  render () {
    return (
      <MuiThemeProvider>
        <Dialog open title="Incident Events" onRequestClose={this.onClickClose.bind(this)}>
          <div style={{height: '600px', overflow: 'auto'}}>
            {this.renderTable()}
          </div>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

IncidentEventsModal.defaultProps = {
  incident: null,
  onClose: null
}

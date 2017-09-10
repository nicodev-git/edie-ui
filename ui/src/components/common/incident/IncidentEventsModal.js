import React from 'react'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Chip} from 'material-ui'

import {Modal, CardPanel} from 'components/modal/parts'
import {renderEntity} from 'components/common/CellRenderers'
import {chipStyles} from 'style/common/materialStyles'

export default class IncidentEventsModal extends React.Component {
  findLogLines () {
    const {events} = this.props.incident
    const found = events.filter(p => p.monitortype === 'logfile')
    return found
  }
  renderTable () {
    const {events} = this.props.incident
    // if (events) {
    //   return events.map(p =>
    //     <div key={p.id}>
    //       {p.description}
    //     </div>
    //   )
    // }
    const logEvents = this.findLogLines()
    if (logEvents.length) {
      return logEvents.map(p =>
        <div style={chipStyles.wrapper}>
          {<div className="inline-block flex-1">{p.dataobj ? p.dataobj.line : ''}</div>}
          {p.dataobj.file && <Chip style={chipStyles.smallChip} labelStyle={chipStyles.smallLabel}>{p.dataobj.file}</Chip>}
        </div>
      )
    }

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
        <Modal title="Incident Events" onRequestClose={this.onClickClose.bind(this)}>
          <CardPanel>
            <div style={{height: '600px', overflow: 'auto'}}>
              {this.renderTable()}
            </div>
          </CardPanel>
        </Modal>
      </MuiThemeProvider>
    )
  }
}

IncidentEventsModal.defaultProps = {
  incident: null,
  onClose: null
}

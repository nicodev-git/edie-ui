import React from 'react'
import {Form, Field} from 'redux-form'
import {CSVLink} from 'react-csv'
import {Card, IconButton} from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/FileDownload'

import {ModalFull, CardPanel} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

const inputStyle = {
  'verticalAlign': 'middle',
  'border': 'none',
  'display': 'inline-block',
  'height': '34px',
  'paddingLeft': '16px',
  'fontSize': '16px',
  'width': '100%'
}

const FormInput = ({input, label, ...custom}) => (
  <input
    {...input}
    placeholder={label}
    autoComplete="off"
    style={inputStyle}
  />
)

export default class ServerCmdModalView extends React.Component {
  getData () {
    const data = []
    const {results, devices, deviceData} = this.props

    data.push(['Device', 'IP', 'OS', 'Result'])
    devices.forEach(p => {
      const r = (results[p.id] || '').replace(/\r?\n/gi, ' ')

      const row = []
      row.push(p.name)
      row.push((deviceData[p.id] || {}).ip || '')
      row.push((deviceData[p.id] || {}).os || '')
      row.push(r)
      data.push(row)
    })

    return data
  }
  renderTools () {
    return (
      <CSVLink data={this.getData()} filename="data.csv">
        <IconButton><DownloadIcon/></IconButton>
      </CSVLink>
    )
  }

  render () {
    const {onHide, onSubmit, loading, devices, results, deviceData} = this.props
    return (
      <ModalFull title="Command" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <Card className="margin-md-top">
            <Field name="cmd" component={FormInput} label="Command" style={{width: '100%'}}/>
          </Card>

          <CardPanel title="Command" tools={this.renderTools()}>
            <div style={{maxHeight: 500, overflow: 'auto'}}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th>IP</th>
                    <th>OS</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                {devices.map(p =>
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{(deviceData[p.id] || {}).ip || ''}</td>
                    <td>{(deviceData[p.id] || {}).os || ''}</td>
                    <td>{results[p.id] || ''}</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </CardPanel>
        </Form>

        {loading && <RefreshOverlay/>}
      </ModalFull>
    )
  }
}

import React from 'react'
import {Form, Field} from 'redux-form'
import {CSVLink} from 'react-csv'
import {Card} from 'material-ui'

import {Modal, CardPanel} from 'components/modal/parts'
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
    {...custom}
    placeholder={label}
    autoComplete="off"
    style={inputStyle}
  />
)

export default class ServerCmdModalView extends React.Component {
  getData () {
    const data = []
    const {results, devices} = this.props

    devices.forEach(p => {
      const row = []
      row.push(p.name)
      row.push(results[p.id] || '')
      data.push(row)
    })

    return data
  }
  render () {
    const {onHide, onSubmit, loading, devices, results} = this.props
    return (
      <Modal title="Command" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <Card className="margin-md-top">
            <Field name="cmd" component={FormInput} label="Command" style={{width: '100%'}}/>
          </Card>

          <CardPanel title="Command">
            <CSVLink data={this.getData()} filename="data.csv">CSV</CSVLink>

            <div style={{maxHeight: 350, overflow: 'auto'}}>
              <table className="table">
                <thead>
                <tr>
                  <th>Device</th>
                  <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {devices.map(p =>
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{results[p.id] || ''}</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </CardPanel>
        </Form>

        {loading && <RefreshOverlay/>}
      </Modal>
    )
  }
}

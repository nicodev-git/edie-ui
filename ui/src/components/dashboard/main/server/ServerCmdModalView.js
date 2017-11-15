import React from 'react'
import {Form, Field} from 'redux-form'

import {Modal, CardPanel, FormInput} from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class ServerCmdModalView extends React.Component {
  render () {
    const {onHide, onSubmit, loading, devices, results} = this.props
    return (
      <Modal title="Command" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Command">
            <Field name="cmd" component={FormInput} hintText="Command"/>

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

import React from 'react'
import {Form, Field} from 'redux-form'
import {Checkbox} from 'material-ui'

import {Modal, CardPanel, SubmitBlock, FormCheckbox} from 'components/modal/parts'

export default class EditConfigModalView extends React.Component {
  render () {
    const {onHide, onSubmit, devices, getChecked, onCheckChange} = this.props
    return (
      <Modal title="Config" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Config">
            <Field name="hideDuplicate" component={FormCheckbox} label="Hide Duplicates"/>

            <div style={{maxHeight: 300, overflow: 'auto'}} className="margin-md-top">
              <table>
                <thead>
                  <tr><th>Device</th></tr>
                </thead>
                <tbody>
                {devices.map(p =>
                  <tr key={p.id}>
                    <td>
                      <Checkbox label={p.name} checked={getChecked(p)} onCheck={(e, value) => onCheckChange(p, e, value)}/>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </CardPanel>

          <SubmitBlock name="Save"/>
        </Form>
      </Modal>
    )
  }
}

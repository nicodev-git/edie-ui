import React from 'react'
import {Form, Field} from 'redux-form'
import {Checkbox} from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'

import {Modal, CardPanel, SubmitBlock, FormCheckbox} from 'components/modal/parts'
import {isWindowsDevice} from 'shared/Global'

export default class EditConfigModalView extends React.Component {
  render () {
    const {onHide, onSubmit, devices, getChecked, onCheckChange} = this.props
    return (
      <Modal title="Config" onRequestClose={onHide}>
        <Form onSubmit={onSubmit}>
          <CardPanel title="Config">
            <Field name="hideDuplicate" component={FormCheckbox} label="Hide Duplicates"/>
          </CardPanel>

          <CardPanel title="Devices">
            <div style={{maxHeight: 300, overflow: 'auto'}} className="margin-md-top">
              <table className="table table-hover">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>OS</th>
                  <th>IP</th>
                </tr>
                </thead>
                <tbody>
                {devices.map(p =>
                  <tr key={p.id}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox checked={getChecked(p)} onChange={(e, value) => onCheckChange(p, e, value)}/>
                        }
                        label={p.name}
                      />
                    </td>
                    <td>{isWindowsDevice(p) ? 'Windows' : 'Linux'}</td>
                    <td>{p.wanip || p.lanip}</td>
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

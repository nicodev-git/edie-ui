import React from 'react'
import {Field} from 'redux-form'
import { FormCheckbox, FormSelect } from 'components/modal/parts'

const monitorTypes = 'cpu disk memory network'.split(' ')
const durations = '1 2 3 4 5 6 7 8 9 10 11 12'.split(' ').map(p => ({label: p, value: p}))
const durationUnits = 'days months years'.split(' ').map(p => ({label: p, value: p}))
export default class BasicMonitorTable extends React.Component {
  render () {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {monitorTypes.map((monitorType, i) =>
            <tr key={i}>
              <td>{monitorType}</td>
              <td>
                <Field name={`params.basicMonitor.${monitorType}.removeEnabled`} component={FormCheckbox} label="Remove events"/>
                <Field name={`params.basicMonitor.${monitorType}.duration`} component={FormSelect} options={durations} style={{width: 80}}/>
                <Field name={`params.basicMonitor.${monitorType}.durationUnit`} component={FormSelect} options={durationUnits} className="margin-sm-left"/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
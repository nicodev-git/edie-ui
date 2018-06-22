import React from 'react'
import { FormCheckbox, FormInput } from 'components/modal/parts'

const monitorTypes = 'cpu disk memory network'.split(' ')

export default class BasicMonitorTable extends React.Component {
  render () {
    const {config} = this.props
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
                <FormCheckbox name={`params.basicMonitor.${monitorType}.removeEnabled`}/>
                <FormInput name={`params.basicMonitor.${monitorType}.name`}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
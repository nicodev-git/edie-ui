import React from 'react'
import {Dialog} from 'material-ui'
import { CloseButton } from 'components/modal/parts'

export default class IrrelDevicesModalView extends React.Component {
  renderItems () {
    const {irrelDevices} = this.props
    return irrelDevices.map(d =>
      <tr key={d}>
        <td>{d}</td>
      </tr>
    )
  }
  render () {
    const {onHide} = this.props
    return (
      <Dialog open title="Not Relevant Devices">
        <div style={{height: '500px', overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {this.renderItems()}
            </tbody>
          </table>
        </div>
        <CloseButton onClose={onHide} />
      </Dialog>
    )
  }
}

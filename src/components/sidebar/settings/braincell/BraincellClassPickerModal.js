import React from 'react'
import {Chip} from '@material-ui/core'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class BraincellClassPickerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const {cells, onClose, onPick} = this.props
    return (
      <Modal title="Tags" onRequestClose={onClose}>
        <CardPanel title="Tags">
          <div style={{maxHeight: 600, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {cells.map((t, i) =>
                  <tr key={t.id}>
                    <td>{t.name}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )

  }
}

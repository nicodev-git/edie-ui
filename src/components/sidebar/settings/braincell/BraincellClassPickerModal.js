import React from 'react'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class BraincellClassPickerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selIndex: -1
    }
  }

  onClickRow (selIndex) {
    this.setState({selIndex})
    this.props.onPick(this.props.cells[selIndex])
  }

  render() {
    const {cells, onClose} = this.props
    const {selIndex} = this.state

    return (
      <Modal title="Tags" onRequestClose={onClose}>
        <CardPanel title="Tags">
          <div style={{maxHeight: 600, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                </tr>
              </thead>
              <tbody>
                {cells.map((t, i) =>
                  <tr key={t.id} className={i === selIndex ? 'selected' : ''}
                    onClick={() => this.onClickRow(i)}>
                    <td>{t.name}</td>
                    <td>{t.key}</td>
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

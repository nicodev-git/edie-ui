import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class WorkflowPickerModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selIndex: -1
    }
  }

  onClickRow (selIndex) {
    this.setState({selIndex})
    this.props.onPick(this.props.workflows[selIndex])
  }

  renderTools () {
    const {onClickAdd} = this.props
    if (!onClickAdd) return null
    return (
      <AddIcon className="link" onClick={onClickAdd}/>
    )
  }

  render() {
    const {workflows, onClose} = this.props
    const {selIndex} = this.state

    return (
      <Modal title="Workflow" onRequestClose={onClose}>
        <CardPanel title="Workflow" tools={this.renderTools()}>
          <div style={{maxHeight: 600, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              {workflows.map((t, i) =>
                <tr key={t.id} className={i === selIndex ? 'selected' : ''}
                    onClick={() => this.onClickRow(i)}>
                  <td>{t.name}</td>
                  <td>{t.description}</td>
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

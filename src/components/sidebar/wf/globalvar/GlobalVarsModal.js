import React from 'react'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class GlobalVarsModal extends React.Component {
  componentDidMount () {
    this.props.fetchGlobalVars()
  }
  renderContents () {
    const {globalVars} = this.props
    return (
      <div style={{overflow: 'auto', maxHeight: 500}}>
        <table className="table">
          <thead>
          <tr>
            <th>UUID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {globalVars.map(p =>
            <tr key={p.id}>
              <td className="width-280">{p.id}</td>
              <td>{p.name}</td>
              <td>{p.value}</td>
            </tr>
          )}
          </tbody>

        </table>
      </div>
    )
  }

  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Global Vars" onRequestClose={onClickClose}>
        <CardPanel title="Global Vars">
          {this.renderContents()}
        </CardPanel>
        {this.props.children}
      </Modal>
    )
  }
}

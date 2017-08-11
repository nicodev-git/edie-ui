import React from 'react'
import { TwoButtonsBlockCustom } from 'components/modal/parts'

export default class BoardListModalView extends React.Component {
  render () {
    const {onHide, gaugeBoards} = this.props
    return (
      <Dialog open title="Dashboards" onRequestClose={onHide}>
        <div style={{maxHeight: 300, overflow: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {gaugeBoards.map(p =>
              <tr><td>{p.name}</td></tr>
            )}
            </tbody>
          </table>
        </div>
        <TwoButtonsBlockCustom name1="OK" action1={onHide}/>
      </Dialog>
    )
  }
}

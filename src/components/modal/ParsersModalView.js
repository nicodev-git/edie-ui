import React, { Component } from 'react'
import {Dialog} from 'material-ui'
import { TwoButtonsBlock } from 'components/modal/parts'

export default class ParsersModalView extends Component {
  render () {
    const {onHide, data, selectedIndex, onClick, onSave} = this.props
    return (
      <Dialog open title="Parsers">
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Parser</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, i) =>
              <tr key={i}
                className={selectedIndex === i ? 'selected' : ''}
                onClick={onClick.bind(this, i)}>
                <td>{item}</td>
              </tr>
            )
          }
          </tbody>
        </table>
        <TwoButtonsBlock onSave={onSave} onClose={onHide}/>
      </Dialog>
    )
  }
}

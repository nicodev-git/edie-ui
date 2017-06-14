import React from 'react'
import {Dialog, FlatButton} from 'material-ui'

import {TwoButtonsBlockCustom} from './parts'

export default class TagPickerModalView extends React.Component {
  render () {
    const {tags, selectedTag, onClickClose, onClickOK, onSelectTag, onClickAdd} = this.props
    return (
      <Dialog open title="Tags">
        <div>
          <FlatButton label="Add" onTouchTap={onClickAdd}/>
        </div>
        <div style={{maxHeight: '400px', overflow: 'auto'}}>
          <table className="table table-hover">
            <tbody>
            {
              tags.map((w, i) =>
                <tr
                  key={i}
                  onClick={() => onSelectTag(w)}
                  className={selectedTag && selectedTag.id === w.id ? 'selected' : ''}>
                  <td>{w.name}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
        <TwoButtonsBlockCustom name1="Cancel" action1={onClickClose} name2="OK" action2={onClickOK}/>
      </Dialog>
    )
  }
}

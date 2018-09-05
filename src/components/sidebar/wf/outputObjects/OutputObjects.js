import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import FloatingMenu from 'components/common/floating/FloatingMenu'
import {showPrompt} from 'components/common/Alert'

export default class OutputObjects extends React.Component {
  componentWillMount () {
    this.props.fetchOutputObjects()
  }
  onClickAdd () {
    showPrompt('Please type name', '', name => {
      if (!name) return
      this.props.addOutputObject({
        name
      })
    })
  }

  onClickEdit (object) {
    const name = prompt('Please type name', object.name)
    if (!name) return
    this.props.updateOutputObject({
      ...object,
      name
    })
  }

  onClickDelete (object) {
    if (!window.confirm('Click OK to remove')) return
    this.props.removeOutputObject(object)
  }

  renderTable () {
    const objects = this.props.outputObjects
    return (
      <div className="flex-1" style={{overflow: 'auto', padding: 10}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {objects.map(m =>
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>
                <EditIcon onClick={this.onClickEdit.bind(this, m)}/>
                <DeleteIcon onClick={this.onClickDelete.bind(this, m)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Output Objects">
          <div className="text-center margin-md-top">
            <div className="pull-right">
            </div>
          </div>
        </TabPageHeader>
        <TabPageBody history={this.props.history} location={this.props.location}>
          {this.renderTable()}
          <FloatingMenu onClickMain={this.onClickAdd.bind(this)}/>
        </TabPageBody>
      </TabPage>
    )
  }
}
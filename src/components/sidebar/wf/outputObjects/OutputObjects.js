import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import FloatingMenu from 'components/common/floating/FloatingMenu'

export default class OutputObjects extends React.Component {
  componentWillMount () {
    this.props.fetchOutputObjects()
  }
  onClickAdd () {
    const name = prompt('Please type name')
    if (!name) return
    this.props.addOutputObject({
      name
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

  onClickDelete () {

  }

  renderTable () {
    const objects = this.props.outputObjects

    return (
      <div className="flex-1" style={{overflow: 'auto', padding: 10}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {objects.map(m =>
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>
                <EditIcon onClick={this.onClickEdit.bind(this, m)}/>
                <DeleteIcon onClick={this.onClickDelete.bind(this)}/>
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
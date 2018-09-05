import React from 'react'
import {Button} from '@material-ui/core'

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

  renderTable () {
    const objects = []

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
              <td></td>
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
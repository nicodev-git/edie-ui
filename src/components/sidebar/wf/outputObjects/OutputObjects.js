import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import FloatingMenu from 'components/common/floating/FloatingMenu'
import {showPrompt, showConfirm} from 'components/common/Alert'
import InlineEdit from 'components/common/ReactEditInline'

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

  onClickDelete (object) {
    showConfirm('Click OK to remove', btn => {
      if (btn !== 'ok') return
      this.props.removeOutputObject(object)
    })
  }

  onChangeName (object, values) {
    if (object.name === values.name) return
    this.props.updateOutputObject({
      ...object,
      ...values
    })
  }

  renderTable () {
    const objects = this.props.outputObjects
    return (
      <div className="flex-1" style={{overflow: 'auto', padding: 10}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Vars</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {objects.map(m =>
            <tr key={m.id}>
              <td>
                <InlineEdit
                  activeClassName="editing"
                  text={m.name || '\u00a0'}
                  paramName="name"
                  change={this.onChangeName.bind(this, m)}
                  style={{
                    width: '100%',
                    display: 'block'
                  }}
                />
              </td>
              <td>
                {(m.vars || []).join(', ')}
              </td>
              <td>
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
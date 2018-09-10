import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import FloatingMenu from 'components/common/floating/FloatingMenu'
import {showConfirm} from 'components/common/Alert'
import InlineEdit from 'components/common/ReactEditInline'

import OutputObjectModal from './OutputObjectModal'

export default class OutputObjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      objectModalOpen: false,
      editObject: null
    }
  }
  componentWillMount () {
    this.props.fetchOutputObjects()
  }
  onClickAdd () {
    this.setState({
      objectModalOpen: true,
      editObject: null
    })
  }

  onClickEdit (object) {
    this.setState({
      objectModalOpen: true,
      editObject: object
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

  onChangeVars (object, values) {
    const vars = values.name.split(',').filter(p => !!p).map(p => p.trim())
    if ((object.vars || []).join(',') === vars.join(',')) return

    this.props.updateOutputObject({
      ...object,
      vars
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////

  onSaveObject (entity) {
    if (entity.id) {
      this.props.updateOutputObject(entity)
    } else {
      this.props.addOutputObject(entity)
    }
  }

  onCloseObjectModal () {
    this.setState({
      objectModalOpen: false
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////

  renderTable () {
    const objects = this.props.playbookObjects
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
                <InlineEdit
                  activeClassName="editing"
                  text={(m.vars || []).join(', ') || '\u00a0'}
                  paramName="name"
                  change={this.onChangeVars.bind(this, m)}
                  style={{
                    width: '100%',
                    display: 'block'
                  }}
                />
              </td>
              <td>
                <EditIcon onClick={this.onClickEdit.bind(this, m)} className="hidden"/>
                <DeleteIcon onClick={this.onClickDelete.bind(this, m)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  renderOutputObjectModal () {
    if (!this.state.objectModalOpen) return null
    const {editObject} = this.state

    return (
      <OutputObjectModal
        editObject={editObject}
        onSave={this.onSaveObject.bind(this)}
        onClose={this.onCloseObjectModal.bind(this)}
      />
    )
  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Playbook Objects">
          <div className="text-center margin-md-top">
            <div className="pull-right">
            </div>
          </div>
        </TabPageHeader>
        <TabPageBody history={this.props.history} location={this.props.location}>
          {this.renderTable()}
          {this.renderOutputObjectModal()}
          <FloatingMenu onClickMain={this.onClickAdd.bind(this)}/>
        </TabPageBody>
      </TabPage>
    )
  }
}
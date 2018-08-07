import React from 'react'
import {Field} from 'redux-form'
import {
  FormInput, CardPanel
} from 'components/modal/parts'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import QueryFieldModal from './QueryFieldModal'
import {
  Modal
} from 'components/modal/parts'

const queryFields = [{
  label: 'Tag', value: 'tags'
}, {
  label: 'IP', value: 'dataobj.ip'
}]

const queryValues = [{
  label: `\${ip}`, value: `\${data.data.ip}`
}]

export default class IMQueryForm extends React.Component {
  constructor(props) {
    super(props)

    const fields = []

    let {params, resVars, queryItems} = props.initialValues || {}
    params = params || []
    params.forEach((value, id) => {
      fields.push({
        id,
        ...value
      })
    })

    resVars = resVars || []
    resVars = resVars.map((value, id) => ({
      id,
      ...value
    }))

    if (!fields.length) {
      fields.push({
        id: 0
      })
    }

    if (!resVars.length) {
      resVars.push({
        id: 0
      })
    }

    this.state = {
      fields,
      resVars,
      queryItems: queryItems || [],
      tab: 'general',
      anchor: null,

      addModalOpen: false,
      editIndex: -1,

      advancedModalOpen: false
    }
  }

  componentDidMount() {
    const {fields, resVars} = this.state
    fields.forEach(f => {
      if (f.name) {
        this.props.change(`param.name${f.id}`, f.name)
        this.props.change(`param.value${f.id}`, f.value)
      }
    })

    resVars.forEach(f => {
      if (f.name) {
        this.props.change(`resvar.name${f.id}`, f.name)
        this.props.change(`resvar.value${f.id}`, f.value)
      }
    })

    this.props.change('queryItems', this.state.queryItems)
  }

  ///////////////////////////////////

  onClickDelete(id) {
    const {fields} = this.state

    this.props.change(`param.name${id}`, '')
    this.props.change(`param.value${id}`, '')

    this.setState({
      fields: fields.filter(p => p.id !== id)
    })
  }

  onClickAdd() {
    const {fields} = this.state

    const maxId = Math.max.apply(null, fields.map(p => p.id)) + 1
    this.setState({
      fields: [...fields, {
        id: maxId
      }]
    })
  }

  ///////////////////////////////////

  onClickDeleteVar(id) {
    const {resVars} = this.state

    this.props.change(`resvar.name${id}`, '')
    this.props.change(`resvar.value${id}`, '')

    this.setState({
      resVars: resVars.filter(p => p.id !== id)
    })
  }

  onClickAddVar() {
    const {resVars} = this.state

    const maxId = Math.max.apply(null, resVars.map(p => p.id)) + 1
    this.setState({
      resVars: [...resVars, {
        id: maxId
      }]
    })
  }

  ///////////////////////////////////////////////

  getTags() {
    const {brainCells} = this.props
    return (brainCells || []).filter(p => p.type === 'Tag')
  }

  onChangeTab(e, value) {
    this.setState({
      tab: value
    })
  }

  onSaveImqueryField() {
    let {queryItems, editIndex} = this.state
    const {allValues} = this.props
    const {imqueryField, imqueryValue} = allValues || {}
    if (!imqueryField || !imqueryValue) return

    const item = {
      key: imqueryField,
      keyLabel: queryFields.filter(p => p.value === imqueryField)[0].label,
      value: imqueryValue,
      valueLabel: this.getImqueryFieldValues().filter(p => p.value === imqueryValue)[0].label
    }

    if (editIndex < 0) {
      queryItems = [...queryItems, item]
    } else {
      queryItems[editIndex] = item
    }

    this.setState({
      queryItems,
      addModalOpen: false
    }, () => {
      this.props.change('queryItems', this.state.queryItems)
    })
  }

  getImqueryFieldValues() {
    const {allValues} = this.props
    const {imqueryField} = allValues || {}

    switch (imqueryField) {
      case 'tags':
        return this.getTags().map(p => ({label: p.name, value: p.name}))
      default:
        return queryValues
    }
  }

  onClickEditQueryItem(editIndex) {
    const {queryItems} = this.state
    this.setState({
      addModalOpen: true,
      editIndex
    })

    const editItem = queryItems[editIndex]
    this.props.change('imqueryField', editItem.key)
    this.props.change('imqueryValue', editItem.value)
  }

  onClickDeleteQueryItem() {

  }

  showAddModal() {

    this.setState({
      addModalOpen: true,
      editIndex: -1
    })
    this.onCloseMenu()
  }

  ///////////////////////////////////////////////

  onClickMore(e) {
    this.setState({
      anchor: e.target
    })
  }

  onCloseMenu() {
    this.setState({
      anchor: null
    })
  }

  ///////////////////////////////////////////////
  showAdvancedModal() {
    this.onCloseMenu()
    this.setState({
      advancedModalOpen: true
    })
  }

  onCloseAdvancedModal() {
    this.setState({
      advancedModalOpen: false
    })
  }

  ///////////////////////////////////////////////
  renderQueryItems() {
    const {queryItems} = this.state
    return (
      <div className="margin-md-top" style={{minHeight: 200, overflow: 'auto'}}>
        {queryItems.map((q, i) =>
          <div key={i} className="text-center">
            {i ? (
              <div className="margin-md-top margin-md-bottom">
                <label className="wf-item-label">AND</label>
              </div>
            ) : null}

            <div className="inline-block wf-item-main" onClick={() => this.onClickEditQueryItem(i)}>
              <div className="inline-block wf-item-label">{q.keyLabel}</div>
              <label className="wf-item-value">{q.valueLabel}</label>
              <div className="wf-item-delete">
                <DeleteIcon onClick={() => this.onClickDeleteQueryItem(i)}/>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  renderTabAdvanced() {
    const {fields, resVars} = this.state
    return (
      <div>
        <CardPanel title="Parameters" tools={<AddIcon className="link" onClick={this.onClickAdd.bind(this)}/>}>
          <div style={{maxHeight: 500, overflow: 'auto'}}>
            <table className="table table-p-sm table-panel mb-none">
              <tbody>
              {fields.map((p) =>
                <tr key={p.id}>
                  <td className="valign-top">
                    <Field name={`param.name${p.id}`} component={FormInput} label="Param Name"
                           className="valign-top margin-md-right"/>
                    <Field name={`param.value${p.id}`} component={FormInput} label="Param Value"
                           className="valign-top margin-md-right"/>

                    <div className="inline-block valign-top" style={{marginTop: 8}}>
                      <DeleteIcon
                        className="link"
                        onClick={this.onClickDelete.bind(this, p.id)}/>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>

        <CardPanel title="Response Vars" tools={<AddIcon className="link" onClick={this.onClickAddVar.bind(this)}/>}>
          <div style={{maxHeight: 500, overflow: 'auto'}}>
            <table className="table table-p-sm table-panel mb-none">
              <tbody>
              {resVars.map((p) =>
                <tr key={p.id}>
                  <td className="valign-top">
                    <Field name={`resvar.name${p.id}`} component={FormInput} label="Var Name"
                           className="valign-top margin-md-right"/>
                    <Field name={`resvar.value${p.id}`} component={FormInput} label="Response Field"
                           className="valign-top margin-md-right"/>

                    <div className="inline-block valign-top" style={{marginTop: 8}}>
                      <DeleteIcon
                        className="link"
                        onClick={this.onClickDeleteVar.bind(this, p.id)}/>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </div>
    )
  }

  renderAddModal() {
    const {addModalOpen} = this.state
    if (!addModalOpen) return null
    return (
      <QueryFieldModal
        onSubmit={this.onSaveImqueryField.bind(this)}
        onClickClose={() => this.setState({addModalOpen: false})}
        queryFields={queryFields}
        getImqueryFieldValues={this.getImqueryFieldValues.bind(this)}
      />
    )
  }

  renderAdvancedModal() {
    const {advancedModalOpen} = this.state
    if (!advancedModalOpen) return null
    return (
      <Modal title="Query" onRequestClose={this.onCloseAdvancedModal.bind(this)}>
        {this.renderTabAdvanced()}
      </Modal>
    )
  }

  render() {
    const {anchor} = this.state
    return (
      <div>
        <div className="hidden">
          <CardPanel title="IM Query">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>
        </div>

        <div style={{width: '100%'}} className="text-right margin-sm-bottom">
          <MoreVertIcon className="link" onClick={this.onClickMore.bind(this)}/>
          {anchor ? (
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={this.onCloseMenu.bind(this)}
            >
              <MenuItem onClick={this.showAddModal.bind(this)}>Add</MenuItem>
              <MenuItem onClick={this.showAdvancedModal.bind(this)}>Advanced</MenuItem>
            </Menu>
          ) : null}
        </div>


        {this.renderQueryItems()}
        {this.renderAddModal()}
        {this.renderAdvancedModal()}
      </div>
    )
  }
}

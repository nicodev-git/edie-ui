import React from 'react'
import {Button, Select, MenuItem} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import ReactTooltip from 'react-tooltip'
import {debounce} from 'lodash'

import SettingTabs from '../SettingTabs'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import BrainCellModal from './BrainCellModal'
import {brainCellTypes} from 'shared/Global'

export default class Braincells extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'CommandPattern',
      group: '[All]',
      subgroup: '[All]',
      selected: ''
    }

    this.buildTooltip = debounce(() => {
      ReactTooltip.rebuild()
    }, 500)
  }

  componentWillMount() {
    this.props.fetchBrainCells()
    this.props.fetchWorkflows()
    this.props.fetchVendorProducts()
    this.props.fetchProductTypes()
    this.props.fetchProductVendors()
  }

  onClickAdd() {
    this.props.showBrainCellModal(true)
  }

  onCloseModal() {
    this.props.showBrainCellModal(false)
  }

  onSave(entity) {
    if (entity.id) {
      this.props.updateBrainCell(entity)
    } else {
      this.props.addBrainCell(entity)
    }
  }

  onClickEdit(entity) {
    this.props.showBrainCellModal(true, entity)
  }

  onClickDelete(entity) {
    if (!window.confirm('Click OK to remove.')) return
    this.props.removeBrainCell(entity)
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
      group: '[All]',
      subgroup: '[All]'
    })
  }

  onChangeGroup(e) {
    this.setState({
      group: e.target.value,
      subgroup: '[All]'
    })
  }

  onChangeSubGroup(e) {
    this.setState({
      subgroup: e.target.value
    })
  }

  //////////////////////////////////////////////////////////////////

  getSubcategories(group) {
    const {brainCells} = this.props
    const cat = brainCells.filter(p => p.name === group && p.type === 'CommandCategory')
    if (!cat.length) return []
    return brainCells.filter(p => p.key === cat[0].id && p.type === 'CommandSubcategory')
  }

  //////////////////////////////////////////////////////////////////

  getTags() {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  //////////////////////////////////////////////////////////////////

  renderBrainCellModal() {
    if (!this.props.brainCellModalOpen) return null
    return (
      <BrainCellModal
        {...this.props}
        type={this.state.type}
        allTags={this.getTags()}
        onSave={this.onSave.bind(this)}
        onClose={this.onCloseModal.bind(this)}
      />
    )
  }

  renderValueType(p) {
    if (p.type === 'Grok') return ''
    switch (p.valueType) {
      case 'FUNCTION':
        return `${p.value}(Function)`
      case 'WORKFLOW':
        return `${p.value}(Workflow)`
      case 'TEXTRESPONSE':
        return `${p.value}(TextResponse)`
      default:
        return p.value
    }
  }

  renderKey(p) {
    return p.key
  }

  renderContent() {
    const {type, group, subgroup, selected} = this.state
    let items = this.props.brainCells
    if (type !== '[All]') {
      items = items.filter(p => p.type === type)
    }
    if (group !== '[All]') {
      items = items.filter(p => p.functionCategory === group)
    }
    if (subgroup !== '[All]') {
      items = items.filter(p => p.functionSubcategory === subgroup)
    }

    this.buildTooltip()

    return (
      <div className="flex-1">
        <table className="table table-hover">
          <thead>
          <tr>
            <td>UUID</td>
            {type === 'Function' && <td>Category</td>}
            {type === 'Function' && <td>Subcategory</td>}
            <td>Name</td>
            <td>Action</td>
            <td>Key</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          {items.map(p =>
            <tr key={p.id} className={p.id === selected ? 'selected' : ''}
                onClick={() => this.setState({selected: p.id})}>
              <td>{p.uuid}</td>
              {type === 'Function' && <td>{p.functionCategory}</td>}
              {type === 'Function' && <td>{p.functionSubcategory}</td>}
              <td>
                <label data-tip={`${p.functionCategory}/${p.functionSubcategory}`}>{p.name}</label>
              </td>
              <td>{this.renderValueType(p)}</td>
              <td>{this.renderKey(p)}</td>
              <td>
                <EditIcon className="link" onClick={this.onClickEdit.bind(this, p)}/>
                <DeleteIcon className="link" onClick={this.onClickDelete.bind(this, p)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  renderGroupCombo() {
    if (this.state.type !== 'Function') return null
    const {brainCells} = this.props
    return (
      <Select value={this.state.group} onChange={this.onChangeGroup.bind(this)} className="margin-md-left">
        <MenuItem value="[All]">[All]</MenuItem>
        {brainCells.filter(p => p.type === 'CommandCategory').map(p =>
          <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
        )}
      </Select>
    )
  }

  renderSubGroupCombo() {
    if (this.state.type !== 'Function') return null
    const {group} = this.state
    const subcategories = this.getSubcategories(group)

    return (
      <Select value={this.state.subgroup} onChange={this.onChangeSubGroup.bind(this)} className="margin-md-left">
        <MenuItem value="[All]">[All]</MenuItem>
        {subcategories.map(p =>
          <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
        )}
      </Select>
    )
  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Advanced">
          <Select value={this.state.type} onChange={this.onChangeType.bind(this)}>
            <MenuItem value="[All]">[All]</MenuItem>
            {brainCellTypes.map(p =>
              <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
            )}
          </Select>
          {this.renderGroupCombo()}
          {this.renderSubGroupCombo()}
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={8} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
          {this.renderBrainCellModal()}
        </TabPageBody>

        <ReactTooltip/>
      </TabPage>
    )
  }
}
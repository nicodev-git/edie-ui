import React from 'react'
import {uniq} from 'lodash'
import {MenuItem, Select} from '@material-ui/core'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'
import FloatingMenu from 'components/common/floating/FloatingMenu'

export default class Shapes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: '',

      editModalOpen: false,
      editShape: null
    }
  }

  componentWillMount() {
    this.props.fetchShapes()
    this.props.fetchOutputObjects()
  }


  getGroups() {
    const {shapes} = this.props
    const list = uniq(shapes.filter(p => !!p.group).map(p => p.group))
    return [{
      label: 'General', value: ''
    }, ...list.map(p => ({
      label: p,
      value: p
    }))]
  }

  getFilteredShapes () {
    const {shapes} = this.props
    const {selectedGroup} = this.state
    return shapes.filter(p => (p.group || '') === selectedGroup)
  }

  onChangeGroup (e) {
    this.setState({
      selectedGroup: e.target.value
    })
  }

  onClickItem (shape) {
    this.props.onClickShape(shape)
    this.props.onClose()
  }

  onClickEditItem (editShape) {
    console.log(editShape)
    // if (editShape.type === 'PRODUCTACTION') return
    // this.setState({
    //   editModalOpen: true,
    //   editShape
    // })
  }

  onClickDeleteItem (editShape) {
    if (editShape.type === 'PRODUCTACTION') return
    if (!window.confirm('Click OK to remove')) return
    this.props.removeShape(editShape)
  }

  onClickAddNewShape () {
    this.props.history.push('/workflow/shapes/add')
  }

  ///////////////////////////////////////////////////////////////////

  renderTitle () {
    const {selectedGroup} = this.state
    const groups = this.getGroups()
    return (
      <Select
        value={selectedGroup} onChange={this.onChangeGroup.bind(this)}
        displayEmpty>
        {groups.map((p, i) =>
          <MenuItem key={i} value={p.value}>{p.label}</MenuItem>
        )}
      </Select>
    )
  }

  render () {
    const { onClickItem} = this.props
    const shapes = this.getFilteredShapes()
    return (
      <TabPage>
        <TabPageHeader title="Shapes">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
              {this.renderTitle()}
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>
          <ul className="web-applet-cards">
            {shapes.map((p, i) =>
              <AppletCard
                key={i}
                color={colors[i % colors.length]}
                name={p.title}
                desc={p.description || p.title}
                img={`/images/${p.img}`}
                onClick={() => onClickItem(p)}
                onClickEdit={this.onClickEditItem.bind(this, p)}
                onClickDelete={this.onClickDeleteItem.bind(this, p)}
              />
            )}
          </ul>

          <FloatingMenu onClickMain={this.onClickAddNewShape.bind(this)}/>
        </TabPageBody>
      </TabPage>
    )
  }
}
import React from 'react'
import {uniq} from 'lodash'
import {Button, MenuItem, Select} from '@material-ui/core'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'

export default class Shapes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGroup: '',

      editModalOpen: false,
      editShape: null
    }
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

  onClickAdd () {
    this.setState({
      editModalOpen: true,
      editShape: null
    })
  }

  onClickEditItem (editShape) {
    console.log(editShape)
    if (editShape.type === 'PRODUCTACTION') return
    this.setState({
      editModalOpen: true,
      editShape
    })
  }

  onClickDeleteItem (editShape) {
    if (editShape.type === 'PRODUCTACTION') return
    if (!window.confirm('Click OK to remove')) return
    this.props.removeShape(editShape)
  }

  ///////////////////////////////////////////////////////////////////

  renderTitle () {
    const {selectedGroup, groups, onChangeGroup} = this.props
    return (
      <Select
        value={selectedGroup} onChange={onChangeGroup}
        displayEmpty>
        {groups.map((p, i) =>
          <MenuItem key={i} value={p.value}>{p.label}</MenuItem>
        )}
      </Select>
    )
  }

  render () {
    const { shapes, onClickItem} = this.props
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
              />
            )}
          </ul>
        </TabPageBody>
      </TabPage>
    )
  }

  // render () {
  //   return (
  //     <ShapeListModalView
  //       {...this.props}
  //       shapes={this.getFilteredShapes()}
  //       onClickAdd={this.onClickAdd.bind(this)}
  //
  //       selectedGroup={this.state.selectedGroup}
  //       groups={this.getGroups()}
  //       onChangeGroup={this.onChangeGroup.bind(this)}
  //       onClickItem={this.onClickItem.bind(this)}
  //       onClickEditItem={this.onClickEditItem.bind(this)}
  //       onClickDeleteItem={this.onClickDeleteItem.bind(this)}
  //     >
  //       {this.renderEditModal()}
  //     </ShapeListModalView>
  //   )
  // }
}
import React, {Component} from 'react'
import {Select, MenuItem} from '@material-ui/icons'
import {
  FormInput,
  FormSelect,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'
import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'

export default class ShapeListModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  renderList () {
    const { shapes, onClickItem } = this.props
    return (
      <ul className="web-applet-cards">
        {shapes.map((p, i) =>
          <AppletCard
            key={i}
            color={colors[i % colors.length]}
            name={p.group || 'General'}
            desc={p.title}
            img={`/images/${p.img}`}
            onClick={onClickItem}
          />
        )}
      </ul>
    )
  }

  renderTitle () {
    const {selectedGroup, groups, onChangeGroup} = this.props
    return (
      <Select value={group} onChange={onChangeGroup}>
        {groups.map(p =>
          <MenuItem key={p} value={p.value}>{p.label}</MenuItem>
        )}
      </Select>
    )
  }

  render() {
    const {
      onClose
    } = this.props

    return (
      <Modal title="Shape" onRequestClose={onClose} contentStyle={{width: 1000}}>
          <CardPanel title="Shape">
            {this.renderList()}
          </CardPanel>
      </Modal>
    )
  }
}
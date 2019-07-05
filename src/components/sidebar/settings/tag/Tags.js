import React from 'react'
import {Button, Chip, Avatar} from '@material-ui/core'
import {blue, indigo} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import {showConfirm} from 'components/common/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import TagModal from './TagModal'
import WfTabs from '../tag/TagTabs'

import {chipStyles} from 'style/common/materialStyles'
import {hasPermission} from 'shared/Permission'

const styles = {
  avatar: {
    color: blue[300],
    backgroundColor: indigo[900]
  }
}
class Tags extends React.Component {
  componentWillMount () {
    this.props.fetchTags()
    this.props.fetchDevices()
  }
  onRowDblClick (item) {
    this.props.showTagModal(true, item)
  }
  onAddTag () {
    this.props.showTagModal(true)
  }
  onEditTag () {
    const {multiSelTags} = this.props
    if (!multiSelTags.length) return
    this.props.showTagModal(true, multiSelTags[0])
  }
  onDeleteTag (tag) {
    showConfirm(`Are you sure? Tag: ${tag.name}` , btn => {
      if (btn !== 'ok') return
      this.props.removeTag(tag)
    })
  }
  onClickTag (item) {
    const {multiSelTags} = this.props
    const selected = multiSelTags.filter(p => p.id === item.id).length > 0
    const items = !selected ? [...multiSelTags, item] : multiSelTags.filter(p => p.id !== item.id)
    this.props.multiSelectTag(items)
    this.props.fetchItemsByTags(items)
  }

  getTagMonitors () {
    const {multiSelTags} = this.props
    const monitors = []
    this.props.devices.forEach(d => {
      (d.monitors || []).forEach(m => {
        let found = false
        if (m.tags && m.tags.length > 0) {
          for (const i in multiSelTags) {
            if (m.tags.includes(multiSelTags[i].name)) {
              found = true
              break
            }
          }
        }
        if (found) {
          monitors.push(m)
        }
      })
    })
    return monitors
  }
  onClickTagDevice (device) {
    this.props.history.push(`/device/${device.id}`)
  }
  onClickTagWf (wf) {
    this.props.history.push(`/settings/tags/workflows`)
  }
  onClickTagParserType (pt) {
    this.props.history.push(`/settings/tags/parsertypes`)
  }
  onClickTagDeviceTpl (tpl) {
    this.props.history.push(`/settings/tags/templates`)
  }
  onClickTagMonitorTpl (tpl) {
    this.props.history.push(`/settings/tags/templates`)
  }
  renderTagModal () {
    if (!this.props.tagModalOpen) return null
    return (
      <TagModal {...this.props}/>
    )
  }
  renderTags (canEdit) {
    const {tags, multiSelTags} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {tags.map(p =>
          <Chip
            key={p.id}
            style={{
              ...chipStyles.chip,
              backgroundColor: multiSelTags.filter(t => t.id === p.id).length ? blue[300] : null
            }}
            onClick={this.onClickTag.bind(this, p)}
            onDelete={canEdit ? this.onDeleteTag.bind(this, p) : null}
            label={p.name}
          />
        )}
      </div>
    )
  }
  renderItems () {
    const {tagDevices, tagWorkflows, tagParserTypes, tagDeviceTpls, tagMonitorTpls, classes} = this.props
    return (
      <div style={chipStyles.wrapper}>
        {tagDevices.map(p =>
          <Chip
            key={p.id} style={chipStyles.chip}
            onClick={this.onClickTagDevice.bind(this, p)}
            avatar={<Avatar className={classes.avatar}>D</Avatar>}
            label={p.name}
          />
        )}
        {this.getTagMonitors().map(p =>
          <Chip
            key={p.uid} style={chipStyles.chip}
            onClick={() => {}}
            avatar={<Avatar className={classes.avatar}>M</Avatar>}
            label={p.name}
          />
        )}
        {tagWorkflows.map(p =>
          <Chip
            key={p.id} style={chipStyles.chip}
            onClick={this.onClickTagWf.bind(this, p)}
            avatar={<Avatar className={classes.avatar}>W</Avatar>}
            label={p.name}
          />
        )}
        {tagParserTypes.map(p =>
          <Chip
            key={p.id} style={chipStyles.chip}
            onClick={this.onClickTagParserType.bind(this, p)}
            avatar={<Avatar className={classes.avatar}>P</Avatar>}
            label={p.name}
          />
        )}
        {tagDeviceTpls.map(p =>
          <Chip
            key={p.id} style={chipStyles.chip}
            onClick={this.onClickTagDeviceTpl.bind(this, p)}
            avatar={<Avatar className={classes.avatar}>DT</Avatar>}
            label={p.name}
          />
        )}
        {tagMonitorTpls.map(p =>
          <Chip
            key={p.id} style={chipStyles.chip}
            onClick={this.onClickTagMonitorTpl.bind(this, p)}
            avatar={<Avatar className={classes.avatar}>MT</Avatar>}
            label={p.name}
          />
        )}
      </div>
    )
  }
  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Tags">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              {canEdit && <Button variant="raised" onClick={this.onAddTag.bind(this)}>Add</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onEditTag.bind(this)}>Edit</Button>}&nbsp;
              <WfTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location}>
          <div className="padding-md">
            <div><b>Tags</b></div>
            {this.renderTags(canEdit)}
            <div>Related</div>
            {this.renderItems()}
          </div>
          {this.renderTagModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

export default withStyles(styles)(Tags)
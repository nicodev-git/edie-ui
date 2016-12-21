import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { findIndex, concat } from 'lodash'
import Select from 'react-select'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'

import {appendComponent, removeComponent} from '../../../../../../util/Component'

import {ResponsiveInfiniteTable} from '../../../../../shared/InfiniteTable'
import IgnoreRuleEditModal from './IgnoreRuleEditModal'
import SimulatorModal from './SimulatorModal'
import { showAlert, showPrompt, showConfirm } from '../../../../../shared/Alert'
import DeviceWizard from '../../../../../shared/wizard/DeviceWizard'
import CopyRuleModal from './CopyRuleModal'

import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'

import {fetchDeviceRules} from '../../../../../../actions'

class MainRules extends React.Component {
  constructor (props) {
    super(props)

    const {device} = this.props

    this.state = {

      ruleCategories: [{
        label: '[All Categories]', value: 0
      }],
      selectedCategory: 0,
      selectedCategoryName: '',
            // ///////////////////////////////////

      url: Api.rule.getRulesForDevice,
      params: {
        deviceid: device.id,
        ruleCategory: 0,
        severity: ''
      },
      deviceRules: true,

            // ///////////////////////////////////

      categoryName: ''
    }

    this.cells = [{
      'displayName': 'Category',
      'columnName': 'categoryName'
    }, {
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Severity',
      'columnName': 'severity'
    }, {
      'displayName': 'Origin',
      'columnName': 'origin'
    }, {
      'displayName': 'Version',
      'columnName': 'version'
    }]

        // this.listeners = {
        //     [EVENTS.DEV_FILTER_CHANGED]: this.filter.bind(this),
        //
        //     [EVENTS.DEV_RULE_ADD_CLICKED]: this.onClickAddRule.bind(this),
        //     [EVENTS.DEV_RULE_EDIT_CLICKED]: this.onClickEditRule.bind(this),
        //     [EVENTS.DEV_RULE_REMOVE_CLICKED]: this.onClickDeleteRule.bind(this),
        //     [EVENTS.DEV_RULE_DUPLICATE_CLICKED]: this.onClickDuplicate.bind(this),
        //     [EVENTS.DEV_RULE_RESET_CLICKED]: this.onClickResetRule.bind(this),
        //     [EVENTS.DEV_RULE_COPY_TPL_CLICKED]: this.onClickCopyToTemplate.bind(this),
        //     [EVENTS.DEV_RULE_COPY_DEV_CLICKED]: this.onClickCopyToDevice.bind(this),
        //     [EVENTS.DEV_RULE_SHARE_CLICKED]: this.onClickShareRule.bind(this),
        //
        //     [EVENTS.DEV_RULE_ADD_CATEGORY_CLICKED]: this.onClickAddCategory.bind(this),
        //     [EVENTS.DEV_RULE_REMOVE_CATEGORY_CLICKED]: this.onClickDeleteCategory.bind(this),
        // }
  }

  componentWillMount () {
        // listen(this.listeners)
    this.props.fetchDeviceRules()
  }
    //
    // componentWillUnmount() {
    //     unlisten(this.listeners)
    // }

  render () {
    const {device} = this.props
    return (
            <TabPage>
                <TabPageHeader title={device.name}>
                    <div className="text-center margin-md-top">

                        <div className="pull-left">
                            <Select
                              options={this.state.ruleCategories}
                              value={this.state.selectedCategory}
                              onChange={this.onChangeRuleCategory}
                              style={{minWidth: '150px'}}
                              className="select-severity text-left"
                              clearable={false}
                              searchable={false}
                              autosize={false}
                            />
                            <a href="javascript:;" className="btn btn-default text-primary margin-sm-left"
                              onClick={this.onClickDeleteCategory.bind(this)}>
                                <i className="fa fa-trash-o" /></a>
                        </div>

                        <div className="pull-right">
                            <ButtonGroup>

                                <Button onClick={this.onClickAddRules.bind(this)}>Add</Button>
                                <Button onClick={this.onClickEditRule.bind(this)}>Edit</Button>
                                <Button onClick={this.onClickDeleteRule.bind(this)}>Delete</Button>

                                <DropdownButton title="Actions" id="dd-dev-rules">

                                    <MenuItem eventKey="1" onClick={this.onClickDuplicate.bind(this)}>
                                        <i className="fa fa-copy" />&nbsp;Duplicate
                                    </MenuItem>

                                    <MenuItem eventKey="2" onClick={this.onClickCopyToTemplate.bind(this)}>
                                        <i className="fa fa-tags" />&nbsp;Copy Rule To Template
                                    </MenuItem>

                                    <MenuItem eventKey="3" onClick={this.onClickResetRule.bind(this)}>
                                        <i className="fa fa-refresh" />&nbsp;Reset
                                    </MenuItem>

                                    <MenuItem eventKey="4" onClick={this.onClickCopyToDevice.bind(this)}>
                                        <i className="fa fa-copy" />&nbsp;Copy Rules to Device
                                    </MenuItem>

                                    <MenuItem eventKey="5" onClick={this.onClickShareRule.bind(this)}>
                                        <i className="fa fa-share" />&nbsp;Share
                                    </MenuItem>

                                    <MenuItem eventKey="6" onClick={this.onClickAddRule.bind(this)}>
                                        <i className="fa fa-plus-square" />&nbsp;Create Rule
                                    </MenuItem>

                                </DropdownButton>

                                <Button onClick={this.onClickAddCategory.bind(this)}>Add Category</Button>

                            </ButtonGroup>
                        </div>

                    </div>
                </TabPageHeader>

                <TabPageBody tabs={MainTabs} tab={1}>
                    {this.renderTable()}
                </TabPageBody>
            </TabPage>
    )
  }
  renderTable () {
    return (
            <ResponsiveInfiniteTable
              id="rule1"
              cells={this.cells}
              ref="table"
              rowMetadata={{'key': 'idrulesNew'}}
              selectable
              onRowDblClick={this.onRowDblClick.bind(this)}

              useExternal={false}
              data={this.props.rules}
            />
    )
  }

  render2 () {
    return (
            <InfiniteTable
              id="rule1"
              url={this.state.url}
              params={this.state.params}
              cells={this.cells}
              ref="table"
              rowMetadata={{'key': 'idrulesNew'}}
              bodyHeight={this.props.containerHeight}
              selectable
              onRowDblClick={this.onRowDblClick.bind(this)}
            />
    )
  }

  onRowDblClick (sel) {
    this.onClickEditRule()
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
  }

    // //////////////////////////////////////////////////////////////////////////////////////

  filter (params) {
    this.setState({
      params: Object.assign({}, this.state.params, {
        ruleCategory: params.categoryId
      }),
      categoryName: params.categoryName
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////

  onClickAddCategory () {
    showPrompt('Please input category name.', 'New Category', name => {
      if (!name) return

      $.get(Api.rule.addCategory, {
        name: name
      }).done(data => {
        if (!data.success) return

        this.props.onUpdateCategory()
      })
    })
  }

  onClickDeleteCategory (categoryId) {
    if (categoryId === 0) return

    showConfirm('Click OK to remove selected category.', btn => {
      if (btn !== 'ok') return

      $.get(Api.rule.deleteACategory, {
        id: categoryId
      }).done(data => {
        if (!data.success) {
          showAlert('Remove failed.')
          return
        }

        this.props.onUpdateCategory()
      })
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////

  onClickAddRule () {
    this.showDeviceRuleAdd(this.props.device.id, {}, () => {
      this.getTable().refresh()
    })
  }

  onClickEditRule () {
    if (this.state.categoryName === 'Ignore/Delete') {
      this.showIgnoredRuleEdit()
    } else {
      this.showDeviceRuleEdit(this.getTable(), this.props.device.id, () => {
        this.getTable().refresh()
      })
    }
  }

  onClickDeleteRule () {
    this.showDeviceRuleRemove(this.getTable(), () => {
      this.getTable().refresh()
    })
  }

  showDeviceRuleAdd (deviceid, val, cb) {
    const extra = {
      deviceid: deviceid
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0
    }

    appendComponent(
            <DeviceWizard
              deviceType="devicerule"
              onClose={removeComponent}
              extraParams={extra}
              configParams={config}
              onFinish={cb}
            />
        )
  }

  showDeviceRuleEdit (tbl, deviceId, cb) {
    let tbDevRules = tbl

    if (tbDevRules === null) return

    let data = tbDevRules.getSelected()
    if (!data) {
      showAlert('Please choose a rule to edit.')
      return
    }

        // Tweak
    data.filter1 = data.prefilter1
    data.filter2 = data.prefilter2

    const extra = {
      deviceid: this.props.device.id,
      idrulesNew: data.idrulesNew,
      remoteip: data.remoteip
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0,
      url: Api.rule.updateARuleToADevice
    }

    appendComponent(
            <DeviceWizard
              deviceType="devicerule"
              onClose={removeComponent}
              extraParams={extra}
              configParams={config}
              onFinish={cb}
              values={data}
            />
        )
  }

  showIgnoredRuleEdit () {
    let data = this.getTable().getSelected()
    if (!data) {
      showAlert('Please choose a rule.')
      return
    }

        // /////////////////////////////////////////////////////////////////

    appendComponent(
            <IgnoreRuleEditModal
              open
              rule={data}
              device={this.props.device}
              categoryId={this.state.params.ruleCategory}
              onClose={this.onCloseIgnoreRuleEdit.bind(this)}
            />
        )
  }

  onCloseIgnoreRuleEdit (modal, success) {
    this.getTable().refresh()

    removeComponent(modal)
  }

  showSimulator (options) {
    appendComponent(
            <SimulatorModal
              options={options}
              device={this.props.device}
              onClose={removeComponent}
            />
        )
  }

  showDeviceRuleRemove (tbl, cb) {
    let selected = tbl.getSelected()
    if (!selected) {
      showAlert('Please choose a rule to delete.')
      return
    }

    showConfirm(`Click OK to delete: ${selected.name}`, btn => {
      if (btn !== 'ok') return

      $.get(Api.rule.deleteARuleForADevice, {
        idRulesNew: selected.idrulesNew
      }).done(() => {
        cb && cb()
      })
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickDuplicate () {
    let selected = this.getTable().getSelected()
    if (!selected) {
      showAlert('Please choose a rule.')
      return
    }

    $.get(Api.rule.copyRule, {
      id: selected.idrulesNew
    }).done(res => {
      if (!res.success) {
        alert('Failed!')
        return
      }

      this.getTable().refresh()
    }).fail(() => {
      alert('Failed!')
    })
  }

  onClickResetRule () {
    showConfirm('Click OK to reset rules.', btn => {
      if (btn !== 'ok') return

      $.get(Api.rule.applyTemplateToDevices, {
        deviceids: this.props.device.id
      }).done(() => {
        this.getTable().refresh()
      })
    })
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickCopyToTemplate () {
    appendComponent(
            <CopyRuleModal
              onClose = {removeComponent}
              copyType = "template"
              device = {this.props.device}
            />
        )
  }

  onClickCopyToDevice () {
    appendComponent(
            <CopyRuleModal
              onClose = {removeComponent}
              copyType = "device"
              device = {this.props.device}
            />
        )
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickShareRule () {
    let selected = this.getTable().getSelected()
    if (!selected) {
      showAlert('Please choose a rule.')
      return
    }

    $.get(Api.rule.shareRule, {
      ids: [selected.idrulesNew]
    }).done(res => {
      if (!res.success) {
        showAlert('Sharing failed. Cannot connect to server!')
        return
      }

      showAlert('Successfully shared.')
    }).fail(() => {
      showAlert('Sharing failed. Cannot connect to server!')
    })
  }

  onClickAddRules () {
    this.props.router.push({
      pathname: '/device/main/ruleAdd'
    })
  }
}

MainRules.defaultProps = {
  onUpdateCategory: null
}

function mapStateToProps (state) {
  return {
    device: state.dashboard.selectedDevice,
    rules: state.devices.rules
  }
}

export default withRouter(connect(mapStateToProps, {fetchDeviceRules})(MainRules))

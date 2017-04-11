import React from 'react'
import Select from 'react-select'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'

import { appendComponent, removeComponent } from '../../../../../../util/Component'

import InfiniteTable from '../../../../../shared/InfiniteTable'
import IgnoreRuleEditModal from './IgnoreRuleEditModal'
import SimulatorModal from './SimulatorModal'
import { showAlert, showPrompt, showConfirm } from '../../../../../shared/Alert'
import DeviceWizardContainer from '../../../../../../containers/shared/wizard/DeviceWizardContainer'
import CopyRuleModal from './CopyRuleModal'

import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'

import { ROOT_URL } from '../../../../../../actions/config'

export default class MainRules extends React.Component {
  constructor (props) {
    super(props)

    const {device} = this.props

    this.state = {

      ruleCategories: [{
        label: '[All Categories]', value: 0
      }],
      selectedCategory: 0,
      selectedCategoryName: '',

      url: Api.rule.getRulesForDevice, // eslint-disable-line no-undef
      params: {
        deviceid: device.id,
        ruleCategory: 0,
        severity: ''
      },
      deviceRules: true,

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
  }

  componentWillMount () {
    this.props.fetchDeviceRules()
  }

  renderTable () {
    return (
      <InfiniteTable
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

  onRowDblClick (sel) {
    this.onClickEditRule()
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
  }

  filter (params) {
    this.setState({
      params: Object.assign({}, this.state.params, {
        ruleCategory: params.categoryId
      }),
      categoryName: params.categoryName
    })
  }

  onClickAddCategory () {
    showPrompt('Please input category name.', 'New Category', name => {
      if (!name) return

      $.get(`${ROOT_URL}${Api.rule.addCategory}`, { // eslint-disable-line no-undef
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

      $.get(`${ROOT_URL}${Api.rule.deleteACategory}`, { // eslint-disable-line no-undef
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
      <DeviceWizardContainer
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
      url: Api.rule.updateARuleToADevice // eslint-disable-line no-undef
    }

    appendComponent(
      <DeviceWizardContainer
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

      $.get(`${ROOT_URL}${Api.rule.deleteARuleForADevice}`, { // eslint-disable-line no-undef
        idRulesNew: selected.idrulesNew
      }).done(() => {
        cb && cb()
      })
    })
  }

  onClickDuplicate () {
    let selected = this.getTable().getSelected()
    if (!selected) {
      showAlert('Please choose a rule.')
      return
    }

    $.get(`${ROOT_URL}${Api.rule.copyRule}`, { // eslint-disable-line no-undef
      id: selected.idrulesNew
    }).done(res => {
      if (!res.success) {
        window.alert('Failed!')
        return
      }

      this.getTable().refresh()
    }).fail(() => {
      window.alert('Failed!')
    })
  }

  onClickResetRule () {
    showConfirm('Click OK to reset rules.', btn => {
      if (btn !== 'ok') return

      $.get(`${ROOT_URL}${Api.rule.applyTemplateToDevices}`, { // eslint-disable-line no-undef
        deviceids: this.props.device.id
      }).done(() => {
        this.getTable().refresh()
      })
    })
  }

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

  onClickShareRule () {
    let selected = this.getTable().getSelected()
    if (!selected) {
      showAlert('Please choose a rule.')
      return
    }

    $.get(`${ROOT_URL}${Api.rule.shareRule}`, { // eslint-disable-line no-undef
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

        <TabPageBody tabs={MainTabs(device.id)} tab={1}>
          {this.renderTable()}
        </TabPageBody>
      </TabPage>
    )
  }
}

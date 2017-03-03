import React from 'react'
import Modal from 'react-bootstrap-modal'

import { Button } from 'react-bootstrap'

import JDataTable from '../../../../../shared/JDataTable'
import { showAlert, showConfirm } from '../../../../../shared/Alert'
import { sortBy, join } from 'lodash'

import { appendComponent, removeComponent } from '../../../../../../util/Component'
import DeviceWizardContainer from '../../../../../../containers/shared/wizard/DeviceWizardContainer'

import Api from '../../../../../../api'
import { ROOT_URL } from '../../../../../../actions/config'

export default class CopyRuleModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      copyType: props.copyType,

      categories: [],
      groups: [],
      devicesLeft: [],
      devicesRight: [],
      logicals: [],

      selectedDeviceLeft: 0,
      selectedDeviceRight: 0,
      selectedLogical: 0
    }

    this.reloadTables = this.reloadTables.bind(this)
  }

  componentWillMount () {
    this.loadCategories()
    this.loadGroups()
    this.loadDevicesLeft()
  }

  loadTable () {
  }

  loadCategories () {
    return $.get(`${ROOT_URL}${Api.rule.getCategories}`).done(res => { // eslint-disable-line no-undef
      this.setState({
        categories: res
      })

      this.loadLogicals(res[0] ? res[0].id : 0)
    }).fail(() => {
      showAlert('Fetch category list failed!')
    })
  }

  loadGroups () {
    return $.get(`${ROOT_URL}${Api.dashboard.getDevicesByType}`, { // eslint-disable-line no-undef
      devicetype: 'group'
    }).done(res => {
      res.splice(0, 0, {
        id: 0,
        name: '[Main]'
      })

      this.setState({
        groups: res
      })

      this.loadDevicesRight(res[0] ? res[0].id : 0)
    }).fail(() => {
      showAlert('Fetch groups failed!')
    })
  }

  loadDevicesLeft () {
    return $.get(`${ROOT_URL}${Api.dashboard.getDevices}`, { // eslint-disable-line no-undef
    }).done(res => {
      const items = this.filterDevices(res, true)
      this.setState({
        devicesLeft: items,
        selectedDeviceLeft: this.props.device.id
      })
    }).fail(function () {
      showAlert('Can not get device list!')
    })
  }

  loadDevicesRight (groupId) {
    $.get(`${ROOT_URL}${Api.dashboard.getDevicesByGroup}`, { groupId }) // eslint-disable-line no-undef
      .done(res => {
        const items = this.filterDevices(res, false)
        this.setState({
          devicesRight: items,
          selectedDeviceRight: items[0] ? items[0].id : 0
        })
      }).fail(function () {

      })
  }

  loadLogicals (catId) {
    return $.get(`${ROOT_URL}${Api.rule.getLogicalName}`, { // eslint-disable-line no-undef
      draw: 1,
      start: 0,
      length: 100,
      search: '',
      category: catId || 0
    }).done((res) => {
      this.setState({
        logicals: res.data,
        selectedLogical: res.data[0] ? res.data[0].id : 0
      })
    }).fail(() => {
      showAlert('Fetch logical list failed!')
    })
  }

  filterDevices (devices, showgroup) {
    let items = []

    devices.forEach(device => {
      if (device.shape.toLowerCase() !== 'devices') return true

      let name = device.name
      if (showgroup) {
        name = (device.groupname ? (`${device.groupname}/`) : '') + name
      }

      items.push({
        id: device.id,
        name: name
      })
    })

    return sortBy(items, ['name'])
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this)
    })
  }

  onChangeCopyType (e) {
    this.setState({ copyType: e.target.value })
  }

  onChangeCategory (e) {
    const val = e.target.value
    this.loadLogicals(val)
  }

  onChangeDevicesLeft (e) {
    const val = e.target.value
    this.setState({ selectedDeviceLeft: val })
  }

  onChangeLogical (e) {
    const val = e.target.value
    this.setState({ selectedLogical: val })
  }

  onChangeGroups (e) {
    const val = e.target.value
    this.loadDevicesRight(val)
  }

  onChangeDevicesRight (e) {
    const val = e.target.value
    this.setState({ selectedDeviceRight: val })
  }

  onClickCopyLeft () {
    if (this.state.copyType === 'device') {
      this.checkIfSameTarget() &&
        this.copyRules(
          this.refs.ruleDeviceLeft,
          this.state.selectedDeviceRight,
          this.reloadTables
        )
    } else {
      this.createRulesFromTemplates(
        this.refs.ruleTplLeft,
        this.state.selectedDeviceRight,
        false,
        this.reloadTables
      )
    }
  }

  onClickMoveLeft () {
    if (this.state.copyType === 'device') {
      this.checkIfSameTarget() &&
        this.moveRules(
          this.refs.ruleDeviceLeft,
          this.state.selectedDeviceRight,
          this.reloadTables
        )
    } else {
      this.createRulesFromTemplates(
        this.refs.ruleTplLeft,
        this.state.selectedDeviceRight,
        true,
        this.reloadTables
      )
    }
  }

  onClickAddLeft () {
    if (this.state.copyType === 'device') {
      this.showDeviceRuleAdd(
        this.state.selectedDeviceLeft,
        {},
        this.reloadTables
      )
    } else {
      this.showAddRuleTpl(
        this.refs.category.value,
        this.state.selectedLogical,
        this.reloadTables
      )
    }
  }

  onClickEditLeft () {
    if (this.state.copyType === 'device') {
      this.showDeviceRuleEdit(
        this.refs.ruleDeviceLeft,
        this.state.selectedDeviceLeft,
        this.reloadTables
      )
    } else {
      this.showEditRuleTpl(this.refs.ruleTplLeft, this.reloadTables)
    }
  }

  onClickDeleteLeft () {
    if (this.state.copyType === 'device') {
      this.showDeviceRuleRemove(this.refs.ruleDeviceLeft, this.reloadTables)
    } else {
      this.showDeleteRuleTpl(this.refs.ruleTplLeft, this.reloadTables)
    }
  }

  onClickCopyRight () {
    if (this.state.copyType === 'device') {
      this.checkIfSameTarget() &&
        this.copyRules(
          this.refs.ruleDeviceRight,
          this.state.selectedDeviceLeft,
          this.reloadTables
        )
    } else {
      this.createTemplatesFromRules(
        this.refs.ruleDeviceRight,
        this.state.selectedLogical,
        this.refs.category.value,
        false,
        this.reloadTables
      )
    }
  }

  onClickMoveRight () {
    if (this.state.copyType === 'device') {
      this.checkIfSameTarget() &&
        this.moveRules(
          this.refs.ruleDeviceRight,
          this.state.selectedDeviceLeft,
          this.reloadTables
        )
    } else {
      this.createTemplatesFromRules(
        this.refs.ruleDeviceRight,
        this.state.selectedLogical,
        this.refs.category.value,
        true,
        this.reloadTables
      )
    }
  }

  onClickAddRight () {
    this.showDeviceRuleAdd(this.state.selectedDeviceRight, {}, this.reloadTables)
  }

  onClickEditRight () {
    this.showDeviceRuleEdit(
      this.refs.ruleDeviceRight,
      this.state.selectedDeviceRight,
      this.reloadTables
    )
  }

  onClickDeleteRight () {
    this.showDeviceRuleRemove(this.refs.ruleDeviceRight, this.reloadTables)
  }

  reloadTables () {
    this.refs.ruleDeviceLeft.reload()
    this.refs.ruleTplLeft.reload()
    this.refs.ruleDeviceRight.reload()
  }

  checkIfSameTarget () {
    if (this.state.selectedDeviceLeft === this.state.selectedDeviceRight) {
      showAlert('Choose different device.')
      return false
    }

    return true
  }

  copyRules (table, deviceId, cb) {
    let selected = table.getSelected()
    if (!selected || !selected.length) {
      showAlert('Please choose rules.')
      return
    }

    const ruleIds = selected.map(data => data.idrulesNew)

    showConfirm('Click OK to copy rules.', btn => {
      if (btn !== 'ok') return

      $.post(Api.rule.copyRulesTo, { // eslint-disable-line no-undef
        ids: ruleIds,
        deviceId: deviceId
      }).done(res => {
        cb && cb()

        if (!res.success) {
          showAlert('Failed!')
        } else {
          showAlert('Successfully Copied!')
        }
      }).fail(() => {
        showAlert('Failed!')
      })
    })
  }

  moveRules (table, deviceId, cb) {
    let selected = table.getSelected()
    if (!selected || !selected.length) {
      showAlert('Please choose rules.')
      return
    }

    let ruleIds = selected.map(data => data.idrulesNew)

    showConfirm('Click OK to move rules.', btn => {
      if (btn !== 'ok') return

      $.post(Api.rule.moveRulesTo, { // eslint-disable-line no-undef
        ids: ruleIds,
        deviceId: deviceId
      }).done(function (res) {
        cb && cb()

        if (!res.success) {
          showAlert('Failed!')
        } else {
          showAlert('Successfully Moved!')
        }
      }).fail(() => {
        showAlert('Failed!')
      })
    })
  }

  createRulesFromTemplates (table, deviceId, move, cb) {
    let selected = table.getSelected()
    if (!selected || !selected.length) {
      showAlert('Please choose templates.')
      return
    }

    const ids = selected.map(item => item.id)

    let msg = move
      ? 'Click OK to move templates.'
      : 'Click OK to copy templates.'

    showConfirm(msg, (btn) => {
      if (btn !== 'ok') return

      $.post(Api.rule.createRulesFromTemplates, { // eslint-disable-line no-undef
        ids: ids,
        deviceId: deviceId,
        move: move
      }).done((res) => {
        cb && cb()

        if (!res.success) {
          showAlert('Failed!')
        } else {
          if (move) showAlert('Successfully Moved!')
          else showAlert('Successfully Copied!')
        }
      }).fail(() => {
        showAlert('Failed!')
      })
    })
  }

  createTemplatesFromRules (table, logicalId, categoryId, move, cb) {
    let selected = table.getSelected()
    if (!selected || !selected.length) {
      showAlert('Please choose rules.')
      return
    }

    let ruleIds = selected.map(data => data.idrulesNew)

    let msg
    if (move) msg = 'Click OK to move rules.'
    else msg = 'Click OK to copy rules.'

    showConfirm(msg, function (btn) {
      if (btn !== 'ok') return

      $.post(Api.rule.createTemplatesFromRules, { // eslint-disable-line no-undef
        ids: ruleIds,
        logicalId: logicalId,
        categoryId: categoryId,
        move: move
      }).done((res) => {
        cb && cb()

        if (!res.success) {
          showAlert('Failed!')
        } else {
          if (move) showAlert('Successfully Moved!')
          else showAlert('Successfully Copied!')
        }
      }).fail(() => {
        showAlert('Failed!')
      })
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
    let items = tbl.getSelected()
    if (!items || !items.length) {
      showAlert('Please choose a rule to edit.')
      return
    }

    let data = items[0]
        // Tweak
    data.filter1 = data.prefilter1
    data.filter2 = data.prefilter2

    const extra = {
      deviceid: deviceId,
      idrulesNew: data.idrulesNew,
      remoteip: data.remoteip
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0,
      url: Api.rule.updateARuleToADevice
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

  showDeviceRuleRemove (tbl, cb) {
    let data = tbl.getSelected()
    if (!data || !data.length) {
      showAlert('Please choose rules to delete.')
      return
    }

    const msg = join(data.map(item => item.name), ', ')

    showConfirm(`Click OK to delete: ${msg}`, (btn) => {
      if (btn !== 'ok') return

      let calls = data.map(item =>
        $.get(`${ROOT_URL}${Api.rule.deleteARuleForADevice}?idRulesNew=${item.idrulesNew}`) // eslint-disable-line no-undef
      )

      $.when.apply(this, calls).done(() => { // eslint-disable-line no-undef
        cb && cb()
      })
    })
  }

  showAddRuleTpl (categoryId, logicalId, cb) {
    const extra = {
      ruleCategory: categoryId,
      groupid: 1,
      logicalRule: logicalId
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0
    }

    appendComponent(
      <DeviceWizardContainer
        deviceType="tplrule"
        onClose={removeComponent}
        extraParams={extra}
        configParams={config}
        onFinish={cb}
      />
  )
  }

  showEditRuleTpl (tbl, cb) {
    let items = tbl.getSelected()
    if (!items || !items.length) {
      showAlert('Please choose a rule to edit.')
      return
    }

    let data = items[0]
        // Tweak
    data.filter1 = data.prefilter1
    data.filter2 = data.prefilter2

    const extra = {
      ruleId: data.id,
      groupid: 1
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0,
      url: Api.rule.updatePhysicalName
    }

    appendComponent(
      <DeviceWizardContainer
        deviceType="tplrule"
        onClose={removeComponent}
        extraParams={extra}
        configParams={config}
        onFinish={cb}
        values={data}
      />
    )
  }

  showDeleteRuleTpl (tbl, cb) {
    let data = tbl.getSelected()
    if (!data || !data.length) {
      showAlert('Please choose rules to delete.')
      return
    }

    const msg = join(data.map(item => item.name), ', ')

    showConfirm(`Click OK to delete: ${msg}`, function (btn) {
      if (btn !== 'ok') return

      let calls = data.map(item =>
        $.get(`${ROOT_URL}${Api.rule.deletePhysicalName}?id=${item.id}`) // eslint-disable-line no-undef
      )

      $.when.apply(this, calls).done(() => { // eslint-disable-line no-undef
        cb && cb()
      })
    })
  }

  render () {
    return (
      <CopyRuleModalView
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        onClose={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
        onChangeCopy={this.onChangeCopyType.bind(this)}
        onChangeCategory={this.onChangeCategory.bind(this)}
        onChangeLogical={this.onChangeLogical.bind(this)}
        defaultValue={this.state.copyType}
        selectedLogical={this.state.selectedLogical}
        logicals={this.state.logicals}
        categories={this.state.categories}
      />
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary modal-copy-rules"
      >

                    <div className="col-md-5">
                      <select
                        className="form-control"
                        onChange={this.onChangeLogical.bind(this)}
                        value={this.state.selectedLogical}
                        ref="logical"
                      >
                        {this.state.logicals.map(item =>
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className={`row ${this.state.copyType === 'device' ? '' : 'hidden'}`}>
                    <label className="control-label col-md-2">From: </label>
                    <div className="col-md-10">
                      <select
                        className="form-control"
                        value={this.state.selectedDeviceLeft}
                        onChange={this.onChangeDevicesLeft.bind(this)}
                        ref="deviceLeft"
                      >
                        {this.state.devicesLeft.map(item =>
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className={`${this.state.copyType === 'device' ? '' : 'hidden'}`}>

                    <JDataTable
                      height="350px"
                      className="table-hover"

                      url={Api.rule.getRulesForDevice}
                      columns = {[{
                        title: 'Category', data: 'categoryName'
                      }, {
                        title: 'Name', data: 'name'
                      }]}
                      params = {{
                        deviceid: this.state.selectedDeviceLeft,
                        ruleCategory: 0,
                        severity: ''
                      }}
                      ref="ruleDeviceLeft"
                    />
                  </div>

                  <div className={`${this.state.copyType === 'template' ? '' : 'hidden'}`}>

                    <JDataTable
                      className="table-hover"
                      height="350px"

                      url={Api.rule.getByLogicalRuleId}
                      columns = {[{
                        title: 'Name', data: 'name'
                      }]}
                      params = {{
                        logicalRuleId: this.state.selectedLogical,
                        severity: ''
                      }}
                      ref="ruleTplLeft"
                    />
                  </div>

                  <div className="text-center padding-md">
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickCopyLeft.bind(this)}>Copy</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickMoveLeft.bind(this)}>Move</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickAddLeft.bind(this)}>Add</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickEditLeft.bind(this)}>Edit</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickDeleteLeft.bind(this)}>Delete</Button>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <label className="control-label col-md-2">To: </label>
                    <div className="col-md-5">
                      <select
                        className="form-control"
                        onChange={this.onChangeGroups.bind(this)}
                      >
                        {this.state.groups.map(item =>
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                    <div className="col-md-5">
                      <select
                        className="form-control"
                        onChange={this.onChangeDevicesRight.bind(this)}
                        value={this.state.selectedDeviceRight}
                        ref="deviceRight"
                      >
                        {this.state.devicesRight.map(item =>
                          <option key={item.id} value={item.id}>{item.name}</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <JDataTable
                    height="350px"
                    className="table-hover"

                    url={Api.rule.getRulesForDevice}
                    columns = {[{
                      title: 'Category', data: 'categoryName'
                    }, {
                      title: 'Name', data: 'name'
                    }]}
                    params = {{
                      deviceid: this.state.selectedDeviceRight,
                      ruleCategory: 0,
                      severity: ''
                    }}
                    ref="ruleDeviceRight"
                  />

                  <div className="text-center padding-md">
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickCopyRight.bind(this)}>Copy</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickMoveRight.bind(this)}>Move</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickAddRight.bind(this)}>Add</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickEditRight.bind(this)}>Edit</Button>
                    <Button className="btn-sm margin-sm-right" onClick={this.onClickDeleteRight.bind(this)}>Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

CopyRuleModal.defaultProps = {
  device: {},
  copyType: 'device'
}

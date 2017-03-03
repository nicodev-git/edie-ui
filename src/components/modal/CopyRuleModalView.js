import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Header } from './parts'

const CopyRuleModalView = ({show, onHide, onSave, onClose, onChangeCopy, onChangeCategory,
   onChangeLogical, selectedLogical, logicals, defaultValue, categories}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name="Copy//Move rules" onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message p-none">
      <div className="panel panel-default panel-noborder">
        <div className="panel-heading">
          <span className="panel-title">&nbsp;</span>
          <select
            className="input-sm"
            onChange={onChangeCopy}
            defaultValue={defaultValue}
          >
            <option value="device">Device</option>
            <option value="template">Template</option>
          </select>
          <div className="panel-options" />
        </div>
        <div className="panel-body pb-none">
          <div className="row">
            <div className="col-md-6">
              <div className={`row ${defaultValue === 'template' ? '' : 'hidden'}`}>
                <label className="control-label col-md-2">From: </label>
                <div className="col-md-5">
                  <select
                    className="form-control"
                    onChange={onChangeCategory}
                    ref="category"
                  >
                    {categories.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-5">
                  <select
                    className="form-control"
                    onChange={onChangeLogical}
                    value={selectedLogical}
                    ref="logical"
                  >
                    {logicals.map(item =>
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

export default CopyRuleModalView

import React from 'react'
import Modal from 'react-bootstrap-modal'
import JDataTable from '../shared/JDataTable'
import { Header, FiveButtonsBlock } from './parts'
import { Button } from 'react-bootstrap'

const CopyRuleModalView = ({show, onHide, onSave, onClose, onChangeCopy, onChangeCategory,
   onChangeLogical, onChangeLeft, onChangeRight, onChangeGroups, electedLogical, logicals, defaultValue,
   categories, copyType, groups, selectedLeft, selectedRight, devicesLeft, devicesRight,
   selectedLogical, onClickBlockLeft, onClickBlockRight}) => (
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

              <div className={`row ${copyType === 'device' ? '' : 'hidden'}`}>
                <label className="control-label col-md-2">From: </label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    value={selectedLeft}
                    onChange={onChangeLeft}
                    ref="deviceLeft"
                  >
                    {devicesLeft.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className={`${copyType === 'device' ? '' : 'hidden'}`}>

                <JDataTable
                  height="350px"
                  className="table-hover"
                  url="Api.rule.getRulesForDevice"
                  columns = {[{
                    title: 'Category', data: 'categoryName'
                  }, {
                    title: 'Name', data: 'name'
                  }]}
                  params = {{
                    deviceid: selectedLeft,
                    ruleCategory: 0,
                    severity: ''
                  }}
                  ref="ruleDeviceLeft"
                />
              </div>

              <div className={`${copyType === 'template' ? '' : 'hidden'}`}>

                <JDataTable
                  className="table-hover"
                  height="350px"
                  url="Api.rule.getByLogicalRuleId"
                  columns = {[{
                    title: 'Name', data: 'name'
                  }]}
                  params = {{
                    logicalRuleId: selectedLogical,
                    severity: ''
                  }}
                  ref="ruleTplLeft"
                />
              </div>
              <FiveButtonsBlock onClickArray={onClickBlockLeft} />
            </div>

            <div className="col-md-6">
              <div className="row">
                <label className="control-label col-md-2">To: </label>
                <div className="col-md-5">
                  <select
                    className="form-control"
                    onChange={onChangeGroups}
                  >
                    {groups.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
                <div className="col-md-5">
                  <select
                    className="form-control"
                    onChange={onChangeRight}
                    value={selectedRight}
                    ref="deviceRight"
                  >
                    {devicesRight.map(item =>
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>

              <JDataTable
                height="350px"
                className="table-hover"

                url="Api.rule.getRulesForDevice"
                columns = {[{
                  title: 'Category', data: 'categoryName'
                }, {
                  title: 'Name', data: 'name'
                }]}
                params = {{
                  deviceid: selectedRight,
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

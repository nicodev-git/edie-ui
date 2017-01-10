import React from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm, Field} from 'redux-form'
import {assign, concat, forOwn} from 'lodash'
import InlineEdit from 'react-edit-inline'

import RuleModalContainer from '../../../../../../containers/page/content/device/main/workflows/RuleModalContainer'
import CategoryModalContainer from 'containers/page/content/device/main/workflows/CategoryModalContainer'
import ActionModalContainer from 'containers/page/content/device/main/workflows/ActionModalContainer'

class MainWorkflowModal extends React.Component {

  constructor (props) {
    super(props)

    let rules = []
    if (props.editWorkflow) {
      forOwn(props.editWorkflow.rules || {}, (value, key) => {
        rules.push({key, value})
      })
    }
    rules.push({key: '', value: ''})

    this.state = {
      current: 1,
      steps: 3,

      rules,
      selectedRuleIndex: -1,

      actions: [],
      selectedActionIndex: -1
    }
  }

  componentWillMount () {
    this.props.fetchWorkflowCategories()
  }

  onHide () {

  }

  handleFormSubmit (values) {
    const {editWorkflow} = this.props
    const { rules } = this.state
    let props = assign({}, editWorkflow, values, { rules: {} })
    rules.forEach(r => {
      if (r.key) props.rules[r.key] = r.value
    })

    if (!props.name) return window.alert('Please type name.')

    if (editWorkflow) {
      this.props.updateDeviceWorkflow(props)
    } else {
      this.props.addDeviceWorkflow(props, this.props.device)
    }
  }

  onClickClose () {
    this.props.closeDeviceWorkflowModal()
  }

  onClickPrev () {
    let { current } = this.state
    current -= 1
    this.setState({ current })
  }

  onClickNext () {
    let { current } = this.state
    current += 1
    this.setState({ current })
  }

  onClickAddRule () {
    this.props.openDeviceRuleModal()
  }

  onClickEditRule () {
    const { selectedRuleIndex, rules } = this.state
    if (selectedRuleIndex < 0) return window.alert('Please select rule.')
    this.props.openDeviceRuleModal(rules[selectedRuleIndex])
  }

  onClickRemoveRule () {
    const { selectedRuleIndex, rules } = this.state
    if (selectedRuleIndex < 0) return window.alert('Please select rule.')
    this.setState({rules: rules.filter((r, index) => index !== selectedRuleIndex), selectedRuleIndex: -1})
  }

  onCloseRuleModal (data, isEdit) {
    if (!data) return

    const { rules, selectedRuleIndex } = this.state
    if (isEdit) {
      this.setState({rules: rules.map((r, index) => index === selectedRuleIndex ? data : r)})
    } else {
      this.setState({rules: concat(rules, data)})
    }
  }

  onClickAddCategory () {
    this.props.openWfCategoryModal()
  }

  onRuleChange (index, value) {
    console.log(value)
    let { rules } = this.state

    rules = rules.map((r, i) => i === index ? assign({}, r, value) : r)
    if (index === rules.length - 1) rules.push({key: '', value: ''})
    this.setState({ rules })
  }

  onClickAddAction () {
    this.props.openWfActionModal()
  }

  onClickEditAction () {

  }

  onClickRemoveAction () {

  }

  onCloseActionModal () {

  }

  renderRuleModal () {
    if (!this.props.ruleModalOpen) return null
    return (
      <RuleModalContainer onClose={this.onCloseRuleModal.bind(this)} />
    )
  }

  renderCategoryModal () {
    if (!this.props.wfCategoryModalOpen) return null
    return (
      <CategoryModalContainer />
    )
  }

  renderActionModal () {
    if (!this.props.wfActionModalOpen) return null
    return (
      <ActionModalContainer onClose={this.onCloseActionModal.bind(this)} />
    )
  }

  renderStep () {
    const {current, rules, selectedRuleIndex, actions, selectedActionIndex} = this.state

    if (current === 1) {
      return (
        <div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Name</label>
            <div className="col-md-9">
              <Field name="name" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Description</label>
            <div className="col-md-9">
              <Field name="desc" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Display Incident Description</label>
            <div className="col-md-9">
              <Field name="display_incident_desc" component="input" className="form-control"/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Category</label>
            <div className="col-md-8 pr-none">
              <Field name="category" component="select" className="form-control">
                {this.props.workflowCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Field>
            </div>
            <div className="col-md-1 text-right pl-none margin-sm-top">
              <a href="javascript:;" onClick={this.onClickAddCategory.bind(this)}><i className="fa fa-plus-square fa-x"/></a>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Severity</label>
            <div className="col-md-9">
              <Field name="severity" component="select" className="form-control">
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
                <option>AUDIT</option>
                <option>IGNORE</option>
                <option>IGNOREDELETE</option>
                <option>DEVICE</option>
              </Field>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Enabled</label>
            <div className="col-md-9">
              <Field name="enable" component="input" type="checkbox"/>
            </div>
          </div>
          {this.renderCategoryModal()}
        </div>
      )
    } else if (current === 2) {
      return (
        <div>
          <div>
            <span className="margin-md-right"><b>Rules</b></span>
            <a href="javascript:;" onClick={this.onClickRemoveRule.bind(this)} className="margin-sm-right"><i className="fa fa-trash-o"/></a>
          </div>
          <div className="margin-md-bottom">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
              {rules.map((r, index) =>
                <tr key={index} className={selectedRuleIndex === index ? 'selected' : ''} onClick={() => { if (index !== rules.length - 1) this.setState({ selectedRuleIndex: index }) }}>
                  <td width="50%">
                    <InlineEdit
                      activeClassName="editing"
                      text={r.key || '\u00a0'}
                      paramName="key"
                      change={this.onRuleChange.bind(this, index)}
                      style={{
                        width: '100%',
                        display: 'block'
                      }}
                    />
                  </td>
                  <td width="50%">
                    <InlineEdit
                      activeClassName="editing"
                      text={r.value || '\u00a0'}
                      paramName="value"
                      change={this.onRuleChange.bind(this, index)}
                      style={{
                        width: '100%',
                        display: 'block'
                      }}
                    />
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>

          {this.renderRuleModal()}
        </div>
      )
    } else if (current === 3) {
      return (
        <div>
          <div>
            <span className="margin-md-right"><b>Actions</b></span>
            <a href="javascript:;" onClick={this.onClickAddAction.bind(this)} className="margin-sm-right"><i className="fa fa-plus-square"/></a>
            <a href="javascript:;" onClick={this.onClickEditAction.bind(this)} className="margin-sm-right"><i className="fa fa-edit"/></a>
            <a href="javascript:;" onClick={this.onClickRemoveAction.bind(this)} className="margin-sm-right"><i className="fa fa-trash-o"/></a>
          </div>

          <div>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
              </thead>
              <tbody>
              {
                actions.map((a, index) =>
                  <tr key={a.name} className={selectedActionIndex === index ? 'selected' : ''} onClick={() => { this.setState({ selectedActionIndex: index }) }}>
                    <td>{a.name}</td>
                    <td>{a.type}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>

          {this.renderActionModal()}
        </div>
      )
    }
    return null
  }

  renderWizard () {
    const {current, steps} = this.state

    let markers = []
    for (let i = 0; i < steps; i++) {
      const cls = `marker ${current >= (i + 1) ? 'marker-checked' : ''}`
      markers.push(
        <div key={i} className={cls} style={{left: `${100 / steps * (i + 0.5)}%`}}>
          <div className="marker-label">{i + 1}</div>
        </div>
      )
    }

    return (
      <div>

        <div className="wizard-container m-none">
          <div className="wizard-progress hidden">
            {markers}

            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {this.renderStep()}

          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickClose.bind(this)}>Cancel</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              disabled={current === 1}
              onClick={this.onClickPrev.bind(this)}>Previous</a>

            { current < steps ? <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickNext.bind(this)}>Next</a> : null}
            { current === steps ? <button className="btn btn-primary btn-sm" type="submit">Finish</button> : null}

          </div>
        </div>
      </div>
    )
  }

  render () {
    const {handleSubmit} = this.props

    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message p-none">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            { this.renderWizard() }
          </form>
        </div>
      </Modal>

    )
  }
}

export default reduxForm({form: 'workflowForm'})(MainWorkflowModal)

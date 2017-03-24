import React, { Component } from 'react'
import InlineEdit from 'react-edit-inline'

export default class WorkflowStep2 extends Component {
  render () {
    const {onRemoveRule, rules, onRuleChange, onRuleClick, ruleModal, selected} = this.props
    return (
      <div>
        <div>
          <span className="margin-md-right"><b>Rules</b></span>
          <a href="javascript:;" onClick={onRemoveRule} className="margin-sm-right">
            <i className="fa fa-trash-o"/>
          </a>
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
              <tr key={index}
                className={selected === index ? 'selected' : ''}
                onClick={onRuleClick.bind(this, index)}>
                <td width="50%">
                  <InlineEdit
                    activeClassName="editing"
                    text={r.key || '\u00a0'}
                    paramName="key"
                    change={onRuleChange.bind(this, index)}
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
                    change={onRuleChange.bind(this, index)}
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
        {ruleModal}
      </div>
    )
  }
}

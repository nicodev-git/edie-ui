import React, { Component } from 'react'
import InlineEdit from 'components/common/ReactEditInline'
import DeleteIcon from '@material-ui/icons/Delete'
import {Chip, IconButton} from '@material-ui/core'

import { CardPanel } from 'components/modal/parts'
import { chipStyles } from 'style/common/materialStyles'

export default class WorkflowStep2 extends Component {
  render () {
    const {
      rules, onRuleChange, onRuleClick, ruleModal, selected,
      onClickKeyChip, onClickValueChip, onRemoveRule
    } = this.props
    return (
      <CardPanel title="Rules">
        <div>
          <div className="pull-left">
            <Chip style={chipStyles.chip} onClick={() => onClickKeyChip('KEY_RAW_DATA')} label="KEY_RAW_DATA"/>
          </div>
          <div className="pull-right" style={{marginTop: -5}}>
          </div>
          <div className="pull-right">
            <Chip style={chipStyles.chip} onClick={() => onClickValueChip('.*')} label=".*"/>
          </div>
        </div>
        <div className="margin-md-bottom">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th></th>
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
                <td className="text-right">
                  <IconButton onClick={() => setTimeout(onRemoveRule, 1)} className={index !== (rules.length - 1) ? '' : 'hidden'}>
                    <DeleteIcon nativeColor="#545454" className="link"/>
                  </IconButton>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        {ruleModal}
      </CardPanel>
    )
  }
}

import React, { Component } from 'react'
import InlineEdit from 'react-edit-inline'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import {Chip} from 'material-ui'

import { SubHeader } from './parts'
import { buttonStyle, iconStyle } from 'style/materialStyles'

export default class WorkflowStep2 extends Component {
  render () {
    const {
      onRemoveRule, rules, onRuleChange, onRuleClick, ruleModal, selected,
      onClickKeyChip, onClickValueChip
    } = this.props
    return (
      <div>
        <div className="text-plus-icon">
          <SubHeader name="Rules"/>
          <IconButton
            style={buttonStyle}
            iconStyle={iconStyle}
            onTouchTap={onRemoveRule}>
              <DeleteIcon color="#545454"/>
          </IconButton>
        </div>
        <div>
          <div className="pull-left">
            <Chip style={chipStyles.chip} onTouchTap={() => onClickKeyChip('KEY_RAW_DATA')}>
              KEY_RAW_DATA
            </Chip>
          </div>
          <div className="pull-right">
            <Chip style={chipStyles.chip} onTouchTap={() => onClickValueChip('.*')}>
              .*
            </Chip>
          </div>
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

import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import InlineEdit from 'react-edit-inline'
import { Field } from 'redux-form'
import {Dialog, Chip} from 'material-ui'

import { SubHeader, SubmitBlock, FormInput, FormSelect } from 'components/modal/parts'
import { buttonStyle, iconStyle, chipStyles } from 'style/common/materialStyles'

export default class ParserTypeModalView extends Component {
  render () {
    const {header, patterns, selectedIndex, onSubmit,
      onHide, onPatternChange, onDelete, onItemClick, onClickValueChip,
      tagModal, tags, onClickAddTag, onClickDeleteTag} = this.props
    return (
      <Dialog open title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <div className="form-column">
            <Field name="name" component={FormInput} label="name"/>
            <div>
              <Chip style={chipStyles.chip} onTouchTap={() => onClickValueChip('.*')}>
                .*
              </Chip>
            </div>
            <Field name="filters" component={FormInput} label="filters"/>
            <Field name="ignoredelete" component={FormSelect} label="IgnoreDelete" options={[{label: 'Ignore Delete', value: 'IGNOREDELETE'}]}/>
            <div style={chipStyles.wrapper}>
              <Chip style={chipStyles.chip} onTouchTap={onClickAddTag}><b>+</b></Chip>
              {tags.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onRequestDelete={() => onClickDeleteTag(i)}>{t}</Chip>
              )}
            </div>
            <div className="text-plus-icon">
              <SubHeader name="Patterns"/>
              <IconButton
                style={buttonStyle}
                iconStyle={iconStyle}
                onTouchTap={onDelete}>
                  <DeleteIcon color="#545454"/>
              </IconButton>
            </div>
          </div>
          <div style={{maxHeight: '300px', overflow: 'scroll'}}>
            <table className="table table-hover table-p-sm">
              <tbody>
              {
                patterns.map((a, index) =>
                  <tr
                    key={index}
                    className={selectedIndex === index ? 'selected' : ''}
                    onClick={onItemClick.bind(this, index)}>
                    <td>
                      <InlineEdit
                        activeClassName="editing"
                        text={a || '\u00a0'}
                        paramName="pattern"
                        change={onPatternChange.bind(this, index)}
                        style={{
                          width: '100%',
                          display: 'block'
                        }}
                      />
                    </td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
          <SubmitBlock name="Save" onClick={onHide}/>
        </form>
        {tagModal}
      </Dialog>
    )
  }
}

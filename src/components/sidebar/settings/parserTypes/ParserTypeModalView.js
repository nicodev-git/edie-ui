import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import InlineEdit from 'components/common/ReactEditInline'
import { Field } from 'redux-form'
import {Chip} from '@material-ui/core'

import { SubmitBlock, FormInput, FormSelect, Modal, CardPanel } from 'components/modal/parts'
import { chipStyles } from 'style/common/materialStyles'

export default class ParserTypeModalView extends Component {
  render () {
    const {header, patterns, selectedIndex, onSubmit,
      onHide, onPatternChange, onDelete, onItemClick, onClickValueChip,
      tagModal, tags, onClickAddTag, onClickDeleteTag} = this.props
    return (
      <Modal title={header} onRequestClose={onHide}>
        <form onSubmit={onSubmit}>
          <CardPanel title={header}>
            <div className="form-column">
              <Field name="name" component={FormInput} label="name"/>
              <div>
                <Chip style={chipStyles.chip} onClick={() => onClickValueChip('.*')} label=".*"/>
              </div>
              <Field name="filters" component={FormInput} label="filters"/>
              <Field name="ignoredelete" component={FormSelect} label="IgnoreDelete" options={[{label: 'Ignore Delete', value: 'IGNOREDELETE'}]}/>
            </div>
          </CardPanel>

          <CardPanel title="Tags">
            <div style={chipStyles.wrapper}>
              <Chip style={chipStyles.chip} onClick={onClickAddTag} label={<b>+</b>}/>
              {tags.map((t, i) =>
                <Chip key={i} style={chipStyles.chip} onDelete={() => onClickDeleteTag(i)} label={t}/>
              )}
            </div>
          </CardPanel>

          <CardPanel title="Patterns" tools={
            <IconButton onClick={onDelete}>
              <DeleteIcon nativeColor="#545454"/>
            </IconButton>
          }>
            <div style={{maxHeight: '300px', overflow: 'auto'}}>
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
          </CardPanel>
          <SubmitBlock name="Save"/>
        </form>
        {tagModal}
      </Modal>
    )
  }
}

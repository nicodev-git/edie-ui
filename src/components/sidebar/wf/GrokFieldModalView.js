import React, {Component} from 'react'
import AddIcon from '@material-ui/icons/AddCircle'

import {Field} from 'redux-form'
import {
  FormInput,
  FormSelect,
  SubmitBlock
} from 'components/modal/parts'

export default class GrokFieldModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  renderList () {
    const {values, onClickAddVal} = this.props
    return (
      <div>
        <table className="table table-hover">
          <thead>
          <tr>
            <td><AddIcon className="link" onClick={onClickAddVal}/></td>
          </tr>
          </thead>
          <tbody>
          {values.map((p, i) =>
            <tr key={i}>
              <td>{p}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  renderValue () {
    const {editGrokField} = this.props
    const {rule} = editGrokField
    if (rule === 'notMatchAll' || rule === 'matchAny') return this.renderList()
    return (
      <Field name="value" component={FormInput} floatingLabel={editGrokField.name}/>
    )
  }

  render() {
    const {
      onSubmit, ruleOptions, keyField
    } = this.props

    return (
      <div className="padding-sm">
        <form onSubmit={onSubmit}>
          {keyField === 'value' ? this.renderValue() : null}
          {keyField === 'rule' ? <Field name="rule" component={FormSelect} floatingLabel="Rule" options={ruleOptions}/> : null}
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}
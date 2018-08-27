import React, {Component} from 'react'
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
    const {values} = this.props
    return (
      <div>
        <table className="table table-hover">
          <thead>
          <tr>
            <td></td>
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

  render() {
    const {
      onSubmit, editGrokField, ruleOptions, keyField
    } = this.props

    return (
      <div className="padding-sm">
        <form onSubmit={onSubmit}>
          {keyField === 'value' ? <Field name="value" component={FormInput} floatingLabel={editGrokField.name}/> : null}
          {keyField === 'rule' ? <Field name="rule" component={FormSelect} floatingLabel="Rule" options={ruleOptions}/> : null}
          <SubmitBlock name="Save"/>
        </form>
      </div>
    )
  }
}
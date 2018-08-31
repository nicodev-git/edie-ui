import React, {Component} from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import {Field} from 'redux-form'
import {
  FormInput,
  FormSelect,
  SubmitBlock,
  Modal
} from 'components/modal/parts'

export default class ShapeModalView extends Component {
  handleFormSubmit (props) {
    this.props.onSave(props)
    this.props.onClose()
  }

  renderList () {
    const {values, onClickAddVal, onClickDeleteVal} = this.props
    return (
      <div>
        <AddIcon className="link" onClick={onClickAddVal}/>
        <div style={{height: 180, overflow: 'auto'}}>
          <table className="table table-hover">
            <tbody>
            {values.map((p, i) =>
              <tr key={i}>
                <td>{p}</td>
                <td><DeleteIcon className="link" onClick={() => onClickDeleteVal(i)}/></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
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
      onSubmit, onClose, ruleOptions, keyField
    } = this.props

    return (
      <Modal title="Shape" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <Field name="name" component={FormSelect} floatingLabel="Name" options={ruleOptions}/>
          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
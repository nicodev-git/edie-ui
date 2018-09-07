import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import {Field} from 'redux-form'
import {
  FormInput,
  FormSelect,
  SubmitBlock,
  CardPanel
} from 'components/modal/parts'

export default class OutputObjectModalView extends React.Component {
  render() {
    const {
      onSubmit
    } = this.props

    return (
      <Modal title="Output Object" onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Output Object">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>

          <CardPanel title="Vars">
            <table className="table table-hover">
              <tbody>

              </tbody>
            </table>
          </CardPanel>

          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
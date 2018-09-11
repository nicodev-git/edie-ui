import React from 'react'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import {Field} from 'redux-form'
import {
  FormInput,
  SubmitBlock,
  CardPanel,
  Modal
} from 'components/modal/parts'

export default class PlaybookObjectModalView extends React.Component {
  render() {
    const {
      onSubmit, onClose, vars, onClickAddVar, onClickDeleteVar
    } = this.props

    return (
      <Modal title="Output Object" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Output Object">
            <Field name="name" component={FormInput} floatingLabel="Name"/>
          </CardPanel>

          <CardPanel title="Vars" tools={<AddIcon className="link" onClick={onClickAddVar}/>}>
            <table className="table table-hover">
              <tbody>
              {vars.map((p, i) =>
                <tr key={i}>
                  <td>
                    {p}
                  </td>
                  <td>
                    <DeleteIcon className="link" onClick={() => onClickDeleteVar(i)}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </CardPanel>

          <SubmitBlock name="Save"/>
        </form>
      </Modal>
    )
  }
}
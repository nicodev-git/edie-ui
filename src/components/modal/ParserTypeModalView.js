import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import InlineEdit from 'react-edit-inline'
import { Field } from 'redux-form'
import { Header, SubHeader, SubmitBlock, FormInput } from './parts'
import { buttonStyle, iconStyle } from '../../style/materialStyles'

export default class ParserTypeModalView extends Component {
  render () {
    const {show, header, patterns, selectedIndex, onSubmit,
      onHide, onPatternChange, onDelete, onItemClick} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name={header} />
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={onSubmit}>
            <div className="form-column">
              <Field name="name" component={FormInput} label="name"/>
              <Field name="filters" component={FormInput} label="filters"/>
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
        </div>
      </Modal>
    )
  }
}

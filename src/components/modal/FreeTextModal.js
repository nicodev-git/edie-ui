import React, {Component} from 'react'
import {Field, Form} from 'redux-form'
import {
  FormInput, FormSelect,
  FormCheckbox,
  SubmitBlock,
  Modal,
  CloseIconButton,
  CardPanel
} from './parts'
import TextField from '@material-ui/core/TextField';

import FormMapping from './form/FormMapping'

const form = (
  <Form onSubmit = {onSubmit}>
     <div className={rowCls || 'form-column'}>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Free text"
            type="text"
            fullWidth
        /> 
     </div>
     <SubmitBlock name={buttonText}/>
  </Form>
)


class FreeTextModal extends  Component{
   constructor(props){
      super(props)
      this.state = {
        
      }
   }
   
   //const {header, onHide, onSubmit} = this.props;
   render(){
     const {header, onHide, onSubmit} = this.props
     return (
       <Modal title = {header}
          contentStyle={{width: 900, maxWidth: 'initial'}}
          onRequestClose = {onHide}>
           {form}
        </Modal>
     )
   }
}

export default FreeTextModal;
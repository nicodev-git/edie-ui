import React, {Component} from 'react'
//import {Field, Form} from 'redux-form'
import {
  SubmitBlock,
  Modal
} from './parts'
import TextField from '@material-ui/core/TextField';

class FreeTextModal extends  Component{
   constructor(props){
      super(props)
      this.state = {
        
      }
   }
   

   render(){
     const {header, onHide, onSubmit,buttonText, onChangeText} = this.props
     
     const form = (
       <form onSubmit = {onSubmit}>
          <div className={'form-column'}>
             <TextField
                 autoFocus required
                 margin="dense"
                 id="freeTextInput"
                 label="Free text"
                 onChange = {onChangeText}
                 fullWidth
             /> 
          </div>
          <SubmitBlock name={buttonText}/>
       </form>
     )
     
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
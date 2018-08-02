import React from 'react'
import {Field, Form} from 'redux-form'
import {
  FormInput, FormSelect,
  FormCheckbox,
  SubmitBlock,
  Modal,
  CloseIconButton,
  CardPanel
} from './parts'

import FormMapping from './form/FormMapping'

const headerStyle = {
  margin: 0,
  padding: '12px 24px',
  color: 'white',
  fontSize: 14,
  lineHeight: '32px',
  fontWeight: 400,
  background: 'rgb(50, 68, 84)'
}

const buildField = elem => {
  switch (elem.type || '') {
    case 'select':
      return (<Field
        key={elem.name.replace(/\s+/g, '')}
        name={elem.key || elem.name.toLowerCase().replace(/\s+/g, '')}
        component={FormSelect}
        floatingLabel={elem.name}
        options={elem.options}
        className="valign-top margin-lg-right"
        fullWidth={elem.fullWidth}
      />)
    case 'password':
      return (<Field
        key={elem.name.replace(/\s+/g, '')}
        name={elem.key || elem.name.toLowerCase().replace(/\s+/g, '')}
        type="password"
        component={FormInput}
        floatingLabel={elem.name}
        className="valign-top margin-lg-right"
        fullWidth={elem.fullWidth}
      />)
    case 'checkbox':
      return (<Field
        key={elem.name.replace(/\s+/g, '')}
        name={elem.key || elem.name.toLowerCase().replace(/\s+/g, '')}
        component={FormCheckbox}
        label={elem.name}
        className="valign-top margin-lg-right"
      />)
    default:
      return (<Field
        key={elem.name.replace(/\s+/g, '')}
        name={elem.key || elem.name.toLowerCase().replace(/\s+/g, '')}
        component={FormInput}
        floatingLabel={elem.name}
        className="valign-top margin-lg-right"
        fullWidth={elem.fullWidth}
      />)
  }
}

const SimpleModalForm = ({onHide, onSubmit, header, buttonText, content, noModal, embedded, rowCls, ...props}) => {
  let formInputs
  if (content.length === 1 && content[0].form) {
    const FormItems = FormMapping[content[0].form]
    formInputs = (
      <FormItems {...props}/>
    )
  } else {
    if (props.keyFieldMode) {
      formInputs = (
        <div className="padding-md">
          {content.filter(e => e.keyField).map(buildField)}
        </div>
      )
    } else {
      formInputs = (
        <CardPanel title="Details">
          {content.map(buildField)}
        </CardPanel>
      )
    }
  }
  const form = (
    <Form onSubmit={onSubmit}>
      <div className={rowCls || 'form-column'}>
        {formInputs}
      </div>
      <SubmitBlock name={buttonText}/>
    </Form>
  )

  if (noModal) {
    if (embedded) {
      return form
    } else {
      return (
        <div style={{width: 580}} className="relative">
          <div style={headerStyle}>{header}</div>
          <CloseIconButton onClick={onHide} color="white"/>
          <div style={{padding: '8px 48px 48px'}}>
            {form}
          </div>
        </div>
      )
    }

  }
  return (
    <Modal
      title={header}
      contentStyle={{width: 900, maxWidth: 'initial'}}
      onRequestClose={onHide}
    >
      {form}
    </Modal>
  )
}

export default SimpleModalForm

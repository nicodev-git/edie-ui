import React from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {RaisedButton} from 'material-ui'

import {CardPanel, FormInput} from 'components/modal/parts'

import {showAlert} from 'components/common/Alert'

class ServerRange extends React.Component {
  onSubmit (values) {
    if (!values.from || !values.to) {
      showAlert('Please type range')
      return
    }

    console.log(values)
    this.props.scanRange(values.from, values.to)
  }
  render () {
    const {handleSubmit} = this.props
    return (
      <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="padding-md-left padding-md-right">
          <div>
            <Field name="from" component={FormInput} floatingLabel="From" />
            <Field name="to" component={FormInput} floatingLabel="To" className="margin-md-left" />
            <RaisedButton label="Scan" type="submit"/>
          </div>
          <CardPanel title="Result">

            <div style={{minHeight: 300}}>

            </div>
          </CardPanel>
        </div>
      </Form>
    )
  }
}


export default connect(
  state => ({
    initialValues: {}
  })
)(reduxForm({form: 'rangeServerForm'})(ServerRange))

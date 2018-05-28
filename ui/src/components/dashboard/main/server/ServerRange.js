import React from 'react'
import { connect } from 'react-redux'
import { Form, Field, reduxForm } from 'redux-form'
import {Button} from '@material-ui/core'

import {CardPanel, FormInput} from 'components/modal/parts'

import {showAlert} from 'components/common/Alert'
import RefreshOverlay from 'components/common/RefreshOverlay'

class ServerRange extends React.Component {
  onSubmit (values) {
    if (!values.from || !values.to) {
      showAlert('Please type range')
      return
    }

    this.props.scanRange(values.from, values.to)
  }
  render () {
    const {handleSubmit, rangeScanResults, scanStatus} = this.props
    return (
      <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="padding-md-left padding-md-right">
          <div>
            <Field name="from" component={FormInput} floatingLabel="From" />
            <Field name="to" component={FormInput} floatingLabel="To" className="margin-md-left" />
            <Button variant="raised" type="submit">Scan</Button>
          </div>
          <CardPanel title="Result">
            <div style={{minHeight: 300}}>
              <table className="table">
                <thead>
                <tr>
                  <th>Host</th>
                  <th>IP</th>
                  <th>OS</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {rangeScanResults.map(p =>
                  <tr key={p.host || p.ip}>
                    <td>{p.host}</td>
                    <td>{p.ip}</td>
                    <td>{p.os}</td>
                    <td>{p.status}</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </CardPanel>

          {scanStatus === 'loading' && <RefreshOverlay/>}
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

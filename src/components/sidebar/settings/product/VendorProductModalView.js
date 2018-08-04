import React from 'react'
import { Field } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'

import {Button, AppBar, Toolbar, Typography} from '@material-ui/core'
import { FormInput, CardPanel } from 'components/modal/parts'

class SimulationModalView extends React.Component {
  render () {
    const {onSubmit} = this.props
    return (
      <div className="flex-1 padding-md">
        <form onSubmit={onSubmit}>

          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Vendor Product Info</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right" fullWidth/>
                </div>
                <div className="col-md-2 col-lg-2">
                  <Field name="version" component={FormInput} floatingLabel="Version" className="margin-md-right" fullWidth/>
                </div>
                <div className="col-md-8 col-lg-6">
                  <Field name="description" component={FormInput} floatingLabel="Description" className="margin-md-right" fullWidth/>
                </div>
              </div>
            </div>
          </div>




          <CardPanel title="Tags">

          </CardPanel>

          <CardPanel title="Classifiers">

          </CardPanel>

          <CardPanel title="Parsers">

          </CardPanel>

          <CardPanel title="Workflows">
          </CardPanel>

          <CardPanel title="Incidents">
          </CardPanel>

          <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
        </form>
      </div>
    )
  }
}

export default withStyles({})(SimulationModalView)
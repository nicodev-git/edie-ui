import React from 'react'
import { Form, Field } from 'redux-form'
import {Button, IconButton} from '@material-ui/core'
import ActionSearch from '@material-ui/icons/Search'

import { FormInput } from 'components/modal/parts'
import DateRangePicker from 'components/common/DateRangePicker'

export default class LogSearchFormView extends React.Component {
  renderDateLabel (label) {
    return (
      <Button variant="flat">{label}</Button>
    )
  }
  renderDatePicker () {
    const {
      startDate,
      endDate,
      onChangeDateRange
    } = this.props
    return (
      <DateRangePicker
        className="valign-top"
        startDate={startDate}
        endDate={endDate}
        onApply={onChangeDateRange}
        renderer={this.renderDateLabel.bind(this)}
        style={{marginTop: '4px'}}/>
    )
  }
  render () {
    const {
      onSearchKeyDown,
      onSubmit
    } = this.props
    return (
      <Form onSubmit={onSubmit}>
        <div style={{background: '#dadada', paddingLeft: 10}}>
          <div className="nowrap">
            <Field name="q" component={FormInput} label="Search" onKeyDown={onSearchKeyDown} style={{width: '90%'}} className="valign-top"/>
            <IconButton type="submit" className="valign-top"><ActionSearch /></IconButton>
          </div>
        </div>
      </Form>
    )
  }
}

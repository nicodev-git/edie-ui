import React from 'react'
import { reduxForm } from 'redux-form'
import {assign, concat} from 'lodash'
import moment from 'moment'

import GaugeWizardView from './GaugeWizardView'

class GaugeWizard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedSeverity: ['HIGH', 'MEDIUM'],
      dateFrom: moment().startOf('year').valueOf(),
      dateTo: moment().endOf('year').valueOf()
    }
  }

  componentWillMount () {
    this.props.fetchSysSearchOptions()
  }


  onChangeSeverity (e, index, values) {
    this.setState({
      selectedSeverity: values
    })
  }
  onChangeDateRange ({startDate, endDate}) {
    this.setState({
      dateFrom: startDate.valueOf(),
      dateTo: endDate.valueOf()
    })
  }

  getSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }
  handleFormSubmit (formProps) {
    const { extraParams, onFinish } = this.props

    const props = assign(
      {},
      formProps,
      extraParams
    )
    console.log(props)
    this.closeModal(true)
    onFinish && onFinish(null, props)
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }
  render () {
    const { handleSubmit, sysSearchOptions, monitors, title, formValues, templateName } = this.props

    const searchList = concat([], this.getSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    })).map(p => ({
      label: p.name,
      value: p.id
    }))

    const durationVisible = templateName !== 'Up/Down'

    return (
      <GaugeWizardView
        title={title}
        templateName={templateName}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        monitors={monitors}
        searchList={searchList}
        formValues={formValues}
        durationVisible={durationVisible}

        selectedSeverity={this.state.selectedSeverity}
        onChangeSeverity={this.onChangeSeverity.bind(this)}

        dateFrom={this.state.dateFrom}
        dateTo={this.state.dateTo}
        onChangeDateRange={this.onChangeDateRange.bind(this)}
      />
    )
  }
}
export default reduxForm({
  form: 'gaugeDeviceForm'
})(GaugeWizard)

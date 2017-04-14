import React from 'react'
import ReactDateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import {keys} from 'lodash'

export default class DateRangePicker2 extends React.Component {
  constructor (props) {
    super(props)

    let today = moment()
    let yesterday = moment().add(-1, 'days')

    let rangeConfig = {
      'Today': [
        today,
        today
      ],
      'Yesterday': [
        yesterday,
        yesterday
      ],
      'Last 7 Days': [
        moment().add(-6, 'days'),
        today
      ],
      'Last 30 Days': [
        moment().add(-30, 'days'),
        today
      ]
    }
    rangeConfig[moment().startOf('month').format('MMMM')] = [
      moment().startOf('month'),
      moment().endOf('month')
    ]
    rangeConfig[moment().add('-1', 'months').format('MMMM')] = [
      moment().add(-1, 'months').startOf('month'),
      moment().add(-1, 'months').endOf('month')
    ]

    rangeConfig[moment().startOf('years').format('YYYY')] = [
      moment().startOf('year'),
      moment().endOf('year')
    ]
    rangeConfig[moment().add('-1', 'years').format('YYYY')] = [
      moment().add('-1', 'years').startOf('year'),
      moment().add('-1', 'years').endOf('year')
    ]

    this.state = {
      rangeConfig
    }
  }

  onApply (e, dp) {
    this.props.onApply && this.props.onApply({
      startDate: dp.startDate,
      endDate: dp.endDate
    })
  }

  render () {
    const {rangeConfig} = this.state
    let { className, startDate, endDate, children, renderer } = this.props

    const startDateStr = (startDate || moment()).format('DD/MM/YYYY')
    const endDateStr = (endDate || moment()).format('DD/MM/YYYY')

    let label = ''

    keys(rangeConfig).forEach(key => {
      if (rangeConfig[key][0].format('DD/MM/YYYY') === startDateStr &&
        rangeConfig[key][1].format('DD/MM/YYYY') === endDateStr) {
        label = key
      }
    })

    if (!label) label = `${startDateStr} - ${endDateStr}`

    return (
      <ReactDateRangePicker
        ranges={rangeConfig}
        linkedCalendars
        opens="right"

        startDate={startDate}
        endDate={endDate}

        style={{display: 'inline-block'}}
        className={className}

        onApply={this.onApply.bind(this)}
      >
        <a href="javascript:;" className={renderer ? 'hidden' : ''}>{label}</a>
        {renderer ? renderer(label) : null}
        {children}
      </ReactDateRangePicker>
    )
  }
}

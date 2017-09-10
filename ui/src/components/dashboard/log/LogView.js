import React from 'react'
import { reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import { assign, debounce } from 'lodash'
import ReactTooltip from 'react-tooltip'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import { queryDateFormat } from 'shared/Global'

import LogSearchFormView from './LogSearchFormView'
import LogPapers from './LogPapers'
import DetailLogModal from './DetailLogModal'

import {parseDateRange} from 'util/Query'

import {parse} from 'query-string'
import {getRanges} from 'components/common/DateRangePicker'

class LogView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0,
      cols: [],
      anchorEl: null
    }
    this.tooltipRebuild = debounce(ReactTooltip.rebuild, 100)
  }

  componentWillMount () {
    const {q} = parse(this.props.location.search || {})

    if (q) {
      try {
        const {logViewParam} = this.props
        const parsed = JSON.parse(q)
        const params = assign(...logViewParam, parsed)

        this.props.updateViewLogParams(params, this.props.history)
        this.props.change('q', params.q || '')
      } catch (e) {
        console.log(e)
      }
    }
  }

  onResultCountUpdate (total, data) {
    // let {cols} = this.state
    // if (data && data.length) {
    //   cols = keys(data[0].entity)
    // }
    // this.setState({
    //   total,
    //   cols
    // })
    //
    // this.tooltipRebuild()
  }
  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      submit('logViewForm')
    }
  }

  onClickDetailView (row, index, page, pageSize) {
    const params = {
      q: this.props.logViewParam.q,
      from: 0,
      to: row.entity.timestamp,
      page: 0,
      size: 100,
      types: 'event',
      rowId: row.id
    }

    // console.log(`${row.entity.timestamp} Between ${params.dateFromEpoch} - ${params.dateToEpoch}`)

    this.props.showDetailLogModal(true, params)
  }

  handleFormSubmit (values) {
    const { q } = values

    const params = assign({}, this.props.logViewParam, {
      q: q || ''
    })
    this.props.updateViewLogParams(params, this.props.history)
  }

  onChangeRange ({startDate, endDate}) {
    this.props.updateViewLogParams(assign({}, this.props.logViewParam, {
      from: startDate.valueOf(),
      to: endDate.valueOf()
    }), this.props.history)
  }

  getParams () {
    const {queryParams} = this.props
    const parsed = this.parse(queryParams.q)

    const dateRange = parseDateRange(parsed, getRanges(), queryDateFormat)

    const ret = {
      // severity: getArrayValues(parsed, 'severity'),
      // monitorTypes: getArrayValues(parsed, 'monitortype'),
      // workflowNames: getArrayValues(parsed, 'workflows'),
      // tags: getArrayValues(parsed, 'tags'),
      // monitorName: getFieldValue(parsed, 'monitor'),
      // types: getArrayValues(parsed, 'type', collections.map(p => p.value)),
      ...dateRange
    }

    // if (ret.types.length === 1 && ret.types[0].toLowerCase() === 'all') ret.types = collections.map(p => p.value)
    // if (ret.severity.length === 1 && ret.severity[0].toLowerCase() === 'all') ret.severity = severities.map(p => p.value)

    return ret
  }


  renderDetailModal () {
    if (!this.props.detailLogModalOpen) return null
    return (
      <DetailLogModal
        {...this.props}
        revertRows
      />
    )
  }

  render () {
    const { handleSubmit, logViewParam } = this.props
    const { from, to } = logViewParam

    return (
      <TabPage>
        <TabPageHeader title="Log" style={{overflowX: 'auto', overflowY: 'visible'}}>
          <LogSearchFormView
            onSearchKeyDown={this.onSearchKeyDown.bind(this)}
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}

            startDate={from}
            endDate={to}
            onChangeDateRange={this.onChangeRange.bind(this)}
          />
        </TabPageHeader>
        <TabPageBody tabs={[]} tab={0} history={this.props.history} location={this.props.location} transparent>
          <div style={{height: '100%', position: 'relative'}}>
            <LogPapers
              url="/search/query"
              ref="table"
              rowMetadata={{'key': 'id'}}
              params={logViewParam}
              pageSize={1000}
              revertRows
              onClickView={this.onClickDetailView.bind(this)}
              onUpdateCount={this.onResultCountUpdate.bind(this)}
            />
          </div>
          {this.renderDetailModal()}
          <ReactTooltip/>
        </TabPageBody>
      </TabPage>
    )
  }
}

const LogViewForm = reduxForm({form: 'logViewForm'})(LogView)

export default connect(
  state => ({
    initialValues: {
      q: state.dashboard.logViewParam.q
    }
  })
)(LogViewForm)

import React from 'react'
import { reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import { assign, debounce, findIndex } from 'lodash'
import ReactTooltip from 'react-tooltip'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import LogSearchFormView from './LogSearchFormView'
import LogPapers from './LogPapers'
import DetailLogModal from './DetailLogModal'

import {parse} from 'query-string'
import {getRanges} from 'components/common/DateRangePicker'

class LogView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0,
      cols: [],
      data: [],
      anchorEl: null
    }
    this.tooltipRebuild = debounce(ReactTooltip.rebuild, 100)
  }

  checkParams () {
    const {q} = parse(this.props.location.search || {})

    if (!q) return false

    try {
      const {logViewParam} = this.props
      const parsed = JSON.parse(q)
      if (!parsed.monitorId) return false
      const params = assign(...logViewParam, parsed)

      this.props.updateViewLogParams(params, this.props.history)
      this.props.change('q', params.q || '')

      return true
    } catch (e) {
      console.log(e)
    }

    return false
  }

  componentWillMount () {
    if (!this.checkParams()) {
      this.props.history.replace('/')
    }
  }

  onResultCountUpdate (total, data) {
    this.setState({
      data
    })
  }
  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      submit('logViewForm')
    }
  }

  onClickDetailView (row) {
    const {logViewParam} = this.props
    const {data} = this.state

    const index = logViewParam.q ? findIndex(data, {id: row.id}) : 0


    const params = {
      query: {
        q: `(monitorid:${logViewParam.monitorId})`,
        // from: 0,
        // to: row.entity.timestamp,
        page: 0,
        size: 100,
        types: 'event',
      },
      data: logViewParam.q ? data : [row],
      index
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
    const {logViewParam} = this.props
    const ranges = getRanges()
    const from = ranges['Ever'][0].valueOf()
    const to = ranges['Ever'][1].valueOf()

    const queries = []
    if (logViewParam.q) queries.push(`("${logViewParam.q}")`)
    if (logViewParam.monitorId) queries.push(`(monitorid:${logViewParam.monitorId})`)

    return {
      q: queries.join(' AND '),
      from,
      to,
      types: 'event'
    }
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
    const { handleSubmit, logViewDevice } = this.props

    return (
      <TabPage>
        <TabPageHeader title={logViewDevice ? logViewDevice.name : 'Log'} style={{overflowX: 'auto', overflowY: 'visible'}}>
          <LogSearchFormView
            onSearchKeyDown={this.onSearchKeyDown.bind(this)}
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            startDate={0}
            endDate={0}
            onChangeDateRange={this.onChangeRange.bind(this)}
          />
        </TabPageHeader>
        <TabPageBody tabs={[]} tab={0} history={this.props.history} location={this.props.location} transparent>
          <div style={{height: '100%', position: 'relative'}}>
            <LogPapers
              url="/search/query"
              ref="table"
              rowMetadata={{'key': 'id'}}
              params={this.getParams()}
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

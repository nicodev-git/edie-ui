import React from 'react'
import { reduxForm, submit, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { merge, assign, concat, isArray, keys, findIndex, debounce } from 'lodash'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'
import {Popover, FlatButton, Chip} from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import InfiniteTable from 'components/common/InfiniteTable'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import { parseSearchQuery, guid, dateFormat, collections, severities, viewFilters } from 'shared/Global'
import { showConfirm } from 'components/common/Alert'
import {renderEntity} from 'components/common/CellRenderers'
import {chipStyles} from 'style/common/materialStyles'
import {getRanges, getRangeLabel} from 'components/common/DateRangePicker'

import LogSearchFormView from './LogSearchFormView'
import LogPapers from './LogPapers'

import {parse} from 'query-string'

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
    let params = assign({}, this.props.params)

    if (q) {
      try {
        const parsed = JSON.parse(q)
        const {query} = parsed
        const queryChips = parseSearchQuery(query)
        params = assign(params, parsed)

        this.props.updateSearchParams(params, this.props.history)
        this.props.replaceSearchWfs([])
        this.props.updateSearchTags([])
        this.props.updateSearchViewFilter('')
        this.props.resetViewCols()
        this.props.updateQueryChips(queryChips)
        this.props.change('query', '')
      } catch (e) {}
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

  handleFormSubmit (values) {
    const { query } = values

    const params = assign({}, this.props.logViewParam, {
      query
    })
    this.props.updateViewLogParams(params, this.props.history)
  }

  onChangeRange ({startDate, endDate}) {
    this.props.updateViewLogParams(assign({}, this.props.logViewParam, {
      dateFrom: startDate.format(dateFormat),
      dateTo: endDate.format(dateFormat)
    }), this.props.history)
  }

  render () {
    const { handleSubmit, selectedWf, logViewParam, monitorTemplates, searchTags, queryChips, selectedWfs } = this.props
    const { dateFrom, dateTo } = logViewParam

    return (
      <TabPage>
        <TabPageHeader title="Log" style={{overflowX: 'auto', overflowY: 'visible'}}>
          <LogSearchFormView
            onSearchKeyDown={this.onSearchKeyDown.bind(this)}
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}

            startDate={dateFrom}
            endDate={dateTo}
            onChangeDateRange={this.onChangeRange.bind(this)}
          />
        </TabPageHeader>
        <TabPageBody tabs={[]} tab={0} history={this.props.history} location={this.props.location} transparent>
          <div style={{height: '100%', position: 'relative'}}>
            <LogPapers
              url="/search/all"
              ref="table"
              rowMetadata={{'key': 'id'}}
              params={logViewParam}
              pageSize={1000}
              revertRows
              onUpdateCount={this.onResultCountUpdate.bind(this)}
            />
          </div>
          <ReactTooltip/>
        </TabPageBody>
      </TabPage>
    )
  }
}

const LogViewForm = reduxForm({form: 'logViewForm'})(LogView)
// const selector = formValueSelector('logViewForm')

export default connect(
  state => ({
    // initialValues: assign({}, state.search.params, {query: ''}),
    // selectedSearchOption: selector(state, 'searchOptionIndex')
  })
)(LogViewForm)

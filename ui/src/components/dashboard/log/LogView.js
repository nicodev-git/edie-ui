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
    this.cells = [{
      'displayName': ' ',
      'columnName': 'entity.id',
      'customComponent': (p) => {
        // const {viewFilter} = this.props
        const {rowData} = p
        const {entity} = rowData

        const viewFilter = viewFilters.log.name

        if (viewFilter === viewFilters.log.name) {
          if (!entity.dataobj) return <span/>
          return (
            <div style={chipStyles.wrapper}>
              <div className="inline-block flex-1">{entity.dataobj.line}</div>
            </div>
          )
        } else if (viewFilter === viewFilters.raw.name) {
          if (!entity.rawdata) return <span/>
          return (
            <div className="padding-sm bt-gray">{entity.rawdata}</div>
          )
        } else if (viewFilter === viewFilters.notNull.name) {

        }
        if (!entity) return <span/>
        const highlighted = this.getHighlighted(entity, rowData.highlights)

        const timeField = entity.startTimestamp ? 'startTimestamp' : 'timestamp'
        delete highlighted[timeField]

        const {severity, ...others} = highlighted
        const data = {
          type: rowData.type,
          [timeField]: entity[timeField],
          severity,
          ...others
        }
        if (!severity) delete data.severity
        const options = {
          notNull: viewFilter === viewFilters.notNull.name,
          timeField
        }
        return <div className="padding-sm bt-gray">{renderEntity(data, options)}</div>
      }
    }]
  }

  getHighlighted (entity, highlights) {
    let data = merge({}, entity)
    keys(highlights).forEach(path => {
      const highlighted = highlights[path]
      const pathElements = path.split('.')

      let el = data
      pathElements.forEach((pathEl, index) => {
        if (index === pathElements.length - 1) {
          if (isArray(el[pathEl])) {
            el = el[pathEl]
            el.forEach((item, index) => {
              if (highlighted.match(item)) el[index] = highlighted
            })
          } else {
            el[pathEl] = highlighted
          }
        } else {
          el = el[pathEl]
          if (isArray(el)) el = el[0]
        }
      })
    })

    return data
  }

  onResultCountUpdate (total, data) {
    let {cols} = this.state
    if (data && data.length) {
      cols = keys(data[0].entity)
    }
    this.setState({
      total,
      cols
    })

    this.tooltipRebuild()
  }
  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      submit('logViewForm')
    }
  }

  handleFormSubmit (values) {
  }

  onClickSearch () {
    submit('logViewForm')
    // this.props.submit(this.props.handleSubmit(this.handleFormSubmit.bind(this)))
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

            onClickSearch={this.onClickSearch.bind(this)}
          />
        </TabPageHeader>
        <TabPageBody tabs={[]} tab={0} history={this.props.history} location={this.props.location}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div className="flex-1 flex-vertical padding-sm">
              <div className="header-red">
                Content
                <div className="pull-right">
                  Total: {this.state.total}
                </div>
              </div>
              <div className="flex-1 table-no-gap">
                <InfiniteTable
                  url="/search/all"
                  cells={this.cells}
                  ref="table"
                  rowMetadata={{'key': 'id'}}
                  params={logViewParam}
                  pageSize={100}
                  showTableHeading={false}
                  revertRows
                  onUpdateCount={this.onResultCountUpdate.bind(this)}
                />
              </div>
            </div>
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

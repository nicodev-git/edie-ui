import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { assign, concat, keys, findIndex, debounce } from 'lodash'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'
import {Popover, Button, Chip, IconButton} from '@material-ui/core'
import NavigationClose from '@material-ui/icons/Close'
import PageViewIcon from '@material-ui/icons/Pageview'
import {parse} from 'query-string'
import QueryParser from 'lucene'

import InfiniteTable from 'components/common/InfiniteTable'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import { guid, collections, severities, viewFilters, queryDateFormat, anyFieldKey } from 'shared/Global'
import {renderEntity2, expandEntity, getHighlighted} from 'components/common/CellRenderers'
import {chipStyles} from 'style/common/materialStyles'
import {getRanges, getRangeLabel} from 'components/common/DateRangePicker'
import {showAlert} from 'components/common/Alert'

import {modifyArrayValues, getArrayValues, modifyFieldValue, getFieldValue, removeField, findField, queryToString, parseDateRange} from 'util/Query'

import SearchFormView from './SearchFormView'
import SearchSavePopover from './SearchSavePopover'
import WorkflowSelectModal from './WorkflowSelectModal'
import SavedSearchModal from './SavedSearchModal'
import RelDevicesModal from './RelDevicesModal'
import IrrelDevicesModal from './IrrelDevicesModal'
import SearchFieldsModal from './SearchFieldsModal'
import ViewFilterModal from './ViewFilterModal'

import SearchGraphModal from './SearchGraphModal'
import TagPickerModal from 'containers/settings/tag/TagPickerModalContainer'
import SearchMonitorModal from './SearchMonitorModal'
import MonitorGroupsModal from 'containers/settings/monitorgroup/MonitorGroupsModalContainer'
import EntityDetailModal from './EntityDetailModal'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {hasPermission} from 'shared/Permission'

class GenericSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0,
      cols: [],
      anchorEl: null,
      expanded: {},
      allExpanded: false,
      loading: false
    }
    this.tooltipRebuild = debounce(ReactTooltip.rebuild, 100)
    this.cells = [{
      'displayName': ' ',
      'columnName': 'entity.id',
      'customComponent': (p) => {
        const {viewFilter} = this.props
        const {expanded, allExpanded} = this.state
        const {rowData} = p
        const {entity} = rowData

        if (viewFilter === viewFilters.log.name) {
          const data = entity.dataobj || {}
          return (
            <div style={chipStyles.wrapper}>
              {<div className="inline-block flex-1">{data.line || entity.description || '[Empty]'}</div>}
              {data.file && <Chip style={chipStyles.smallChip} label={data.file}/>}
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
        let expand = expanded[entity.id]
        if (typeof expand === 'undefined') expand = allExpanded

        const highlighted = getHighlighted(entity, rowData.highlights)//expand ? this.getHighlighted(entity, rowData.highlights) : {...entity}

        const timeField = entity.startTimestamp ? 'startTimestamp' : 'timestamp'
        delete highlighted[timeField]

        const {severity, ...others} = highlighted
        const data = expandEntity({
          type: rowData.type,
          [timeField]: entity[timeField],
          severity,
          ...others
        })
        if (!severity) delete data.severity

        const {viewCols} = this.props
        if (viewCols.length > 0) {
          const remove = []
          keys(data).forEach(p => {
            if (viewCols.indexOf(p) < 0) remove.push(p)
          })
          remove.forEach(p => {
            delete data[p]
          })
        }

        const options = {
          notNull: viewFilter === viewFilters.notNull.name,
          timeField,
          limit: expand ? 0 : 750
        }
        const ret = renderEntity2(data, options)
        const isOverflow = ret.used >= options.limit

        return (
          <div className="padding-sm bt-gray">
            <div className="inline-block">
              {ret.node}
              {expand || !isOverflow ? null : <div className="bt-gradient"/>}
            </div>
            {isOverflow ? (
              <div className={`${expand ? 'position-collapse' : 'position-ab'} text-center`}>
                <img
                  src={`/resources/images/dashboard/${expand ? 'collapse' : 'expand'}.png`} width="32" alt=""
                  onClick={this.onClickExpand.bind(this, entity.id, expand)}/>
              </div>
            ) : null}
            <div className="position-abr link text-primary">
              <IconButton onClick={this.onClickEntityView.bind(this, rowData)}><PageViewIcon /></IconButton>
            </div>
          </div>
        )
      }
    }]


    this.onSearchKeyDown = this.onSearchKeyDown.bind(this)
    this.onClickStar = this.onClickStar.bind(this)
    this.onChangeCollection = this.onChangeCollection.bind(this)
    this.onClickWorkflow = this.onClickWorkflow.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onClickSearch = this.onClickSearch.bind(this)
    this.onChangeSeverity = this.onChangeSeverity.bind(this)
    this.onChangeDateRange = this.onChangeDateRange.bind(this)
    this.onClickIllustrate = this.onClickIllustrate.bind(this)
    this.onClickSavedSearch = this.onClickSavedSearch.bind(this)
    this.onClickRelDevices = this.onClickRelDevices.bind(this)
    this.onClickIrrelDevices = this.onClickIrrelDevices.bind(this)
    this.onKeyDownFreeText = this.onKeyDownFreeText.bind(this)
    this.onChangeMonitorType = this.onChangeMonitorType.bind(this)
    this.onClickViewFilter = this.onClickViewFilter.bind(this)
    this.onClickGraph = this.onClickGraph.bind(this)
    this.onClickTags = this.onClickTags.bind(this)
    this.onClickClearSearch = this.onClickClearSearch.bind(this)
    this.onClickSearchMonitor = this.onClickSearchMonitor.bind(this)
    this.onClickEntityView = this.onClickEntityView.bind(this)
    this.onClickToggleExpand = this.onClickToggleExpand.bind(this)
    this.onRowDblClick = this.onRowDblClick.bind(this)
    this.onResultCountUpdate = this.onResultCountUpdate.bind(this)
    this.onUpdateLoading = this.onUpdateLoading.bind(this)
  }

  componentWillMount () {
    const {searchFieldsVisible} = this.props
    const {filterType} = this.props.location.state || {}
    const {q, searchId} = parse(this.props.location.search || {})
    let params = assign({}, this.props.queryParams)

    this.props.fetchDevicesGroups()
    this.props.fetchWorkflows()
    this.props.fetchMonitorTemplates()
    this.props.fetchMonitorGroups()
    this.props.fetchTableViewCols()

    if (searchFieldsVisible) this.props.collapseSearchFields(!searchFieldsVisible)

    if (q) {
      try {
        const parsed = JSON.parse(q)
        params = assign(params, parsed, {
          draw: 1
        })
        this.props.updateSearchViewFilter(viewFilters.notNull.name)
        this.props.resetViewCols()
        this.updateQueryParams(params)
        this.props.change('query', params.q)

        const {freeText} = this.getParams(params)
        this.props.change('freeText', freeText)
      } catch (e) {}
    } else if (filterType) {
      let query = []
      if (filterType === 'today') {
        params.from = moment().startOf('day').valueOf()
        params.to = moment().endOf('day').valueOf()
      } else if (filterType === 'month') {
        params.from = moment().startOf('month').valueOf()
        params.to = moment().endOf('month').valueOf()
      } else if (filterType === 'open') {
        params.from = moment().startOf('year').valueOf()
        params.to = moment().endOf('year').valueOf()
        query.push('(fixed:false)')
      }
      query.push('(severity:HIGH OR MEDIUM)')

      const q = query.join(' AND ')
      params = assign(params, {
        q,
        types: ['incident'],
        draw: 1
      })

      this.props.updateSearchViewFilter(viewFilters.notNull.name)
      this.props.resetViewCols()
      this.updateQueryParams(params)
      this.props.change('query', q)
      this.props.change('freeText', '')
    } else if (searchId) {
      const searchList = this.getSearchList()
      const index = findIndex(searchList, {id: searchId})
      if (index >= 0) {
        this.onChangeSearchOption(searchList[index])
      }
    } else {
      this.onClickClearSearch()
    }
  }

  formatDate (time) {
    return moment(time).fromNow()
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

  getSearchList () {
    const {sysSearchOptions} = this.props
    const userOptions = this.getSearchOptions()
    const options = concat([], userOptions.map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))

    return options
  }

  getTableClass () {
    // const {viewFilter} = this.props
    // if (viewFilter === viewFilters.log.name) return 'table-no-border'
    return ''
  }

  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      this.props.submitForm('genericSearchForm')
    }
  }

  onClickExpand (id, ex) {
    const {expanded} = this.state
    expanded[id] = !ex
    this.setState({expanded})
  }

  onRowDblClick () {

  }

  onClickSearch () {
    this.props.submitForm('genericSearchForm')
  }

  parse (query, suppress = false) {
    try {
      const parsed = QueryParser.parse(query)
      if (!parsed) throw new Error()
      return parsed
    } catch (e) {
      if (!suppress) showAlert('Invalid query typed.')
    }
    return null
  }

  handleFormSubmit (values) {
    const { queryParams } = this.props
    const { query } = values

    const parsed = this.parse(query)
    if (!parsed) return

    console.log(parsed)
    console.log(QueryParser.toString(parsed))

    const params ={
      ...queryParams,
      q: query,
      draw: queryParams.draw + 1
    }
    this.updateQueryParams(params)

    const {freeText} = this.getParams(params)
    this.props.change('freeText', freeText)
  }

  getTypeChar (type) {
    switch (type) {
      case 'long':
      case 'boolean':
      case 'int':
        return '#'
      default:
        return 'a'
    }
  }

  updateQuery (newQuery) {
    if (newQuery === null) return

    this.props.change('query', newQuery)
    this.updateQueryParams({
      ...this.props.queryParams,
      q: newQuery
    })


    this.props.updateCurrentSavedSearch(null)
  }
  updateQueryParams (params) {
    const serviceParams = this.getServiceParams(params)
    this.props.updateQueryParams(params, serviceParams, this.props.history, this.props.searchFieldsVisible)
  }

  handleRequestClose () {
    this.props.closeFieldsPopover()
  }

  onClickField (field, e) {
    this.props.fetchFieldTopValues(field.path, this.props.params)
    this.props.openFieldsPopover(field, e.target)
  }

  onClickValue (value) {
    const { selectedField, params, queryChips } = this.props

    if (!selectedField) return
    this.props.closeFieldsPopover()
    this.props.change('query', '')
    this.props.change('freeText', '')

    const newQueryChips = concat([], queryChips, {name: selectedField.path, value})
    this.props.updateQueryChips(newQueryChips)
    this.props.updateSearchParams(assign({}, params, {
      query: newQueryChips.map(m => `${m.name}=${m.value}`).join(' and ')
    }), this.props.history)
  }

  onClickStar (e) {
    this.props.showSavedSearch(true)
  }

  onClickSaveSearch (values) {
    const { userInfo, queryParams, viewFilter, viewCols } = this.props
    if (!userInfo) return

    const option = {
      id: guid(),
      name: values.name,
      data: JSON.stringify(queryParams),
      viewFilter,
      viewCols
    }

    if (!values.searchId) {
      if (!values.name) return
      this.props.addSearchOption(userInfo, option)
    } else {
      const options = this.getSearchOptions()
      const index = findIndex(options, {id: values.searchId})
      if (index < 0) return
      this.props.updateSearchOption(userInfo, {
        ...options[index],
        data: JSON.stringify(queryParams),
        viewFilter,
        viewCols
      })
    }
    this.props.closeSearchSavePopover()
  }

  onChangeSearchOption (selectedSearch) {
    let found
    try {
      found = JSON.parse(selectedSearch.data)
    } catch (e) {
      found = {}
    }

    this.props.updateSearchViewFilter(selectedSearch.viewFilter || '')
    this.props.resetViewCols(selectedSearch.viewCols || [])
    this.updateQuery(found.q || '(type:all)')

    this.props.updateCurrentSavedSearch(selectedSearch.name)

    this.props.closeSearchSavePopover()
  }

  onClickWorkflow () {
    this.props.openSearchWfModal()
  }

  onClickSelectWorkflow () {
    const {selectedRowWf, formValues} = this.props
    if (!selectedRowWf) return
    const {workflowNames} = this.getParams()
    if (!workflowNames.includes(selectedRowWf.name)) {
      const newQuery = modifyArrayValues(formValues.query, 'workflows', [...workflowNames, selectedRowWf.name].map(p => `"${p}"`))
      this.updateQuery(newQuery)
    }

    this.props.closeSearchWfModal()
  }

  onClickRemoveWfChip (index) {
    const wf = this.props.selectedWfs[index]
    this.props.removeSearchWf(wf)
    this.props.updateSearchParams(assign({}, this.props.params, {
      workflow: this.props.selectedWfs.filter(m => m.id !== wf.id).map(m => m.id).join(',')
    }), this.props.history)
  }

  onChangeCollection (e) {
    const values = e.target.value
    if (!values.length) return
    const {formValues} = this.props

    const newQuery = modifyArrayValues(formValues.query, 'type', values)
    this.updateQuery(newQuery)
  }

  onChangeMonitorType (e) {
    const values = e.target.value
    const {formValues} = this.props

    const newQuery = modifyArrayValues(formValues.query, 'monitortype', values)
    this.updateQuery(newQuery)
  }

  onChangeSeverity (e) {
    const values = e.target.value
    const {formValues} = this.props

    const newQuery = modifyArrayValues(formValues.query, 'severity', values)
    this.updateQuery(newQuery)
  }

  onChangeDateRange ({startDate, endDate}) {
    const {formValues} = this.props

    const dateLabel = getRangeLabel(getRanges(), startDate, endDate, true)

    let newQuery
    if (dateLabel.label) {
      newQuery = modifyFieldValue(formValues.query, 'from', dateLabel.label, dateLabel.label.indexOf(' ') >= 0)
      const parsed = this.parse(newQuery)
      removeField(findField(parsed, 'to'))
      newQuery = queryToString(parsed)
    } else {
      newQuery = modifyFieldValue(formValues.query, 'from', startDate.format(queryDateFormat), true)
      newQuery = modifyFieldValue(newQuery, 'to', endDate.format(queryDateFormat), true)
    }
    this.updateQuery(newQuery)
  }

  onKeyDownFreeText (e) {
    if (e.keyCode === 13) {
      const {formValues} = this.props
      const newQuery = modifyFieldValue(formValues.query, anyFieldKey, e.target.value || null, true)
      this.updateQuery(newQuery)
    }
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

  onUpdateLoading (loading, page) {
    this.setState({loading})
  }

  onClickIllustrate () {
    this.props.showThreats(this.props.params)
    const {history} = this.props
    history.push({
      pathname: '/threatmap',
      query: {
        mode: 'replay'
      }
    })
  }
  onClickSavedSearch () {
    this.props.showSavedSearch(true)
  }
  onClickRelDevices (e) {
    this.props.showRelDevicesPopover(true, e.target)
  }
  onClickIrrelDevices () {
    this.props.showIrrelDevicesModal(true)
    this.props.fetchIrrelDevices(this.props.params)
  }
  onClickViewFilter () {
    this.props.showViewFilterModal(true)
  }
  onClickGraph () {
    this.props.showSearchGraphModal(true)
  }
  onClickTags (e) {
    this.props.showSearchTagModal(true)
  }
  onPickTag (selected) {
    const {formValues} = this.props
    const {tags} = this.getParams()

    selected.forEach(tag => {
      if (!tags.includes(tag.name)) tags.push(tag.name)
    })

    const newQuery = modifyArrayValues(formValues.query, 'tags', tags)
    this.updateQuery(newQuery)
  }
  onClickRemoveTagChip (index) {
    const {searchTags, updateSearchTags} = this.props
    const tags = searchTags.filter((p, i) => i !== index)
    updateSearchTags(tags)
    this.props.updateSearchParams(assign({}, this.props.params, {
      tag: tags.join(',')
    }), this.props.history)
  }
  onClickClearSearch () {
    const {updateSearchViewFilter, resetViewCols} = this.props
    updateSearchViewFilter(viewFilters.notNull.name)
    resetViewCols()

    const q = [
      '(type:all)',
      `(from:${moment().format('YYYY')})`
    ].join(' AND ')
    this.updateQueryParams({
      ...this.props.queryParams,
      draw: 1,
      q
    })
    this.props.change('query', q)
    this.props.change('freeText', '')
    this.props.updateCurrentSavedSearch(null)
  }

  onClickToggleFields () {
    const {searchFieldsVisible, collapseSearchFields} = this.props
    collapseSearchFields(!searchFieldsVisible)
    if (!searchFieldsVisible)  {
      this.props.fetchSearchFields(this.getServiceParams())
    }
  }

  onChangeMonitorId (monitors, devices) {
    const {formValues} = this.props
    let newQuery = modifyArrayValues(formValues.query, 'monitor', monitors.map(p => `"${p.name}"`))
    newQuery = modifyArrayValues(newQuery, 'device', devices.map(p => `"${p.name}"`))

    this.updateQuery(newQuery)
    this.props.showSearchMonitorModal(false)
  }

  getMonitorId(monitorName) {
    const {allDevices} = this.props
    let uid = ''
    allDevices.forEach(p => {
      const index = findIndex(p.monitors, {name: monitorName})
      if (index >= 0) {
        uid = p.monitors[index].uid
        return false
      }
    })
    return uid
  }

  onClickSearchMonitor () {
    this.props.showSearchMonitorModal(true)
  }

  onClickEntityView (data) {
    this.props.showEntityDetailModal(true, data)
  }

  redrawSearch () {
    // this.props.refreshSearch()
  }

  onClickToggleExpand () {
    const {allExpanded} = this.state
    this.setState({
      allExpanded: !allExpanded,
      expanded: {}
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  renderFields () {
    const {selectedField} = this.props
    return (
      <div style={{position: 'absolute', height: '100%', minWidth: '100%'}}>
        <div className="header-blue">
          Fields
        </div>
        {this.props.fields.map(f =>
          <div key={f.path} className={`field-item margin-xs-top nowrap ${selectedField && selectedField.path === f.path ? 'selected' : ''}`}>
            <span className="margin-sm-right text-gray">{this.getTypeChar(f.type)}</span>
            <div className="link text-primary" onClick={this.onClickField.bind(this, f)}>{f.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}</div>
            <span className="margin-sm-left text-gray">{f.count}</span>
          </div>
        )}
      </div>
    )
  }

  renderSavePopover () {
    const { savePopoverOpen, closeSearchSavePopover } = this.props
    if (!savePopoverOpen) return
    return (
      <SearchSavePopover
        {...this.props}
        onRequestClose={closeSearchSavePopover}
        onSubmit={this.onClickSaveSearch.bind(this)}
        userOptions={this.getSearchOptions()}

        onChangeSearchOption={this.onChangeSearchOption.bind(this)}
      />
    )
  }
  renderRelDevicesPopover () {
    if (!this.props.relDevicePopoverOpen) return null
    return (
      <RelDevicesModal {...this.props}/>
    )
  }
  renderIrrelDevicesModal () {
    if (!this.props.irrelDeviceModalOpen) return null
    return (
      <IrrelDevicesModal {...this.props}/>
    )
  }
  renderFieldPopover () {
    const { selectedField, fieldPopoverOpen, anchorEl } = this.props
    if (!selectedField) return
    return (
      <Popover
        open={fieldPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        style={{marginLeft: '100px'}}
        onClose={this.handleRequestClose.bind(this)}
      >
        <div className="padding-md-left">
          <div className="inline-block padding-sm">
            <h4>{selectedField.path}</h4>
          </div>
          <div className="pull-right padding-sm">
            <Button variant="flat" style={{minWidth: '44px'}} onClick={this.handleRequestClose.bind(this)}>
              <NavigationClose />
            </Button>
          </div>
        </div>

        <hr className="m-none" style={{borderColor: 'gray'}}/>

        <div className="padding-md-left padding-md-top">
          <div className="inline padding-sm">
            {selectedField.count} Values
          </div>
        </div>

        <div className="padding-md-left padding-lg-top">
          <div className="padding-sm">
            <b>Reports</b>
          </div>
          <div className="padding-sm">
            <div>
              <div className="col-md-4"><div className="link">Top values</div></div>
              <div className="col-md-4"><div className="link">Top values by time</div></div>
              <div className="col-md-4"><div className="link">Rare values</div></div>
              <div className="col-md-4"><div className="link">Events with this field</div></div>
            </div>

          </div>
        </div>

        <div style={{height: '400px', width: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th><b>Top 10 Values</b></th>
              <th>Count</th>
              <th>%</th>
              <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {
              this.props.fieldTopValues.map(m =>
                <tr key={m.name}>
                  <td>
                    <div className="link" onClick={this.onClickValue.bind(this, m.name)}>{m.name}</div>
                  </td>
                  <td>{m.count}</td>
                  <td>{(m.percent || 0).toFixed(2)}%</td>
                  <td>
                    <div style={{width: '200px'}}>
                      <img src="/resources/images/sidebar/search/bar.png" width={`${Math.max(m.percent || 0, 0.5)}%`} height="16" alt=""/>
                    </div>
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </Popover>
    )
  }

  renderWfSelectModal () {
    if (!this.props.wfModalOpen) return
    return (
      <WorkflowSelectModal {...this.props} onClickOK={this.onClickSelectWorkflow.bind(this)}/>
    )
  }

  renderSavedSearchModal (canEdit) {
    if (!this.props.savedSearchModalOpen) return
    return (
      <SavedSearchModal
        {...this.props}
        onAddSearch={this.onClickSaveSearch.bind(this)}
        onChangeSearchOption={this.onChangeSearchOption.bind(this)}
        userOptions={this.getSearchOptions()}
        canEdit={canEdit}
      />
    )
  }

  renderSearchFieldsModal () {
    if (!this.props.searchFieldsModalOpen) return null
    return (
      <SearchFieldsModal {...this.props}/>
    )
  }

  renderFilterViewModal () {
    if (!this.props.viewFilterModalOpen) return null
    return (
      <ViewFilterModal
        {...this.props}
        cols={this.state.cols}
        redrawSearch={this.redrawSearch.bind(this)}
      />
    )
  }

  renderSearchGraphModal () {
    if (!this.props.searchGraphModalOpen) return null
    return (
      <SearchGraphModal {...this.props}/>
    )
  }

  renderTagsModal () {
    if (!this.props.searchTagModalOpen) return null
    return (
      <TagPickerModal
        hideAdd
        onPickMulti={this.onPickTag.bind(this)}
        onClickClose={() => this.props.showSearchTagModal(false)}/>
    )
  }

  renderSearchMonitorModal () {
    if (!this.props.searchMonitorModalOpen) return null
    return (
      <SearchMonitorModal {...this.props} onClickOK={this.onChangeMonitorId.bind(this)}/>
    )
  }

  renderMonitorGroupsModal () {
    if (!this.props.monitorGroupsModalOpen) return null
    return (
      <MonitorGroupsModal/>
    )
  }

  renderEntityDetailModal () {
    if (!this.props.entityDetailModalOpen) return null
    return (
      <EntityDetailModal
        {...this.props}
      />
    )
  }

  renderFieldsView () {
    const {searchFieldsVisible} = this.props
    if (!searchFieldsVisible) return null
    return (
      <div style={{minWidth: '170px', height: '100%', overflow: 'auto', position: 'relative'}}>
        {this.renderFields()}
        {this.renderFieldPopover()}
      </div>
    )
  }

  getParams (queryParams) {
    if (!queryParams) queryParams = this.props.queryParams
    const parsed = this.parse(queryParams.q)

    const dateRange = parseDateRange(parsed, getRanges(), queryDateFormat)

    const ret = {
      severity: getArrayValues(parsed, 'severity'),
      monitorTypes: getArrayValues(parsed, 'monitortype'),
      workflowNames: getArrayValues(parsed, 'workflows'),
      tags: getArrayValues(parsed, 'tags'),
      monitorNames: getArrayValues(parsed, 'monitor'),
      deviceNames: getArrayValues(parsed, 'device'),
      types: getArrayValues(parsed, 'type', collections.map(p => p.value)),
      freeText: getFieldValue(parsed, anyFieldKey),
      eventLog: getFieldValue(parsed, 'eventlog'),
      ...dateRange
    }

    if (ret.types.length === 1 && ret.types[0].toLowerCase() === 'all') ret.types = collections.map(p => p.value)
    if (ret.severity.length === 1 && ret.severity[0].toLowerCase() === 'all') ret.severity = severities.map(p => p.value)

    return ret
  }

  getServiceParams (queryParams) {
    const { workflows, allDevices } = this.props
    if (!queryParams) queryParams = this.props.queryParams

    const { from, to, workflowNames, monitorNames, deviceNames, types, severity, eventLog } = this.getParams(queryParams)
    const parsed = this.parse(queryParams.q)

    removeField(findField(parsed, 'workflows'), true)
    removeField(findField(parsed, 'monitor'), true)
    removeField(findField(parsed, 'device'), true)
    removeField(findField(parsed, 'to'))
    removeField(findField(parsed, 'from'))
    removeField(findField(parsed, 'severity'), true)
    removeField(findField(parsed, 'type'), true)
    removeField(findField(parsed, 'eventlog'))

    const qs = []
    const q = queryToString(parsed)
    if (q) qs.push(q)

    //Workflow
    const workflowIds = []
    workflowNames.forEach(name => {
      const index = findIndex(workflows, {name})
      if (index >= 0) workflowIds.push(workflows[index].id)
    })
    if (workflowIds.length) {
      qs.push(`(workflowids:${workflowIds.join(' OR ')})`)
    }

    //Device
    const deviceIds = []
    deviceNames.forEach(name => {
      const index = findIndex(allDevices, {name})
      if (index >= 0) deviceIds.push(allDevices[index].id)
    })
    if (deviceIds.length) {
      qs.push(`(deviceid:${deviceIds.join(' OR ')})`)
    }

    //Monitor
    const monitorIds = []
    monitorNames.forEach(name => {
      const uid = this.getMonitorId(name)
      if (uid) monitorIds.push(uid)
    })
    if (monitorIds.length) {
      qs.push(`(monitorid:${monitorIds.join(' OR ')})`)
    }

    //Severity
    if (severity.length)
      qs.push(`(severity:${severity.join(' OR ')})`)

    //EventLog
    if (eventLog) {
      qs.push(`(${anyFieldKey}:${eventLog})`)
      qs.push(`(monitortype:log)`)
    }

    return {
      ...queryParams,
      q: qs.join(' AND '),
      from,
      to,
      types
    }
  }

  renderSidebarCollapse () {
    const {searchFieldsVisible} = this.props
    return (
      <div style={{width: 20, height: '100%', position: 'relative'}}>
        <img src={`resources/images/dashboard/${searchFieldsVisible ? 'backward' : 'forward'}.png`}
             width="20" height="48" alt=""
             className="link"
             style={{position: 'absolute', top: '50%', transform: 'translate(0, -50%)'}}
             onClick={this.onClickToggleFields.bind(this)}
        />
      </div>
    )
  }

  render () {
    const { handleSubmit, monitorTemplates, currentSavedSearch, userInfo } = this.props
    const { severity, monitorTypes, from, to, types, freeText } = this.getParams()

    const canEdit = hasPermission(userInfo, 'EditSearch')

    return (
      <TabPage>
        <TabPageBody tabs={[]} tab={0} history={this.props.history} location={this.props.location}>
          <div className="flex-vertical" style={{height: '100%', overflow: 'hidden'}}>
            <div style={{paddingTop: 10, paddingBottom: 20, backgroundColor: '#e5e7ec'}}>
              <SearchFormView
                onSearchKeyDown={this.onSearchKeyDown}
                onClickStar={this.onClickStar}
                collections={collections}
                selectedCollections={types}
                onChangeCollection={this.onChangeCollection}
                onClickWorkflow={this.onClickWorkflow}
                onSubmit={handleSubmit(this.handleFormSubmit)}
                onClickSearch={this.onClickSearch}
                severities={severities}
                selectedSeverities={severity}
                onChangeSeverity={this.onChangeSeverity}
                startDate={from}
                endDate={to}
                onChangeDateRange={this.onChangeDateRange}
                onClickIllustrate={this.onClickIllustrate}
                onClickSavedSearch={this.onClickSavedSearch}
                onClickRelDevices={this.onClickRelDevices}
                onClickIrrelDevices={this.onClickIrrelDevices}

                freeText={freeText}
                onKeyDownFreeText={this.onKeyDownFreeText}

                monitorTemplates={monitorTemplates}
                selectedMonitorTypes={monitorTypes}
                onChangeMonitorType={this.onChangeMonitorType}

                onClickViewFilter={this.onClickViewFilter}
                onClickGraph={this.onClickGraph}

                onClickTags={this.onClickTags}

                onClickClear={this.onClickClearSearch}

                onClickSearchMonitor={this.onClickSearchMonitor}

                onClickEntityView={this.onClickEntityView}
              />
              {this.renderRelDevicesPopover()}
              {this.renderIrrelDevicesModal()}
              {this.renderSavePopover()}
              {this.renderWfSelectModal()}
              {this.renderSavedSearchModal(canEdit)}
              {this.renderSearchFieldsModal()}
              {this.renderSearchGraphModal()}
            </div>
            <div className={currentSavedSearch ? 'padding-sm' : 'hidden'}>
              Saved Search: {currentSavedSearch}
            </div>
            <div className="flex-1">
              <div className="flex-horizontal" style={{height: '100%'}}>
                {this.renderFieldsView()}
                {this.renderSidebarCollapse()}
                <div className="flex-1 flex-vertical">
                  <div className="header-red">
                    Content
                    <div className="pull-right">
                      <div className="link margin-md-right" onClick={this.onClickToggleExpand}>
                        {this.state.allExpanded ? 'Collapse All' : 'Expand All'}
                      </div>
                      Total: {this.state.total}
                    </div>
                  </div>
                  <div className="flex-1 table-no-gap">
                    <InfiniteTable
                      url="/search/query"
                      cells={this.cells}
                      ref="table"
                      rowMetadata={{'key': 'id'}}
                      onRowDblClick={this.onRowDblClick}
                      params={this.getServiceParams()}
                      pageSize={20}
                      showTableHeading={false}
                      onUpdateCount={this.onResultCountUpdate}
                      onUpdateLoading={this.onUpdateLoading}
                      selectable
                    />
                    {this.state.loading && <RefreshOverlay/>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.renderFilterViewModal()}
          {this.renderTagsModal()}
          {this.renderSearchMonitorModal()}
          {this.renderMonitorGroupsModal()}
          {this.renderEntityDetailModal()}
          <ReactTooltip/>
        </TabPageBody>
      </TabPage>
    )
  }
}

const GenericSearchForm = reduxForm({form: 'genericSearchForm'})(GenericSearch)

export default connect(
  state => ({
    initialValues: {query: state.search.queryParams.q},
    formValues: formValueSelector('genericSearchForm')(state, 'query', 'searchOptionIndex', 'freeText')
  })
)(GenericSearchForm)

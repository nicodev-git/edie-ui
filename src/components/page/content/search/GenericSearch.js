import React from 'react'
import { reduxForm, submit, formValueSelector } from 'redux-form'
import { connect, concat } from 'react-redux'
import { assign } from 'lodash'
import moment from 'moment'
import {Popover, FlatButton, Chip} from 'material-ui'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'
import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'
import { imageBaseUrl } from 'shared/Global'

import SearchFormView from './SearchFormView'

class GenericSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.dateOptions = [{
      name: 'Last 24 hours',
      from: moment().add(-24, 'hours').valueOf(),
      to: moment().valueOf()
    }, {
      name: 'Any time',
      from: 0,
      to: 0
    }]

    this.cells = [{
      'displayName': 'Type',
      'columnName': 'type',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'Content',
      'columnName': 'entity.id',
      'customComponent': (props) => {
        const {rowData} = props
        if (!rowData.entity) return <span/>

        let data = JSON.stringify(assign({}, rowData.entity, rowData.highlights))
        // if (data.length > 500) data = `${data.substring(0, 500)}...`
        return <span dangerouslySetInnerHTML={{ __html: data }} />
      }
    }]
  }

  componentDidMount () {
    this.props.fetchSearchFields(this.props.params)
  }

  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      submit('genericSearchForm')
    }
  }

  onRowDblClick () {

  }

  parseQuery (query) {
    const matches = query.match(/([^ \\(\\)]*)=([^ \\(\\)]*)/gi)
    if (!matches || !matches.length) {
      if (query) return [{name: 'description', value: query}]
      return []
    }

    return matches.map(m => {
      const res = m.match(/([^ \\(\\)]*)=([^ \\(\\)]*)/)
      return {
        name: res[1],
        value: res[2]
      }
    })
  }

  handleFormSubmit (values) {
    const { queryChips } = this.props
    const { query } = values
    const newChips = this.parseQuery(query)

    this.props.updateQueryChips(concat([], queryChips, newChips))

    this.props.updateSearchParams({
      query: values.query,
      dateFrom: this.dateOptions[values.dateIndex].from,
      dateTo: this.dateOptions[values.dateIndex].to
    })

    this.props.change('query', '')
  }

  getTypeChar (type) {
    switch (type) {
      case 'long':
      case 'boolean':
      case 'int':
        return '#'
    }
    return 'a'
  }

  handleRequestClose () {
    this.props.closeFieldsPopover()
  }

  onClickField (field, e) {
    this.props.fetchFieldTopValues(field.name, this.props.params)
    this.props.openFieldsPopover(field, e.target)
  }

  onClickValue (value) {
    const { selectedField, currentQuery, params } = this.props

    if (!selectedField) return

    this.props.closeFieldsPopover()

    const query = `${currentQuery}${currentQuery ? ' and ' : ''}${selectedField.name}=${value}`
    this.props.change('query', query)

    this.props.updateSearchParams(assign({}, params, { query }))
  }

  onClickRemoveChip () {
  }

  renderFields () {
    const {selectedField} = this.props
    return (
      <div className="padding-sm">
        <h5>Fields</h5>
        {this.props.fields.map(f =>
          <div key={f.name} className={`field-item margin-xs-top ${selectedField && selectedField.name === f.name ? 'selected' : ''}`}>
            <span className="margin-sm-right text-gray">{this.getTypeChar(f.type)}</span>
            <a href="javascript:;" onClick={this.onClickField.bind(this, f)}>{f.name}</a>
            <span className="margin-sm-left text-gray">{f.count}</span>
          </div>
        )}

      </div>
    )
  }

  renderFieldPopover () {
    const { selectedField, fieldPopoverOpen, anchorEl } = this.props
    if (!selectedField) return
    return (
      <Popover
        open={fieldPopoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'center'}}
        targetOrigin={{horizontal: 'left', vertical: 'center'}}
        style={{marginLeft: '100px'}}
        onRequestClose={this.handleRequestClose.bind(this)}
      >
        <div className="padding-md-left">
          <div className="inline padding-sm">
            <h4>{selectedField.name}</h4>
          </div>
          <div className="pull-right padding-sm">
            <FlatButton icon={<NavigationClose />} style={{minWidth: '44px'}} onTouchTap={this.handleRequestClose.bind(this)}/>
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
              <div className="col-md-4"><a href="javascript:;">Top values</a></div>
              <div className="col-md-4"><a href="javascript:;">Top values by time</a></div>
              <div className="col-md-4"><a href="javascript:;">Rare values</a></div>
              <div className="col-md-4"><a href="javascript:;">Events with this field</a></div>
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
                    <a href="javascript:;" onClick={this.onClickValue.bind(this, m.name)}>{m.name}</a>
                  </td>
                  <td>{m.count}</td>
                  <td>{(m.percent || 0).toFixed(2)}%</td>
                  <td>
                    <div style={{width: '200px'}}>
                      <img src={`${imageBaseUrl}bar.png`} width={`${Math.max(m.percent || 0, 0.5)}%`} height="16"/>
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

  render () {
    const { handleSubmit } = this.props
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="text-center">
            <div className="inline">
              {this.props.queryChips.map(p =>
                <Chip
                  key={p.name}
                  style={{margin: 4}}
                  onRequestDelete={this.onClickRemoveChip.bind(this, p)}
                >
                  <b>{p.name}</b>: {p.value}
                </Chip>
              )}
            </div>
          </div>
          <SearchFormView
            onSearchKeyDown={this.onSearchKeyDown.bind(this)}
            dateOptions={this.dateOptions}
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          />
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={0}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div style={{width: '200px', height: '100%', overflow: 'auto'}}>
              {this.renderFields()}
              {this.renderFieldPopover()}
            </div>
            <div className="flex-1 flex-vertical">
              <ResponsiveInfiniteTable
                url="/search/all"
                cells={this.cells}
                ref="table"
                rowMetadata={{'key': 'id'}}
                selectable
                onRowDblClick={this.onRowDblClick.bind(this)}
                params={this.props.params}
              />
            </div>
          </div>

        </TabPageBody>
      </TabPage>
    )
  }
}

const GenericSearchForm = reduxForm({form: 'genericSearchForm'})(GenericSearch)

const selector = formValueSelector('genericSearchForm')
export default connect(
  state => ({
    initialValues: state.search.params,
    currentQuery: selector(state, 'query')
  })
)(GenericSearchForm)

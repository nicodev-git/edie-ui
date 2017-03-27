import React from 'react'
import { reduxForm, submit } from 'redux-form'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import moment from 'moment'
// import Popover from 'material-ui/Popover'

import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'
import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

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
        if (data.length > 500) data = `${data.substring(0, 500)}...`
        return <span dangerouslySetInnerHTML={{ __html: data }} />
      }
    }]
  }

  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      submit('genericSearchForm')
    }
  }

  onRowDblClick () {

  }

  handleFormSubmit (values) {
    this.props.updateSearchParams({
      query: values.query,
      dateFrom: this.dateOptions[values.dateIndex].from,
      dateTo: this.dateOptions[values.dateIndex].to
    })
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

  renderFields () {
    return (
      <div className="padding-sm">
        <h5>Fields</h5>
        {this.props.fields.map(f =>
          <div key={f.name} className="field-item padding-xs-top">
            <span className="margin-sm-right text-gray">{this.getTypeChar(f.type)}</span>
            <a href="javascript:;">{f.name}</a>
            <span className="margin-sm-left text-gray">{f.count}</span>
          </div>
        )}

      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <TabPage>
        <TabPageHeader title="Search">
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

export default connect(
  state => ({
    initialValues: state.search.params
  })
)(reduxForm({form: 'genericSearchForm'})(GenericSearch))

import React from 'react'
import { assign } from 'lodash'
import {SelectField, MenuItem, TextField} from 'material-ui'
import moment from 'moment'

import { errorStyle, underlineFocusStyle, underlineStyle, inputStyle,
  selectedItemStyle } from 'style/materialStyles'
import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

class GenericSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.dateOptions = [{
      name: 'Last 24 hours',
      from: moment().add(-24, 'hours').valueOf(),
      to: moment().valueOf()
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
      this.props.updateSearchParams(assign({}, this.props.params, {query: e.target.value}))
    }
  }

  onChangeDate (event, index, value) {
    console.log(value)
  }

  onRowDblClick () {

  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="text-center margin-md-top" >
            <TextField
              type="text"
              hintText="Search"
              errorStyle={errorStyle}
              inputStyle={inputStyle}
              underlineFocusStyle={underlineStyle}
              style={{width: '400px', verticalAlign: 'top'}}
              defaultValue={this.props.query}
              onKeyDown={this.onSearchKeyDown.bind(this)}
            />
            <SelectField
              errorStyle={errorStyle}
              underlineStyle={underlineFocusStyle}
              selectedMenuItemStyle={selectedItemStyle}
              menuItemStyle={inputStyle}
              labelStyle={inputStyle}
              value={this.props.dateIndex}
              onChange={this.onChangeDate.bind(this)}>
              {this.dateOptions.map((m, index) =>
                <MenuItem key={index} value={index} primaryText={m.name}/>
              )}
            </SelectField>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={0}>
          <ResponsiveInfiniteTable
            url="/search/all"
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            onRowDblClick={this.onRowDblClick.bind(this)}
            params={this.props.params}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}

export default GenericSearch

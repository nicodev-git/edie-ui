import React from 'react'

import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

class GenericSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

      severities: [
        { label: 'High', value: 'HIGH' },
        { label: 'Medium', value: 'MEDIUM' },
        { label: 'Low', value: 'LOW' },
        { label: 'Audit', value: 'AUDIT' },
        { label: 'Ignore', value: 'IGNORE' }
      ],

      selectedSeverity: ['HIGH', 'MEDIUM'],
      selectedDevices: [],
      afterStartTimestamp: '',
      beforeStartTimestamp: '',
      fixed: false,
      search: '',

      selectedIndex: -1,
      commentModalVisible: false,

      deviceModalVisible: false
    }

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
        let data = JSON.stringify(rowData.entity)
        if (data.length > 500) data = `${data.substring(0, 500)}...`
        return <span>{data}</span>
      }
    }]
  }

  onSearchKeyDown (e) {
    if (e.keyCode === 13) {
      this.props.updateSearchKeyword(e.target.value)
    }
  }

  onRowDblClick () {

  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="text-center margin-md-top" >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input
                type="text" placeholder="Search" className="form-control"
                style={{width: '400px', paddingLeft: '35px'}}
                defaultValue={this.props.keyword}
                onKeyDown={this.onSearchKeyDown.bind(this)}
                ref="search"/>
              <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
              </a>
            </div>

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
            params={{
              query: this.props.keyword || ''
            }}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}

export default GenericSearch

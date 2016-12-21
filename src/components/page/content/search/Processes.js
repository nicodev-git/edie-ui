import React from 'react'
import TimeAgo from 'react-timeago'

import InfiniteTable from '../../../shared/InfiniteTable'
import DateRangePicker from '../../../shared/DateRangePicker'

import { appendComponent, removeComponent } from '../../../../util/Component'
import ProcessModal from './ProcessModal'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

class Processes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name',
            // "cssClassName": "nowrap",
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Device',
      'columnName': 'devicename',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Owner',
      'columnName': 'owner',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Parent',
      'columnName': 'parent',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'FilePath',
      'columnName': 'filepath'
    }, {
      'displayName': 'LastSeen',
      'columnName': 'updated',
      'customComponent': (props) => {
        if (!props.data) return <span />

        return <TimeAgo date={props.data} />
      },
      'cssClassName': 'width-180'
    }]
  }

  render () {
    const defaultDate = 'Last 7 Days'// moment().startOf("month").format("MMMM")

    return (
            <TabPage>
                <TabPageHeader title="Search">
                    <div className="text-center margin-md-top" >
                        <div className="form-inline" style={{position: 'absolute'}}>

                            <div className="text-left"
                              style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>
                                <DateRangePicker onClickRange={this.onFilterChange}
                                  default={defaultDate} ref="dp">
                                    <i className="fa fa-caret-down margin-xs-left" />
                                </DateRangePicker>
                            </div>
                        </div>

                        <div style={{ position: 'relative', display: 'inline-block'}}>
                            <input type="text" placeholder="Search" className="form-control"
                              style={{width: '220px', paddingLeft: '35px'}}
                              onChange={this.onSearchKeyUp.bind(this)}
                              ref="search"/>
                            <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                                <i className="fa fa-search" />
                            </a>
                        </div>

                    </div>
                </TabPageHeader>

                <TabPageBody tabs={SearchTabs} tab={2} />
            </TabPage>
    )
  }

  renderTable () {
    return (
            <InfiniteTable
              url="/incidentstable/getAllProcessDT"
              params={this.props.filter}
              cells={this.cells}
              ref="table"
              rowMetadata={{'key': 'id'}}
              selectable
              bodyHeight={this.props.containerHeight}
              onRowDblClick={this.onRowDblClick.bind(this)}
            />
    )
  }

  onRowDblClick () {
    const selected = this.refs.table.getSelected()
    this.showProcessModal(selected)
  }

  showProcessModal (item) {
    appendComponent(
            <ProcessModal process={item} onClose={removeComponent}
              onChildClicked={this.showProcessModal.bind(this)}/>
        )
  }

    // //////////////////////////////////////////

  onSearchKeyUp (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onFilterChange()
    }, 200)
  }

  onFilterChange () {
    this.props.onFilterChange &&
        this.props.onFilterChange(this.getOptions())
  }
}

Processes.defaultProps = {}
export default Processes

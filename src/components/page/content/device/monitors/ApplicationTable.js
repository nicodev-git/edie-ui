import React, { Component } from 'react'

import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'

export default class ApplicationTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '/devices/getInstalledAppsForDevice',
      params: {
        deviceid: this.props.device.id,
        search: ''
      }
    }

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'name',
      'cssClassName': 'nowrap'
    }, {
      'displayName': 'InstallDate',
      'columnName': 'installdate',
      'cssClassName': 'width-140',
      'customComponent': (props) => {
        let val = props.data
        if (!val) return <span />
        val = `${val.substring(0, 4)}-${
                    val.substring(4, 6)}-${
                    val.substring(6)}`

        return <span>{val}</span>
      }
    }, {
      'displayName': 'Version',
      'columnName': 'version',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Publisher',
      'columnName': 'publisher',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Size',
      'columnName': 'size',
      'cssClassName': 'width-120'
    }]
  }

  componentWillMount () {

  }

  // render2 () {
  //   return (
  //           <InfiniteTable
  //             url={this.state.url}
  //             params={this.state.params}
  //             cells={this.columns}
  //             ref="table"
  //             rowMetadata={{'key': 'id'}}
  //             bodyHeight={this.props.containerHeight}
  //             selectable
  //           />
  //   )
  // }

  render () {
    return (
      <ResponsiveInfiniteTable
        cells={this.state.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        bodyHeight={this.props.containerHeight}
        selectable

        useExternal={false}
        data={this.props.apps}
      />
    )
  }
}

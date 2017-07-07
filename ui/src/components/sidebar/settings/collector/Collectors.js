import React from 'react'

import CollectorTabs from './CollectorTabs'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

export default class Collectors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'description'
    }, {
      'displayName': 'User Name',
      'columnName': 'username'
    }]
  }

  renderContent () {
    // return (
    //   <InfiniteTable
    //     cells={this.cells}
    //     ref="credentials"
    //     rowMetadata={{'key': 'id'}}
    //     selectable
    //     onRowDblClick={this.onEditCred.bind(this)}
    //
    //     useExternal={false}
    //     data={this.props.credentials}
    //   />
    // )
  }

  getTable () {
    return this.refs.credentials
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <CollectorTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={7} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}

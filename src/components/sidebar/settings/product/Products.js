import React from 'react'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import {hasPermission} from 'shared/Permission'

const styles = {
  avatar: {
    color: blue[300],
    backgroundColor: indigo[900]
  }
}
export default class Tags extends React.Component {
  componentWillMount () {
  }

  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Products">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              {/*{canEdit && <Button variant="raised" onClick={this.onAddTag.bind(this)}>Add</Button>}&nbsp;*/}
              {/*{canEdit && <Button variant="raised" onClick={this.onEditTag.bind(this)}>Edit</Button>}&nbsp;*/}
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location}>
          <div className="padding-md">
            <div><b>Tags</b></div>
            {this.renderTags(canEdit)}
            <div>Related</div>
            {this.renderItems()}
          </div>
          {this.renderTagModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
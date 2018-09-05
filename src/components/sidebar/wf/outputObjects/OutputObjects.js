import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import {Button} from "@material-ui/core";

export default class OutputObjects extends React.Component {
  onClickAdd () {

  }

  render() {
    return (
      <TabPage>
        <TabPageHeader title="Output Objects">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>

        </TabPageBody>
      </TabPage>
    )
  }
}
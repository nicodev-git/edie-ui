import React from 'react'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

class parserTypes extends React.Component {
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <ButtonGroup>

                <Button>Add</Button>
                <Button>Edit</Button>
                <Button>Remove</Button>

              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={8}>
          Parser Types
        </TabPageBody>
      </TabPage>
    )
  }
}

export default parserTypes

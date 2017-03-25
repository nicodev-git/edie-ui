import React from 'react'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

class GenericSearch extends React.Component {
  onSearchKeyUp (e) {
    this.props.updateSearchKeyword(e.target.value)
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="text-center margin-md-top" >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input
                type="text" placeholder="Search" className="form-control"
                style={{width: '220px', paddingLeft: '35px'}}
                value={this.props.keyword || ''}
                onChange={this.onSearchKeyUp.bind(this)}
                ref="search"/>
              <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
              </a>
            </div>

          </div>
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={0}>
          Generic
        </TabPageBody>
      </TabPage>
    )
  }
}

export default GenericSearch

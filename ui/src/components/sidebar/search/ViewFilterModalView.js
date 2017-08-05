import React from 'react'
import {Dialog, Checkbox} from 'material-ui'
import {keys} from 'lodash'

import {TwoButtonsBlockCustom} from 'components/modal/parts'

import {Tabs, Tab} from 'material-ui/Tabs'
import {viewFilters} from 'shared/Global'

export default class ViewFilterModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, selectViewFilter, selectedViewFilter, cols} = this.props
    return (
      <Dialog open title="View Filter" onRequestClose={onClickClose}>
        <Tabs>
          <Tab label="Predefined">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {keys(viewFilters).map(k =>
                  <tr
                    key={k}
                    onClick={() => selectViewFilter(viewFilters[k].name)}
                    className={selectedViewFilter === viewFilters[k].name ? 'selected' : ''}>
                    <td>{viewFilters[k].name}</td>
                    <td>{viewFilters[k].desc}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Tab>
          <Tab label="Specific">
            <div style={{maxHeight: 300}}>
            </div>
            <table className="table table-hover">
              <tbody>
              {cols.map(k =>
                <tr key={k}>
                  <td><Checkbox label={k}/></td>
                </tr>
              )}
              </tbody>
            </table>
          </Tab>
        </Tabs>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
      </Dialog>
    )
  }
}

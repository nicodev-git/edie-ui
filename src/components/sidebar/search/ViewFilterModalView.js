import React from 'react'
import {Checkbox} from '@material-ui/core'
import {keys} from 'lodash'
import { FormControlLabel } from '@material-ui/core'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

import {Tabs, Tab} from '@material-ui/core'
import {viewFilters} from 'shared/Global'

export default class ViewFilterModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, selectViewFilter, selectedViewFilter, cols, viewCols, selectedTab, onChangeTab} = this.props
    return (
      <Modal title="View Filter" onRequestClose={onClickClose}>
        <CardPanel title="View Filter">
          <Tabs value={selectedTab} onChange={onChangeTab}>
            <Tab label="Predefined" value="pre"/>
            <Tab label="Specific" value="spec"/>
          </Tabs>

          {selectedTab === 'pre' ? (
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
          ) : null}

          {selectedTab === 'spec' ? (
            <div style={{maxHeight: 300, overflow: 'auto'}}>
              <table className="table table-hover">
                <tbody>
                {cols.map(k =>
                  <tr key={k}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox checked={viewCols.indexOf(k) >= 0} onChange={() => this.props.toggleViewCol(k)}/>
                        }
                        label={k}
                      />
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          ) : null}

        </CardPanel>
        <TwoButtonsBlockCustom name2="OK" action2={onClickOK}/>
      </Modal>
    )
  }
}

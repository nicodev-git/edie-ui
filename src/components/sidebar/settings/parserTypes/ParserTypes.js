import React from 'react'
import {Button} from '@material-ui/core'
import { assign, concat } from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import InfiniteTable from 'components/common/InfiniteTable'
import ParserTypeModal from './ParserTypeModal'
import SimulationModal from './SimulationModal'

import WfTabs from '../tag/TagTabs'
import { showAlert } from 'components/common/Alert'
import {hasPermission} from 'shared/Permission'

class ParserTypes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Filters',
      'columnName': 'filters'
    }, {
      'displayName': 'IgnoreDelete',
      'columnName': 'ignoredelete'
    }, {
      'displayName': 'Tags',
      'columnName': 'tags',
      'customComponent': p => {
        return <div>{(p.data || []).join(', ')}</div>
      }
    }]
  }
  componentWillMount () {
    // this.props.fetchParserTypes()
  }

  getTable () {
    return this.refs.table
  }

  onClickAdd () {
    this.props.openParserTypeModal()
  }

  onClickEdit () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select parser type.')
    this.props.openParserTypeModal(selected)
  }

  onClickRemove () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select parser type.')
    this.props.removeParserType(selected)
  }

  onClickSimulation () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select parser type.')

    let filterChips = (selected.filters || '').split('.*|.*').filter(t => !!t)
    if (filterChips.length > 1) {
      filterChips = filterChips.map((t, i) => {
        if (i === 0) return `${t}.*`
        if (i === filterChips.length - 1) return `.*${t}`
        return `.*${t}.*`
      })
    }

    const type = assign({}, {
      filterChips,
      patterns: concat([], selected.patterns)
    })
    this.props.openSimulationModal(type)
  }

  renderParserTypeModal () {
    if (!this.props.parserTypeModalOpen) return null
    return (
      <ParserTypeModal {...this.props}/>
    )
  }

  renderSimulationModal () {
    if (!this.props.simulationModalOpen) return null
    return (
      <SimulationModal {...this.props}/>
    )
  }

  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="ParserTypes">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              {canEdit && <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onClickEdit.bind(this)}>Edit</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onClickRemove.bind(this)}>Remove</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onClickSimulation.bind(this)}>Simulation</Button>}&nbsp;
              <WfTabs history={this.props.history}/>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location} transparent>
          <InfiniteTable
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            onRowDblClick={canEdit ? this.onClickEdit.bind(this) : null}
            rowHeight={40}
            url="/parsertype"
            params={{
              draw: this.props.parserTypeDraw
            }}
          />

          {this.renderParserTypeModal()}
          {this.renderSimulationModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

export default ParserTypes

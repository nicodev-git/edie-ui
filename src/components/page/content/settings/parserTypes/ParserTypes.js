import React from 'react'
import {
  ButtonGroup,
  Button
} from 'react-bootstrap'
import { assign, concat } from 'lodash'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'
import ParserTypeModal from './ParserTypeModal'
import SimulationModal from './SimulationModal'

import { showAlert } from 'components/shared/Alert'

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
    }]
  }
  componentWillMount () {
    // this.props.fetchParserTypes()
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
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

    let filterChips = selected.filters.split('.*|.*').filter(t => !!t)
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
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <ButtonGroup>

                <Button onClick={this.onClickAdd.bind(this)}>Add</Button>
                <Button onClick={this.onClickEdit.bind(this)}>Edit</Button>
                <Button onClick={this.onClickRemove.bind(this)}>Remove</Button>
                <Button onClick={this.onClickSimulation.bind(this)}>Simulation</Button>

              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={8}>
          <ResponsiveInfiniteTable
            cells={this.cells}
            ref="table"
            rowMetadata={{'key': 'id'}}
            selectable
            onRowDblClick={this.onClickEdit.bind(this)}
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

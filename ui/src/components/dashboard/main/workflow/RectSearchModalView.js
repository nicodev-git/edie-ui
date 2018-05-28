import React from 'react'
import InfiniteTable from 'components/common/InfiniteTable'
import {IconButton} from '@material-ui/core'
import PageViewIcon from '@material-ui/icons/Pageview'

import {Modal, CardPanel} from 'components/modal/parts'
import {renderEntity2, expandEntity, getHighlighted} from 'components/common/CellRenderers'

export default class RectSearchModalView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allExpanded: false,
      total: 0,
      expanded: {}
    }
    this.cells = [{
      'displayName': ' ',
      'columnName': 'entity.id',
      'customComponent': (p) => {
        // const {viewFilter} = this.props
        const {expanded, allExpanded} = this.state
        const {rowData} = p
        const {entity} = rowData

        // if (viewFilter === viewFilters.log.name) {
        //   const data = entity.dataobj || {}
        //   return (
        //     <div style={chipStyles.wrapper}>
        //       {<div className="inline-block flex-1">{data.line || entity.description || '[Empty]'}</div>}
        //       {data.file && <Chip style={chipStyles.smallChip} >{data.file}</Chip>}
        //     </div>
        //   )
        // } else if (viewFilter === viewFilters.raw.name) {
        //   if (!entity.rawdata) return <span/>
        //   return (
        //     <div className="padding-sm bt-gray">{entity.rawdata}</div>
        //   )
        // } else if (viewFilter === viewFilters.notNull.name) {
        //
        // }
        if (!entity) return <span/>
        let expand = expanded[entity.id]
        if (typeof expand === 'undefined') expand = allExpanded

        const highlighted = getHighlighted(entity, rowData.highlights)//expand ? this.getHighlighted(entity, rowData.highlights) : {...entity}

        const timeField = entity.startTimestamp ? 'startTimestamp' : 'timestamp'
        delete highlighted[timeField]

        const {severity, ...others} = highlighted
        const data = expandEntity({
          type: rowData.type,
          [timeField]: entity[timeField],
          severity,
          ...others
        })
        if (!severity) delete data.severity


        const options = {
          notNull: false,
          timeField,
          limit: expand ? 0 : 750
        }
        const ret = renderEntity2(data, options)
        const isOverflow = ret.used >= options.limit

        return (
          <div className="padding-sm bt-gray">
            <div className="inline-block">
              {ret.node}
              {expand || !isOverflow ? null : <div className="bt-gradient"/>}
            </div>
            {isOverflow ? (
              <div className={`${expand ? 'position-collapse' : 'position-ab'} text-center`}>
                <img
                  src={`/resources/images/dashboard/${expand ? 'collapse' : 'expand'}.png`} width="32" alt=""
                  onClick={this.onClickExpand.bind(this, entity.id, expand)}/>
              </div>
            ) : null}
            <div className="position-abr link text-primary">
              <IconButton onClick={() => this.props.onRowDblClick(rowData)}><PageViewIcon /></IconButton>
            </div>
          </div>
        )
      }
    }]

    this.onResultCountUpdate = this.onResultCountUpdate.bind(this)
    this.onClickToggleExpand = this.onClickToggleExpand.bind(this)
  }

  onClickExpand (id, ex) {
    const {expanded} = this.state
    expanded[id] = !ex
    this.setState({expanded})
  }

  onClickToggleExpand () {
    const {allExpanded} = this.state
    this.setState({
      allExpanded: !allExpanded,
      expanded: {}
    })
  }

  onResultCountUpdate (total, data) {
    this.setState({total})
  }

  render () {
    const {onHide, name, params, onRowDblClick} = this.props
    return (
      <Modal title="Search Result" onRequestClose={onHide} contentStyle={{width: '90%', maxWidth: 'initial'}}>
        <CardPanel title="Result">
          <div className="header-red">
            {name}
            <div className="pull-right">
              <div className="link margin-md-right" onClick={this.onClickToggleExpand}>
                {this.state.allExpanded ? 'Collapse All' : 'Expand All'}
              </div>
              Total: {this.state.total}
            </div>
          </div>
          <div className="table-no-gap" style={{height: 500, position: 'relative'}}>
            <InfiniteTable
              url="/search/query"
              cells={this.cells}
              ref="table"
              rowMetadata={{'key': 'id'}}
              onRowDblClick={onRowDblClick}
              params={params}
              pageSize={10}
              showTableHeading={false}
              selectable
              onUpdateCount={this.onResultCountUpdate}
            />
          </div>
        </CardPanel>
      </Modal>
    )
  }
}

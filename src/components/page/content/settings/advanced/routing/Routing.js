import React from 'react'
import Dimensions from 'react-dimensions'

import InfiniteTable from '../../../../../shared/InfiniteTable'
import { appendComponent, removeComponent } from '../../../../../../util/Component'
import { showAlert } from '../../../../../shared/Alert'

import RoutingModal from './RoutingModal'

class Routing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Filter Type',
      'columnName': 'filterType',
      'customComponent': (props) => {
        let val = props.data

        if (val === 'ip') return <span>Device IP</span>
        if (val === 'text') return <span>Text</span>

        return <span>{val}</span>
      }
    }, {
      'displayName': 'Value',
      'columnName': 'value'
    }, {
      'displayName': 'Groups and Users',
      'columnName': 'targets',
      'customComponent': (props) => {
        let val = props.data

        if (!val) return <span />
        let str = ''

        val.forEach(user => {
          if (str) str += ', '
          str += user.targetName
        })

        return <span>{str}</span>
      }
    }]

        // this.listeners = {
        //     [EVENTS.ROUTING_ADD_CLICKED]: this.onAddRouting.bind(this),
        //     [EVENTS.ROUTING_EDIT_CLICKED]: this.onEditRouting.bind(this),
        // }
  }

  render () {
    return (
            <InfiniteTable
              url="/routing/getRoutingsDT"
              params={{}}
              cells={this.cells}
              rowMetadata={{'key': 'id'}}
              selectable
              bodyHeight={this.props.containerHeight}
              ref="routings"
            />
    )
  }

    // ////////////////////////

  onAddRouting () {
    appendComponent(
            <RoutingModal
              onClose={this.onCloseRoutingModal.bind(this)}
            />
        )
  }

  onCloseRoutingModal (modal, routing) {
    removeComponent(modal)
    if (!routing) return routing

    this.refs.routings.refresh()
  }

  onEditRouting () {
    let selected = this.refs.routings.getSelected()
    if (!selected) return showAlert('Please select routing.')

    appendComponent(
            <RoutingModal
              onClose={this.onCloseRoutingModal.bind(this)}
              routing={selected}
            />
        )
  }
}

Routing.defaultProps = {}

const options = {
  containerStyle: {
    flex: 1
  }
}

export default Dimensions(options)(Routing)

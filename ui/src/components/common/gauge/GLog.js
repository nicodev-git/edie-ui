import React from 'react'
// import {IconButton} from 'material-ui'
// import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
import { viewFilters } from 'shared/Global'

export default class GLog extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      value: parseInt(Math.random() * 100, 10),
      draw: 1,
      hover: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  onClickRefresh () {
    this.setState({
      draw: this.state.draw + 1
    })
  }

  onMouseEnter () {
    this.setState({hover: true})
  }

  onMouseOut () {
    this.setState({hover: false})
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderRefresh (data) {
    // const {hover} = this.state
    // if (data.viewFilter !== viewFilters.log.name || !hover) return null
    //
    // return (
    //   <div style={{zIndex: 3}}>
    //     <div style={{position: 'absolute', right: 10, top: 4}}>
    //       <IconButton onTouchTap={this.onClickRefresh.bind(this)}>
    //         <RefreshIcon size={32}/>
    //       </IconButton>
    //     </div>
    //   </div>
    // )
  }
  renderFrontView () {
    const data = this.getSearchData()

    return (
      <div className="flex-vertical flex-1" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseOut}>
        {this.renderRefresh(data)}
        <div className="flex-1" style={{overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Log</th>
              <th>Changed</th>
            </tr>
            </thead>
          </table>
        </div>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}

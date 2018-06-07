import React from 'react'
import {findIndex} from 'lodash'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'

export default class GSavedSearch extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
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
    this.props.fetchDevicesGroups()
  }

  getSearchList () {
    const {searchList, gauge} = this.props
    const {searchIds} = gauge
    const list = []
    searchIds.forEach(id => {
      const index = findIndex(searchList, {id})
      if (index >= 0) {
        list.push(searchList[index])
      }
    })
    return list
  }

  onClickRow (search) {
    this.props.history.push(`/search?searchId=${search.id}`)
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderFrontView () {
    return (
      <div className="flex-vertical flex-1">
        <div className="flex-1" style={{overflow: 'auto'}}>
          <table className="table table-hover">
            <tbody>
            {this.getSearchList().map(p =>
              <tr key={p.id} style={{cursor: 'pointer'}} onClick={this.onClickRow.bind(this, p)}>
                <td>{p.name}</td>
              </tr>
            )}
            </tbody>
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

        onClickRefresh={this.onClickRefresh.bind(this)}
      />
    )
  }
}

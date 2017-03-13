import React, { Component } from 'react'
import {assign} from 'lodash'
import MapSelect from '../MapSelect'
import MapSaveModal from '../MapSaveModal'
import MapImportModal from '../MapImportModal'
import MapMenuList from './MapMenuList'
import { showAlert, showPrompt, showConfirm } from '../../../../../shared/Alert'

export default class MapMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mapExportModalVisible: false
    }
  }

  renderMapExportModal () {
    if (!this.state.mapExportModalVisible) return
    return (
      <MapSaveModal mapId={this.props.selectedMap.id}
        onClose={() => { this.setState({ mapExportModalVisible: false }) }}/>
    )
  }

  renderMapImportModal () {
    if (!this.props.mapImportModalVisible) return
    return (
      <MapImportModal {...this.props}/>
    )
  }

  onClickAdd () {
    showPrompt('Please input map name.', 'New Map', name => {
      if (!name) return
      this.props.addMap({name})
    })
  }

  onClickDelete () {
    const {selectedMap} = this.props
    if (!selectedMap) return showAlert('Please choose a map to delete.')

    showConfirm('Are you sure that you want to delete the map?', btn => {
      if (btn !== 'ok') return

      this.props.deleteMap(selectedMap)
    })
  }

  onClickSave () {
    if (!this.props.selectedMap) return showAlert('Please choose map.')
    this.setState({
      mapExportModalVisible: true
    })
  }

  onClickImport () {
    this.props.openMapImportModal()
  }

  onClickRename () {
    const { selectedMap } = this.props
    if (!selectedMap) {
      showAlert('Please choose a map.')
      return
    }
    showPrompt('Please type name.', selectedMap.name, (name) => {
      if (!name) return
      this.props.updateMap(assign({}, selectedMap, {name}))
    })
  }

  render () {
    return (
      <div style={{position: 'absolute', left: '7px', top: '15px'}}>
        <MapSelect {...this.props} ref="select"/>
        <MapMenuList
          onAdd={this.props.onAdd}
          onRename={this.props.onRename}
          onDelete={this.props.onDelete}
          onSave={this.props.onSave}
          onImport={this.props.onImport}
        />
        {this.renderMapExportModal()}
        {this.renderMapImportModal()}
      </div>
    )
  }
}

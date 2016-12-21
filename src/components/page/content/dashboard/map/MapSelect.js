import React from 'react'

import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import { fetchMaps, changeMap } from '../../../../../actions/index'


class MapSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        this.props.fetchMaps(true)
    }
    render() {

        const {selectedMap} = this.props
        return (
            <select className="input-sm map-select margin-sm-left"
                    style={{marginTop:"-9px"}}
                    value={selectedMap ? selectedMap.id : ''}
                    onChange={this.onChange.bind(this)}>
                {
                    this.props.maps.map(map =>
                        <option value={map.id} key={map.id}>
                            {map.name}
                        </option>
                    )
                }
            </select>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    removeSelected() {
        // let index = findIndex(this.state.maps, {id: this.state.selected})
        // let maps = this.state.maps
        // maps.splice(index, 1)
        // let selected = maps.length ? maps[0].id : 0
        // this.setState({maps, selected}, () => {
        //     emit(EVENTS.MAP_CHANGED, selected)
        // })
    }

    renameSelected(newname) {
        // if (!newname) return
        //
        // let index = findIndex(this.state.maps, {id: this.state.selected})
        //
        // $.get(Api.dashboard.renameMap, {
        //     sid: this.context.sid,
        //     id: this.getSelected(),
        //     name: newname
        // }).done(res => {
        //     if (!res.success) return showAlert('Save Failed!');
        //
        //     let {maps} = this.state
        //     maps[index].mapname = newname
        //     this.setState({maps})
        //
        // }).fail(function(res, data){
        //     showAlert('Save Failed!');
        // });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onUserInfoLoaded() {
        this.loadMaps()
    }

    onMapAdded(map) {
        // let maps = this.state.maps
        // maps.push(map)
        //
        // this.setState({
        //     selected: map.id,
        //     maps: maps
        // }, () => {
        //     emit(EVENTS.MAP_CHANGED, map.id)
        // })
    }

    onChange(e) {
        let selectedMap = this.props.maps.filter(u => u.id == e.target.value)[0]
        this.props.changeMap(selectedMap)
    }

    loadMaps() {
        // const {user} = this.context
        //
        // $.get(Api.map.getMapsByUserDT, {
        //     draw: 1,
        //     start: 0,
        //     length: 50,
        //     userId: user.id,
        // }).done(res => {
        //
        //
        //     //userDefaultAction();
        //
        //     let mapId = 0
        //     if (user.defaultmap) mapId = parseInt(user.defaultmap)
        //     mapId = mapId || this.state.value
        //
        //     this.setState({
        //         maps: res.data,
        //         selected: mapId
        //     }, () => {
        //         emit(EVENTS.MAP_CHANGED, mapId)
        //     })
        // });
    }
}

MapSelect.contextTypes = {

}

function mapStateToProps(state) {
    const { maps, selectedMap } = state.dashboard
    return { maps, selectedMap }
}

export default connect(mapStateToProps, { fetchMaps, changeMap })(MapSelect)
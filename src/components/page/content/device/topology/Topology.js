import React from 'react'
import ReactTooltip from 'react-tooltip'
import { assign } from 'lodash'

import MapCanvas from '../../../../shared/map/MapCanvas'
import MapToolbar from './MapToolbar'
import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter'
import {EVENTS} from 'shared/event/Events'

import DeviceWizardContainer from '../../../../../containers/shared/wizard/DeviceWizardContainer'
import { appendComponent, removeComponent } from '../../../../../util/Component'
import { wizardConfig } from '../../../../shared/wizard/WizardConfig'
import { showAlert, showConfirm } from '../../../../shared/Alert'

import DeviceDragLayer from './DeviceDragLayer'
import { ROOT_URL } from '../../../../../actions/config'

export default class Topology extends React.Component {
    constructor(props) {
        super(props)
        const {location} = this.props
        let locprops = location.state || {}

        this.state = {
            editable: false,
            maximized: false,

            device: locprops.device,
            selectedItem: {},

            dropItem: null,
            dropItemPos: {},

            tooltip: null,
            tipLeft: 0,
            tipTop: 0,
            tipWidth: 0,
            tipHeight: 0,

            tipObject: null,
        }

        this.curMapDraw = 1
        this.mapTimer = 0


        this.arrDevices = []
        this.arrLastDevices = []
        this.strLastDevices = ''

        this.arrLines = {}
        this.arrLastLines = {}
        this.strLastLines = ''

        this.mapListener = {
            onObjectSelected:   this.onMapObjectSelected.bind(this),
            onSelectionCleared: this.onMapSelectionCleared.bind(this),

            onMouseDown:        this.onMapMouseDown.bind(this),
            onObjectMoving:     this.onMapObjectMoving.bind(this),
            onObjectMoved:      this.onMapObjectMoved.bind(this),

            onLineUpdate:       this.onMapLineUpdate.bind(this),
            onLineStyleChange:  this.onMapLineStyleChange.bind(this),

            onTextChanged:      this.onMapTextChanged.bind(this),

            onMouseOver:        this.onMapMouseOver.bind(this),
            onMouseOut:         this.onMapMouseOut.bind(this),
            onZoomRect:         this.onMapZoomRect.bind(this),

            onDrop:             this.onDrop.bind(this),
        }

        this.mapEvents = {

            onClickAdd: this.onClickAdd.bind(this),
            onClickEdit: this.onClickEdit.bind(this),
            onClickDelete: this.onClickDelete.bind(this),

            onClickFontSizeUp: this.onClickFontSizeUp.bind(this),
            onClickFontSizeDown: this.onClickFontSizeDown.bind(this),

            onClickAlignLeft: this.onClickAlignLeft.bind(this),
            onClickAlignCenter: this.onClickAlignCenter.bind(this),
            onClickAlignRight: this.onClickAlignRight.bind(this),

            onClickLineWidthInc: this.onClickLineWidthInc.bind(this),
            onClickLineWidthDec: this.onClickLineWidthDec.bind(this),
            onChangeLineColor: this.onChangeLineColor.bind(this),
            onChangeLineType: this.onChangeLineType.bind(this),
            onClickDeviceItem: this.onClickDeviceItem.bind(this),
        }
    }

    render() {

        let events = this.mapEvents

        const {tooltip, tipLeft, tipTop, tipWidth, tipHeight, selectedItem,
            dropItem, dropItemPos, editable} = this.state

        return (
            <div>
                <div className="tab-header" style={{minHeight: "40px"}}>
                    <div>
                        <span className="tab-title">{this.state.device.name || ''}</span>
                    </div>
                </div>

                <div className="panel panel-default mb-none" id="mapeditdiv"
                     style={{borderLeft: "1px solid white"}}>
                    <MapToolbar
                        {...events}
                        {...this.state}
                        ref="toolbar"
                    />

                    <div className="panel-body p-none"
                         style={{height: this.state.maximized ? "100%" : "520px", position: "relative"}}>
                        <MapCanvas
                            listener={this.mapListener}
                            editable={this.state.editable}
                            dragItem={this.state.selectedItem}
                            dropItem={dropItem}
                            dropItemPos={dropItemPos}
                            ref="map"/>
                        <DeviceDragLayer />
                        <div className={"map-hover " + (tooltip ? '' : 'hidden')}
                             data-tip={tooltip}
                             data-html={true}
                             style={{ left: tipLeft, top: tipTop, width: tipWidth, height: tipHeight }}
                             onClick={this.onClickTooltip.bind(this)}>
                        </div>
                        <ReactTooltip/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let callLoadMap = $.get(`${ROOT_URL}${Api.dashboard.getDevicesForMap}`, {
            mapid: this.state.device.mapid,
            fatherid: this.state.device.id,
            sid: this.context.sid
        })

        let callLoadLines = $.get(`${ROOT_URL}${Api.dashboard.getLineByLine}`, {
            mapid: this.state.device.mapid,
        })

        return $.when(callLoadMap, callLoadLines).done((resMap, resLines) => {

            let [arrNewDevices] = resMap
            let [arrNewLines] = resLines

            let arrLines = {}
            $.each(arrNewLines, (i, item) => {
                arrLines[item.lineId] = {
                    "id":				item.id,
                    "type":				item.type,

                    "fromDeviceid": 	item.fromDevice,
                    "fromPoint": 		item.fromPoint,
                    "toDeviceid": 		item.toDevice,
                    "toPoint": 			item.toPoint,

                    "linecolor":		item.linecolor,
                    "linewidth":		item.linewidth,
                }
            })

            //Draw
            const refMap = this.getDivMap();
            if (!refMap) return

            refMap.drawMap(arrNewDevices, arrLines, [], {}, false)


        }).fail(() => {
            alert("Map load failed!")
        }).always(() => {

        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getDivMap() {
        return this.refs.map.getDecoratedComponentInstance()
    }

    getCanvasMap() {
        return this.getDivMap().getMapObject()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onMapObjectSelected(cmap, obj) {
        this.refs.toolbar.setState({
            cmap: cmap,
            selectedObj: obj
        })
    }

    onMapSelectionCleared() {
        this.refs.toolbar.setState({
            selectedObj: null
        })
    }

    onMapMouseDown(map, obj) {

        emit(EVENTS.MAP_DEVICE_CLICKED, obj.data)

        // mainDeviceClick({
        //     id: obj.id,
        //     title: obj.data.name,
        //     src: obj.imageObj ? obj.imageObj.getSrc() : '',
        // }, obj.data.devicetype, false, null, obj.data);

    }

    onMapObjectMoving() {

    }

    onMapObjectMoved (map, options, type) {
        if (!options) return;

        options.mapid = this.state.device.mapid;
        options.fatherid = options.fatherid || this.state.device.id;

        return this.moveMapItem(map, options, type);
    }

    onMapLineUpdate(lineObj, callback) {
        let lineId = lineObj.id;

        if(!lineId) {
            var url = Api.deviceadmin.addDevice;
            var param = {
                devicetype: 'line',
                name: 'line',
                angle: 0,
                x : 0,
                y : 0,
                width : 50,
                height : 1,

                mapid: this.state.device.mapid,
                fatherid: 0,
            };

            $.get(`${ROOT_URL}${url}`, param)
                .done(res => {
                    if(!res || !res.success) return;
                    let obj = res.object;
                    if (obj.length) obj = obj[0];
                    lineId = obj.id;

                    this.arrLines[lineId] = {
                        fromDeviceid: lineObj.startObj.id,
                        fromPoint: lineObj.startPoint,
                        toDeviceid: lineObj.endObj.id,
                        toPoint: lineObj.endPoint,
                    }

                    lineObj.id = lineId;

                    this.updateLineConnectionDB(lineId);
                    if (callback) callback(lineId, this.arrLines[lineId]);
                });
        } else {
            let con = this.arrLines[lineId];
            con.fromDeviceid = lineObj.startObj.id;
            con.fromPoint = lineObj.startPoint;
            con.toDeviceid = lineObj.endObj.id;
            con.toPoint = lineObj.endPoint;

            this.updateLineConnectionDB(lineId);
        }
    }

    onMapLineStyleChange(lineObj, style) {
        var lineId = lineObj.id;
        if (!lineId) return

        $.get(`${ROOT_URL}${Api.devices.updateLine}`, {

            lineId: lineId,
            linecolor: style.color,
            linewidth: style.width,

        }).done((res) => {

        })
    }

    onMapTextChanged(map, id, text, isLabel) {
        this.addMapUploading(map, id);
        let url = `${ROOT_URL}${Api.devices.renameDevice}`;
        $.get(url, {
            id: id,
            name: text
        }).done((res) => {

        }).always(() =>{
            this.removeMapUploading(map, id);
        })
    }

    onMapMouseOver(map, obj) {

        if (this.state.editable) return

        let rect = obj.getBoundingRect();
        let tooltip = obj.tooltip || ''
        if (tooltip) tooltip = "<div class='text-center'>" + tooltip + "</div>"

        this.setState({
            tooltip: tooltip,
            tipLeft: rect.left,
            tipTop: rect.top,
            tipWidth: rect.width,
            tipHeight: rect.height,
            tipObject: obj,
        }, () => {
            ReactTooltip.rebuild()
        })
    }

    onMapMouseOut() {
        if (!this.state.tooltip) return
        this.setState({
            tooltip: null
        })
    }

    onMapZoomRect() {

    }

    onDrop(item, offset) {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        let cmap = this.getCanvasMap()
        let pos = cmap.canvas.getPointer({
            clientX: offset.x + left,
            clientY: offset.y + top
        });
        let {x, y} = pos

        // if (item.hasClass('item-newdev')) {
        //     var device = item.data('device');
        //
        //     var x=device.x;
        //     var y=device.y;
        //
        //     addMapItem(cmap, device, function(obj){
        //         obj.notifyMoved();
        //
        //         removeNewDeviceItem(item.closest('li'));
        //     });
        //     drawNewDeviceConnection(cmap, device);
        //
        //     return;
        // }

        let options = options || {};
        $.extend(options, {
            type: item.type,
            imgName: item.img,
            imageUrl: '/externalpictures?name=' + item.img,
            x: x,
            y: y,
            width: 50,
            height: 50,
            fatherid: this.state.device.id,
        });

        if ('longhub' === options.type) {
            options.width = 20;
            options.height = 400;
        } else if ('bi-pie' === options.type) {
            options.width = 200;
            options.height = 200;
        } else if ('bi-bar' === options.type) {
            options.width = 200;
            options.height = 200;
        } else if ('bi-line' === options.type) {
            options.width = 200;
            options.height = 200;
        } else if ('usertext' === options.type) {
            options.width = 100;
            options.height = 30;
        }

        options.x -= options.width / 2;
        options.y -= options.height / 2;

        this.setState({
            dropItem: item,
            dropItemPos: offset,
        })

        this.showAddWizard(options, (id, name, data) => {
            const refMap = this.getDivMap()
            let cmap = this.getCanvasMap()
            refMap.addMapItem(cmap, data, () => {

            })
        }, () => {
            this.setState({dropItem: null})
        })
    }

    onClickTooltip() {
        this.onMapMouseDown(null, this.state.tipObject)
        this.setState({tooltip: null})
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickAdd(displayMenu) {
        if (displayMenu) {
            if (!this.state.editable) this.onClickEdit()
        } else {
            if (this.state.editable) this.onClickEdit()
        }

        this.setState({
            selectedItem: {},
        })
    }

    onClickEdit() {
        let cmap = this.getCanvasMap()
        cmap.zooming && cmap.setZooming(false)

        this.setState({
            editable: !this.state.editable,
            selectedItem: {},
        })
    }

    onClickDelete() {
        let cmap = this.getCanvasMap()
        this.promptRemoveMapItem(cmap)
    }

    onClickFontSizeUp() {
        let cmap = this.getCanvasMap()
        cmap.changeFontSize(true);
    }

    onClickFontSizeDown() {
        let cmap = this.getCanvasMap()
        cmap.changeFontSize(false);
    }

    onClickAlignLeft() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('left');
    }

    onClickAlignCenter() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('center');
    }

    onClickAlignRight() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('right');
    }

    onClickLineWidthInc() {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeWidth(true);
    }

    onClickLineWidthDec() {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeWidth(false);
    }

    onChangeLineColor(color) {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeColor(color)

        this.refs.toolbar.setState({cmap})
    }

    onChangeLineType(type, imgUrl, deviceTypeId) {
        let cmap = this.getCanvasMap()
        const lineId = cmap.changeConnectorType(type, imgUrl);
        if (!lineId) return;

        this.changeLineType(lineId, deviceTypeId)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    moveMapItem (map, params, type) {
        if (!params) return true;

        this.addMapUploading(map, params.deviceid);

        var url = type === 'lightning' ? Api.devices.updateLine : Api.admin.moveDevice;

        if (type === 'lightning') {
            params = {
                lineId: params.id,
                linecolor: 'black',
                linewidth: params.scaleX,
            };
        }

        return $.get(`${ROOT_URL}${url}`, params).always(() => {
            this.removeMapUploading(map, params.deviceid);
        });
    }

    addMapUploading (map, id) {
        if (!map) return;
        map.addUploading(id);
    }

    removeMapUploading (map, id) {
        if (!map) return;
        map.removeUploading(id);
    }

    promptRemoveMapItem (cmap) {
        if(!cmap) return;
        if(!cmap.editable) return;

        var object = cmap.getSelected();
        if(!object) {
            showAlert("Please select a device to remove.");
            return;
        }

        var item = "";
        var name = "";
        if (object.objectType === MapItemType.Device) {
            item = "device";
            name = "Name: " + object.data.name;
        } else if (object.objectType === MapItemType.BI){
            item = "bi";
        } else if (object.objectType === MapItemType.Shape) {
            item = "connection";
        }

        $.get(`${ROOT_URL}${Api.deviceadmin.countDeviceData}`, {
            deviceid: object.id,
        }).done(function(res) {
            if (!res.success) {
                showAlert("Failed to get device data!");
                return;
            }
            showConfirm(res.object, (btn) => {
                if(btn !== 'ok') return;

                var url;

                url = Api.deviceadmin.removeDevice + '?monitorid=' + object.id;
                if(object.objectType === MapItemType.Device) {

                } else if(object.objectType === MapItemType.Shape) {

                }

                if (!url) return;

                cmap.removeMapItem(object, true);
                $.getJSON(url, function(){

                });
            });
        }).fail(function(){
            showAlert("Failed to get device data!");
        });
    }

    updateLineConnectionDB(lineid) {
        let con = this.arrLines[lineid];
        if(con.id) {
            $.ajax({
                dataType : "json",
                url : "/devices/updateConnection",
                data : {
                    id : con.id,
                    fromDevice: con.fromDeviceid,
                    fromPoint: con.fromPoint,
                    toDevice: con.toDeviceid,
                    toPoint: con.toPoint,
                    lineId: lineid
                },
                success : (data, status, jqXHR) => {
                }
            });
        } else {
            $.ajax({
                dataType : "json",
                url : "/devices/addConnection",
                data : {
                    from: con.fromDeviceid,
                    connectionPoint: con.fromPoint,
                    lineId: lineid
                },
                success : (data, status, jqXHR) => {
                    if(data.success) {
                        con.id = data.info;
                        if(con.toDeviceid)
                            this.updateLineConnectionDB(lineid);
                    } else {
                        console.log('Connection Add Failed!');
                    }
                }
            });
        }
    }

    changeLineType(id, typeid) {
        $.get(`${ROOT_URL}${Api.deviceadmin.updateLine}`, {
            id: id,
            type: typeid,
        }).done(() => {

        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    showAddWizard(options, callback, closeCallback) {
        if (options.type === 'longhub') {
            const url = `${ROOT_URL}${Api.deviceadmin.addDevice}`;
            const param = {
                devicetype: 'longhub',
                name: 'longhub',
                angle: 0,
                x: options.x,
                y: options.y,
                width: options.width,
                height: options.height,
                fatherid: options.fatherid || 0,
                mapid: this.state.device.mapid,
            };

            $.get(url, param).done((res) => {
                if (!res || !res.success || !res.object.length) {
                    showAlert('Add Failed!');
                    return;
                }

                const data = res.object[0];
                if (callback) callback(data.id, data.name, data);
            }).always(() => {
                closeCallback && closeCallback()
            });

        } else {
            if (wizardConfig[options.type] === null) {
                showAlert('Unrecognized Type: ' + options.type);
                return;
            }

            var extra = {
                mapid: this.state.device.mapid,
                x: options.x,
                y: options.y,
                width: options.width,
                height: options.height,
                fatherid: options.fatherid || 0,
                timeout: 60000,
            };

            extra.image = options.imgName;

            var config = {
                fatherid: options.fatherid || 0,
                mapid: this.state.device.mapid,
            };


            appendComponent(
                <DeviceWizardContainer
                    deviceType={options.type}
                    onClose={(modal) => {
                        removeComponent(modal)
                        closeCallback && closeCallback()
                    }}
                    extraParams={extra}
                    configParams={config}
                    onFinish={this.onFinishAddWizard.bind(this, callback)}
                />
            )
        }
    }

    onFinishAddWizard(callback, res, req) {
        var data = res.object
        var params = req.params
        if (!data) {
            showAlert("Add Failed!")
            return;
        }

        if (data.length) data = data[0];
        var id = data.id;
        var name = data.name;

        callback && callback(id, name, data);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////

    onClickDeviceItem(selectedItem, e) {
        //dragItem:
        this.setState({ selectedItem }, () => {
            //this.refs.map.onMouseMove(e)
        })
    }
}
Topology.defaultProps = {
}

Topology.contextTypes = {
    sid: React.PropTypes.string,
}

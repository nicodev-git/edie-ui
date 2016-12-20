import React from 'react'
import { findIndex } from 'lodash'
import { lineTypes } from 'shared/Global.jsx'

import {
    uniqueId
} from 'lodash'

import {
    DropTarget
} from 'react-dnd'

import { imageBaseUrl, extImageBaseUrl, DragTypes } from 'shared/Global.jsx'

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

const canvasTarget = {
    canDrop(props) {
        return true
    },

    drop(props, monitor, component) {
        props.listener.onDrop(monitor.getItem(), monitor.getClientOffset())
    }
}

class MapCanvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvas: null,
            containerId: uniqueId("container-"),
            canvasId: uniqueId('canvas-'),
            cmap: null,

            cursorPos: {
                x: -100,
                y: -100,
            },

            clientCursorPos: {}
        }

        this.currentMapDevices = []
        this.currentMapLines = []

        this.updateDimensions = this.updateDimensions.bind(this)
    }

    componentDidMount() {
        let cmap = $.extend(true, {}, mapObject);

        cmap.initialize({
            canvas: this.state.canvasId,
            editable: this.state.editable,
            trafficVisible: this.props.showTraffic,
            listener: this.props.listener || {}
        });
        cmap.needReset = true;

        this.setState({cmap})

        this.respondCanvas(cmap)

        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentWillUpdate(nextProps, nextState) {

        if (this.state.cmap) {
            if (nextProps.editable != this.props.editable) {
                this.state.cmap.setEditable(nextProps.editable)
            }

            if (nextProps.showTraffic != this.props.showTraffic) {
                this.state.cmap.setTrafficVisible(nextProps.showTraffic)
            }

            if (nextProps.dragItem.img && !this.props.dragItem.img) {
                this.setState({cursorPos: {x: -100, y: -100}})
            } else if (!nextProps.dragItem.img && this.props.dragItem.img) {
                this.setState({cursorPos: {x: -100, y: -100}})
            }

            if (nextProps.hidden != this.props.hidden) {
                this.state.cmap.setHidden(nextProps.hidden)
            }


            if (JSON.stringify(nextProps.mapDevices) != JSON.stringify(this.currentMapDevices)
                || JSON.stringify(nextProps.mapLines) != JSON.stringify(this.currentMapLines)) {

                //Cancel when device adding
                if(this.state.cmap.editable) return;

                //Cancel when map changed;
                //if(currentmap != this.state.mapId) return;
                console.log('Map needs to update.')
                this.drawMap(nextProps.mapDevices , nextProps.mapLines, this.currentMapDevices, this.currentMapLines, true, () => {
                    console.log('Map updated.')
                })


                this.currentMapDevices = nextProps.mapDevices
                this.currentMapLines = nextProps.mapLines
            }
        }

    }

    updateDimensions() {
        this.respondCanvas(this.state.cmap)
    }

    getMapObject() {
        return this.state.cmap
    }

    getOffset() {
        return $('#' + this.state.containerId).offset()
    }
    
    render() {
        const { x, y, connectDropTarget, dropTargetMonitor} = this.props;

        const style = {backgroundColor: "#23272D", height: '100%', position: 'relative'}
        return connectDropTarget(
            <div style={style}
                 onMouseMove={this.onMouseMove.bind(this)}
                 onClick={this.onClickContainer.bind(this)}
                 ref={this.onContainerRef.bind(this)}>
                <div id={this.state.containerId}
                     style={{backgroundColor: "#23272D", height: '100%', position: 'relative'}}>

                    <canvas id={this.state.canvasId}>
                    </canvas>
                </div>

                {this.renderDrag()}
                {this.renderDropItem()}
            </div>
        )
    }

    respondCanvas(cmap) {
        if (!cmap) return

        var width = $('#' + this.state.containerId).width();
        var height = $('#' + this.state.containerId).height();

        if (width == 0 || height == 0) return;
        if (cmap.canvas.width == width && cmap.canvas.height == height) return;

        cmap.canvas.setWidth(width);
        cmap.canvas.setHeight(height);
        cmap.canvas.calcOffset();

        cmap.zoomReset();
    }

    renderDrag() {
        const {cursorPos} = this.state
        const {dragItem} = this.props

        if (!dragItem || !dragItem.img) return null

        const width = 48

        return (
            <div style={{position: 'absolute', left: 0, right:0, top:0, bottom:0}}
                 onClick={this.onDragMouseDown.bind(this)}>
                <img src={"/externalpictures?name=" + dragItem.img} width={width} height={width}
                     style={{position: 'absolute', left: cursorPos.x - width / 2,
                     top: cursorPos.y - width / 2,
                     cursor: 'url("/images/cursor_drag_hand.png") 15 15, auto'}}/>
            </div>
        )
    }

    renderDropItem() {
        const {dropItem, dropItemPos} = this.props

        if (!dropItem || !dropItem.img) return null

        const width = 48
        const rt = this.containerEl.getClientRects()[0]
        if (!rt) return null

        return (
            <img src={"/externalpictures?name=" + dropItem.img} width={width} height={width}
                 style={{position: 'absolute', left: dropItemPos.x - rt.left - width / 2,
                     top: dropItemPos.y - rt.top - width / 2}}/>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onContainerRef(el) {
        this.containerEl = el;
    }

    onMouseMove(e) {

        const {dragItem} = this.props
        if (!dragItem || !dragItem.img) return false

        const rt = this.containerEl.getClientRects()[0]
        const x = e.clientX - rt.left
        const y = e.clientY - rt.top
        this.setState({
            cursorPos: {x, y},
            clientCursorPos: {
                x: e.clientX,
                y: e.clientY
            }}
        )

        return false;
    }

    onClickContainer() {
        // const {dragItem} = this.props
        // if (dragItem && dragItem.img)  {
        //     console.log('Dropped Device.')
        //     // this.props.listener.onDrop(this.props.dragItem, this.state.clientCursorPos)
        // }
        //console.log("Clicked Container")
        return false
    }

    onDragMouseDown(e) {
        this.props.listener.onDrop(this.props.dragItem, this.state.clientCursorPos)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setEditable(editable) {
        let cmap = this.state.cmap
        cmap && cmap.setEditable(editable)
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    drawMap(deviceData, lineData, prevDeviceData, prevLineData, force, callback) {
        let cmap = this.state.cmap
        if (!cmap) {
            console.log("MapCanvas not initialized yet.")
            return
        }

        cmap.needReset = !!force
        cmap && cmap.zooming && cmap.setZooming(false);

        //Update Devices
        if (deviceData != prevDeviceData)
            this.updateMapDevices(cmap, deviceData, prevDeviceData);

        //Update Lines
        if (lineData != prevLineData)
            this.updateMapLines(cmap, lineData, prevLineData);

        setTimeout(function(){
            if (cmap.needReset) {
                cmap.zoomReset();
                cmap.needReset = false;
            }

            cmap.canvas.renderAll();

            callback && callback()
        }, 500);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    isEqualDevices (dev1, dev2) {
        var equal = true;
        $.each(dev1, (key, value) => {
            if (value != dev2[key]) {
                equal = false;
                return false;
            }
        });

        return equal;
    }

    isNewDevice (device) {
        var x=device.x;
        var y=device.y;
        return (x == -1 && y == -1) || (x == 0 && y == 0);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateMapDevices(cmap, deviceData, prevDeviceData) {
        //Clear New Devices
        // $('#devicediv #devcollapse0 ul').children().remove();
        // $('#devicediv #devcollapse0').closest('.panel').addClass('hidden');

        let existingDevices = []
        deviceData.forEach(device => {
            //Check for new devices

            // if (this.isNewDevice(device)) {
            //     if (this.addNewDeviceItem(device))
            //         $('#devicediv #devcollapse0').closest('.panel').removeClass('hidden');
            //     return;
            // }

            //Find if already exists
            let index = findIndex(prevDeviceData, { id: device.id})
            let existingDevice = index >= 0 ? prevDeviceData[index] : null//findOneBy(device.id, prevDeviceData, 'id');

            if (existingDevice) {
                existingDevices.push(existingDevice);
                if (this.isNewDevice(existingDevice)) return;

                //Update
                if (!this.isEqualDevices(device, existingDevice))
                    this.updateMapItem(cmap, device);
            } else if (!cmap.findObject(device.id)) {
                //Add
                this.addMapItem(cmap, device);
            }
        });

        //Remove
        prevDeviceData.forEach(device => {
            if (this.isNewDevice(device)) return;
            if (existingDevices.indexOf(device) >= 0) return;
            this.removeMapItem(cmap, device);
        });

        cmap.lastSX = 1;
        cmap.lastSY = 1;
    }

    updateMapLines (cmap, lineData, prevLineData) {
        var existingLines = [];

        var connections = [];
        $.each(cmap.connectors, (i, item) => {
            connections.push(item);
        });

        lineData.forEach(item => {
            const {id, line} = item
            var existingLine = cmap.findConnector(0,
                line.from, line.fromPoint,
                line.to, line.toPoint);
            if (existingLine) {
                //Update
                existingLines.push(existingLine);
                this.updateConnection(cmap, id, line);
            } else {
                //Add
                this.drawConnection(cmap, id, line);
            }
        })

        //Remove
        $.each(connections, function(i, object){
            if (existingLines.indexOf(object) >= 0) return;

            cmap.removeMapItem(object);
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addMapItem(cmap, device, callback) {
        var deviceid = device.id;
        var devicetype=device.type;
        var devname=device.name;
        var devicestatus=device.devicestatus || "unknown";

        var x=device.x || 0;
        var y=device.y || 0;
        var width=device.width || 50;
        var height=device.height || 50;
        var textwidth = device.textWidth || 50;
        var textx = device.textX || x;
        var texty = device.textY || (y + height + 5);
        var textSize = device.textSize || 13;
        var angle = device.angle || 0;
        var textAlign = device.align || 'center';


        // var propsEntity = device.propsEntity || [];
        var propsEntity = JSON.parse(device.json || '[]') || [];

        if ('longhub' == devicetype) {
            cmap.addShapeHub({
                id: deviceid,
                data: device,

                left: x,
                top: y,
                width: width,
                height: height,
                angle: angle,

                imageUrl: imageBaseUrl + 'longhub.png',
            });
        } else if ('line' == devicetype ||
            'Yellow Lightning' == devicetype ||
            'lightening' == devicetype ||
            'Dashed Line' == devicetype) {

        } else if ('Text' == devicetype) {

            var label = devname;

            cmap.addShapeText({
                id: deviceid,

                left: x,
                top: y,
                width:width,
                height: height,
                fontSize: textSize,
                textAlign: textAlign,

                text: label
            });
        } else if('sqlQueryGauge' == devicetype) {
            var percent = this.parseGaugeResult(device);
            cmap.addBiGauge({
                id: deviceid,
                data: device,

                left: x,
                top: y,
                width: width,
                height: height,

                text: percent,
                imageUrl: imageBaseUrl + 'sqlgauge.png',
            });
        } else if(devicetype == 'SQLBI') {
            var charttype = '';
            $.each(propsEntity, function(i, item){
                if(i == 'chartType'){
                    charttype = item;
                    return false;
                }
            });


            var orgdata = null;
            if (charttype) {
                try{
                    var str = device.devicestatustext || '';
                    str = str.replace(/'/g, "\"");
                    orgdata = JSON.parse(str);
                } catch (e) {
//				console.log(e);
                }
            }

            if('pie' == charttype || 'piw' == charttype) {
                var graphdata = [ {
                    label : 'Internet Explorer',
                    data : 25,
                }, {
                    label : 'Chrome',
                    data : 37
                }, {
                    label : 'Firefox',
                    data : 21,
                }, {
                    label : 'Safari',
                    data : 20,
                } ];

                if (orgdata) {
                    graphdata = [];
                    $.each(orgdata, function(i, item){
                        graphdata.push({
                            label: item.type,
                            data: item.count
                        });
                    });
                }

                cmap.addBiPieChart({
                    id: deviceid,

                    left: x,
                    top: y,
                    width: width,
                    height: height,

                    graphdata: graphdata
                });
            } else if('bar' == charttype) {
                var graphdata = [[0, 2], [1, 10], [2, 8]];

                cmap.addBiBarChart({
                    id: deviceid,

                    left: x,
                    top: y,
                    width: width,
                    height: height,

                    graphdata: graphdata
                });

            } else if('line' == charttype) {
                var graphdata = [{
                    label: 'New1',
                    values: [
                        [0, 10],
                        [1, 12],
                        [2, 13],
                        [3, 14],
                        [4, 13],
                        [5, 16],
                        [6, 20],
                        [7, 22]
                    ]
                }, {
                    label: 'New2',
                    values: [
                        [0, 6],
                        [1, 7],
                        [2, 10],
                        [3, 11],
                        [4, 9],
                        [5, 8],
                        [6, 12],
                        [7, 15]
                    ]
                }];

                cmap.addBiLineChart({
                    id: deviceid,

                    left: x,
                    top: y,
                    width: width,
                    height: height,

                    graphdata: graphdata
                });
            }
        } else {
            //Image
            var imageUrl = '';
            var picture=device.image || '';

            if(!picture) imageUrl = imageBaseUrl + "windows.png"
            else if (picture.startsWith('/')) imageUrl = picture;
            else imageUrl = extImageBaseUrl + picture;
            //Status
            var okurl = this.deviceStatusImageName(devicestatus);
            var statusImageLeft = -4, statusImageTop = -4;
            // if (devicetype == 'Firewall') {
            //     statusImageLeft = -10;
            //     statusImageTop = 2;
            // }

            //IP
            var notes = device['devicenotes'] || '';
            $.each(propsEntity, function(i, item){
                if(item.prop == 'image' && item.value){
                    imageUrl = item.value;
                }
            });
            var tooltip = device['hostname'] || device['ipaddress'];
            if (notes) tooltip += '<div style="border-bottom:1px solid white; height:5px;">&nbsp;</div>' + notes;

            var devconfig = {
                id: deviceid,
                data: device,
                devicetype: devicetype,
                imageLeft: x,
                imageTop: y,
                imageWidth: width,
                imageHeight: height,

                textLeft: textx,
                textTop: texty,
                textWidth: textwidth,
                textHeight: 15,
                textSize: textSize,
                textAlign: textAlign,

                tooltip: tooltip,

                text: devname,
                imageUrl: imageUrl,
                statusImageUrl: imageBaseUrl + okurl,

                statusImageLeft: statusImageLeft,
                statusImageTop: statusImageTop,
            };

            if (devicetype == "genericdevice"){
                var devicestat = JSON.parse(device.devicestatustext);
                if (devicestat == null) devicestat = '0';
                createTempGauge(devicestat.text, function(url){

                    devconfig.imageUrl = url;

                    cmap.addDevice(devconfig, callback);
                });

            }else{
                cmap.addDevice(devconfig, callback);
            }

        }
    }

    updateMapItem (cmap, device) {
        var deviceid = device.id;
        var devicetype=device.type;
        var devname=device.name;
        var devicestatus=device.devicestatus || "unknown";

        var x=device.x || 0;
        var y=device.y || 0;
        var width=device.width || 50;
        var height=device.height || 50;
        var textwidth = device.textWidth || 50;
        var textx = device.textX || x;
        var texty = device.textY || (y + height + 5);
        var textSize = device.textSize || 13;
        var angle = device.angle || 0;
        var textAlign = device.align || 'center';

        var mapObject = cmap.findObject(deviceid);
        if (!mapObject) return;

        var propsEntity = JSON.parse(device.json || '[]') || [];

        if ('longhub' == devicetype) {
            mapObject.update({
                left: x,
                top: y,
                width: width,
                height: height,
                angle: angle,
                data: device,
            });
        } else if ('Text' == devicetype) {

            var label = devname;

            mapObject.update({
                left: x,
                top: y,
                width:width,
                height: height,
                fontSize: textSize,
                textAlign: textAlign,
                text: label
            });
        } else if('sqlQueryGauge' == devicetype) {
            var percent = this.parseGaugeResult(device);
            mapObject.update({
                data: device,

                left: x,
                top: y,
                width: width,
                height: height,

                text: percent,
            });
        } else if(devicetype == 'SQLBI') {
            var charttype = '';
            $.each(propsEntity, function(i, item){
                if(i == 'chartType'){
                    charttype = item;
                    return false;
                }
            });
            var graphdata = [];

            if('pie' == charttype || 'piw' == charttype) {

                mapObject.update({
                    left: x,
                    top: y,
//				width: width,
//				height: height,
                });

            } else if('bar' == charttype) {

                mapObject.update({
                    left: x,
                    top: y,
//				width: width,
//				height: height,

                    graphdata: graphdata
                });

            } else if('line' == charttype) {
                mapObject.update({
                    left: x,
                    top: y,
//				width: width,
//				height: height,

                    graphdata: graphdata
                });
            }
        } else {
            //Image
            var imageUrl = '';
            var picture=device.image || '';

            if(!picture) imageUrl = imageBaseUrl + "windows.png"
            else if (picture.startsWith('/')) imageUrl = picture;
            else imageUrl = extImageBaseUrl + picture;

            //Status
            var okurl = this.deviceStatusImageName(devicestatus);
            var statusImageLeft = -4, statusImageTop = -4;
            // if (devicetype == 'Firewall') {
            //     statusImageLeft = -10;
            //     statusImageTop = 2;
            // }

            //IP
            var notes = device['devicenotes'] || '';
            $.each(propsEntity, function(i, item){
                if(item.prop == 'image' && item.value){
                    imageUrl = item.value;
                }
            });
            var tooltip = device['hostname'] || device['ipaddress'];
            if (notes) tooltip += '<div style="border-bottom:1px solid white; height:5px;">&nbsp;</div>' + notes;

            var devconfig = {
                data: device,

                imageLeft: x,
                imageTop: y,
                imageWidth: width,
                imageHeight: height,

                textLeft: textx,
                textTop: texty,
                textWidth: textwidth,
                textHeight: 15,
                textSize: textSize,
                textAlign: textAlign,

                tooltip: tooltip,

                text: devname,
                imageUrl: imageUrl,
                statusImageUrl: imageBaseUrl + okurl,

                statusImageLeft: statusImageLeft,
                statusImageTop: statusImageTop,
            };

            if (devicetype == "genericdevice"){
                var devicestat = JSON.parse(device.devicestatustext);
                createTempGauge(devicestat ? devicestat.text : "0", function(url){
                    devconfig.imageUrl = url;

                    mapObject.update(devconfig);
                });

            }else{
                mapObject.update(devconfig);
            }
        }
    }

    removeMapItem(cmap, device) {
        var deviceid = device.id;
        var mapObject = cmap.findObject(deviceid);
        if (!mapObject) return;

        mapObject.remove();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    drawConnection(cmap, id, line) {
        var config = {
            id: id,
            startObj: line.from,
            startPoint: line.fromPoint,
            endObj: line.to,
            endPoint: line.toPoint,
            strokeWidth: line.linewidth,
            strokeColor: line.linecolor,
            lineType: line.type,
        };

        if (this.isNormalLine(line.type)) {
            cmap.addShapeLine(config);
        } else {

            const typeIndex = findIndex( lineTypes, { typename: line.type })
            if (typeIndex < 0) return

            config.imageUrl = lineTypes[typeIndex].image
            cmap.addShapeLightning(config);
        }
    }

    updateConnection (cmap, id, line) {
        var config = {
            id: id,
            strokeWidth: line.linewidth,
            strokeColor: line.linecolor,
            lineType: line.type,
        };

        var object = cmap.findConnector(0, line.from, line.fromPoint,
            line.to, line.toPoint);

        if (!object) return;

        if (!this.isNormalLine(line.type)) {

            const typeIndex = findIndex( lineTypes, { typename: line.type })
            if (typeIndex < 0) return

            config.imageUrl = lineTypes[typeIndex].image
        }

        if (object.lineType != config.lineType) {
            cmap.changeConnectorType(config.lineType, config.imageUrl, object, config);
        } else {
            object.update(config);
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    parseGaugeResult (device) {
        var mainprops = device;
        var subprops =  mainprops['devicestatustext'];

        var result = (function(){
            if(subprops == null) return '';
            try{
                var statusObj = JSON.parse(subprops);
                if(!statusObj['text']) return '';
                var textObj = JSON.parse(statusObj['text']);
                if(textObj == null) return '';
                return textObj;
            }catch(e) {
                console.log && console.log(e);
            }
            return '';
        })();

        return result || '';
    }


    deviceStatusImageName (status) {
        var okurl = 'question1.png';
        if (status=='up') okurl='ok.gif';
        if (status=='down') okurl='error.gif';

        return okurl;
    }

    isNormalLine(type) {
        return !type || type == 'line' || type == 'Dashed Line'
    }
}

MapCanvas.defaultProps = {
    editable: false,

    listener: {},

    dragItem: {},
    dropItem: null,
    dropItemPos: {},

    hidden: false,
    showTraffic: false,

    mapDevices: [],
    mapLines: [],
}

// export default MapCanvas
export default DropTarget(DragTypes.DEVICE, canvasTarget, collect)(MapCanvas)
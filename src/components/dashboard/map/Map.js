import React from 'react'
import {findDOMNode} from 'react-dom'
import {assign, extend, findIndex} from 'lodash'
import ReactTooltip from 'react-tooltip'
import {withRouter} from 'react-router'

import MapCanvas from './MapCanvas'

import MapToolbar from './toolbar/MapToolbar'
import DeviceDragLayer from './DeviceDragLayer'
import DividerLine from './DividerLine'

import {ZoomOptions, ToolbarToggle} from './toolbar'

import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import {wizardConfig, getDeviceType} from 'components/common/wizard/WizardConfig'
import {showAlert, showConfirm} from 'components/common/Alert'
import MapItemModal from './mapItem/MapItemModal'
import FreeTextModal from 'components/modal/FreeTextModal'

import {fullScreen} from 'util/Fullscreen'
// import {isGroup} from 'shared/Global'

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            maximized: false,

            mapId: 0,

            tooltip: null,
            tipLeft: 0,
            tipTop: 0,
            tipWidth: 0,
            tipHeight: 0,

            tipObject: null,

            selectedItem: {},
            dropItem: null,
            dropItemPos: {},

            mapHeight: 520,

            deviceWizardConfig: {},
            deviceWizardVisible: false,
            cmap: null,

            mapItemModalOpen: false,
            editMapItem: null,
            freeTextVisible:false,
            freeText: '',
            freeTextOptions: {}
            
        }

        // /////////////////////////////////////////////

        this.mapListener = {
            onObjectSelected: this.onMapObjectSelected.bind(this),
            onSelectionCleared: this.onMapSelectionCleared.bind(this),

            onMouseDown: this.onMapMouseDown.bind(this),
            onObjectMoving: this.onMapObjectMoving.bind(this),
            onObjectMoved: this.onMapObjectMoved.bind(this),

            onLineUpdate: this.onMapLineUpdate.bind(this),
            onLineStyleChange: this.onMapLineStyleChange.bind(this),

            onTextChanged: this.onMapTextChanged.bind(this),

            onMouseOver: this.onMapMouseOver.bind(this),
            onMouseOut: this.onMapMouseOut.bind(this),
            onZoomRect: this.onMapZoomRect.bind(this),

            onDrop: this.onDrop.bind(this)
        }

        this.mapEvents = {

            // onClickAdd: this.onClickAdd.bind(this),
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

            onClickZoomRect: this.onClickZoomRect.bind(this),
            onClickZoomIn: this.onClickZoomIn.bind(this),
            onClickZoomOut: this.onClickZoomOut.bind(this),
            onClickZoomReset: this.onClickZoomReset.bind(this),

            onClickMaximize: this.onClickMaximize.bind(this),

            onClickDeviceItem: this.onClickDeviceItem.bind(this)

        }

        this.onFullScreenChange = this.onFullScreenChange.bind(this)
        this.onReceiveMapUpdated = this.onReceiveMapUpdated.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
        this.onChangeDivider = this.onChangeDivider.bind(this)
        this.onDragEndDivider = this.onDragEndDivider.bind(this)
    }

    componentDidMount() {
        if (fullScreen.supportsFullScreen) {
            document.body.addEventListener(fullScreen.fullScreenEventName, this.onFullScreenChange, true)
        }

        const mapHeight = Math.max(parseInt(window.innerWidth / 3, 10), this.state.mapHeight)
        setTimeout(() => {
            this.setState({mapHeight}, () => {
                window.dispatchEvent(new window.Event('resize'))
            })
        }, 10)

        this.props.fetchDeviceTemplates()
        this.props.fetchMonitorTemplates()
    }

    componentWillUnmount() {
        if (fullScreen.supportsFullScreen) {
            document.body.removeEventListener(fullScreen.fullScreenEventName, this.onFullScreenChange, true)
        }
    }

    renderDeviceWizard() {
        if (!this.state.deviceWizardVisible) return null

        const {options, callback, closeCallback} = this.state.deviceWizardConfig
         console.log('what is options in renderDeviceWizard', options)// ==> long hub | free text 
        let extra = {
            mapid: this.props.selectedMap.id,
            mapids: [this.props.selectedMap.id],
            x: options.x,
            y: options.y,
            width: options.width,
            height: options.height,
            image: options.imgName,
            templateName: options.templateName,
            workflowids: options.workflowids,
            tags: options.tpl.tags || []
        }

        let config = {
            mapid: this.props.selectedMap.id,
            mapids: [this.props.selectedMap.id]
        }

        return (
            <DeviceWizardContainer
                deviceType={options.type}
                onClose={() => {
                    this.setState({deviceWizardVisible: false})
                    closeCallback && closeCallback()
                }}
                title={options.title}
                monitors={options.monitors}
                extraParams={extra}
                configParams={config}
                onFinish={this.onFinishAddWizard.bind(this, callback)}
            />
        )
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onMapKeyUp(e) {
        if (e.key === 'Escape') {
            if (this.state.editable) {
                this.onClickEdit()
                this.toolbar.hideDeviceMenu()
            }

            this.setState({
                selectedItem: {},
                dropItem: null
            })
        }
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getDivMap() {
        return this.refs.map.getDecoratedComponentInstance()
    }

    getCanvasMap() {
        return this.getDivMap().getMapObject()
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onMapObjectSelected(cmap, obj) {
        this.setState({
            cmap: cmap,
            selectedObj: obj
        })
    }

    onMapSelectionCleared() {
        this.setState({
            selectedObj: null
        })
    }

    onMapMouseDown(map, obj) {
        console.log(obj.data)
        // this.props.openDevice(obj.data)
        //
        // if (isGroup(obj.data)) {
        //     this.props.history.push(`/device/${obj.data.id}/dashboard`)
        // } else {
        //     // this.props.history.push(`/device/${obj.data.id}/main`)
        //     this.props.history.push(`/device/${obj.data.id}/dashboard`)
        // }
        // ReactTooltip.hide()
    }

    onMapObjectMoving() {

    }

    onMapObjectMoved(map, options, type) {
        if (!options) return
        return this.moveMapItem(map, options, type)
    }

    onMapLineUpdate(lineObj, callback) {
        let lineId = lineObj.id

        if (lineObj.startObj.id === lineObj.endObj.id) {
            showAlert('Can not add line to the same object.')
            return
        }

        if (!lineId) {
            let props = {
                type: 'LINE',
                mapid: this.props.selectedMap.id,
                mapids: [this.props.selectedMap.id],
                from: lineObj.startObj.id,
                fromPoint: lineObj.startPoint,
                to: lineObj.endObj.id,
                toPoint: lineObj.endPoint,
                lineType: 'normal'
            }

            this.props.addMapLine(props, (res) => {
                if (res) lineObj.id = res.id
            })
        } else {
            let con = this.findMapLine(lineId)
            if (con) {
                const props = extend({}, con, {
                    from: lineObj.startObj.id,
                    fromPoint: lineObj.startPoint,
                    to: lineObj.endObj.id,
                    toPoint: lineObj.endPoint
                })

                this.props.updateMapLine(props)
            }
        }
    }

    onMapLineStyleChange(lineObj, style) {
        let lineId = lineObj.id
        if (!lineId) return

        const obj = this.findMapLine(lineId)
        if (!obj) return

        const props = assign({}, obj, {
            lineWidth: style.width,
            color: style.color
        })

        this.props.updateMapLine(props)
    }

    onMapTextChanged(map, props, isLabel) {
        this.props.updateMapItem(props)
    }

    onMapMouseOver(map, obj) {
        if (this.state.editable) return

        let tooltip = obj.tooltip || ''
        if (tooltip) tooltip = `<div class='text-center'>${tooltip}</div>`
        else if (!this.state.tooltip) return

        let rect = obj.getBoundingRect()
        this.setState({
            tooltip: tooltip,
            tipLeft: rect.left,
            tipTop: rect.top,
            tipWidth: rect.width,
            tipHeight: rect.height,
            tipObject: obj
        }, () => {
            ReactTooltip.show(findDOMNode(this.refs.deviceTooltip))
        })
    }

    onMapMouseOut() {
        if (!this.state.tooltip) return
        this.setState({
            tooltip: null
        })
        ReactTooltip.hide()
    }

    onMapZoomRect() {

    }

    onDrop(item, offset) {
        //console.log('being dropped item original,',item)

        let doc = document.documentElement
        let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

        let cmap = this.getCanvasMap()
        let pos = cmap.canvas.getPointer({
            clientX: offset.x + left,
            clientY: offset.y + top
        })
        let {x, y} = pos

        if (item.id) {
            const {allDevices, selectedMap} = this.props
            const index = findIndex(allDevices, {id: item.id})
            if (index < 0) return
            let device = allDevices[index]
            device = {
                ...device,
                mapid: device.mapid || selectedMap.id,
                mapids: [...(device.mapids || []), selectedMap.id],
                x: x,
                y: y,
                textX: x,
                textY: y + 60,
                width: 50,
                height: 50
            }
            this.props.updateMapItem(device)

            const refMap = this.getDivMap()
            let cmap = this.getCanvasMap()
            refMap.addMapItem(cmap, device, () => {
                 //test this part.. 
                 console.log('adding map item via device', device)
            })
        } else if (item.template === 'mapItem') {
           console.log('iam the mapItem')
            const editMapItem = {
                type: item.type,
                title: item.title,
                imgName: item.img,
                imageUrl: `/externalpictures?name=${item.img}`,
                x: x,
                y: y,
                width: 50,
                height: 50
            }

            //console.log(editMapItem)

            this.setState({
                mapItemModalOpen: true,
                editMapItem,

                dropItem: null,
                selectedItem: {}
            })
        } else {
           //console.log('iam not mapItem n i have no item.id ==> related to free text n long hub')
            let options = {
                title: item.title,
                type: getDeviceType(item.template.name),
                imgName: item.img,
                imageUrl: `/externalpictures?name=${item.img}`,
                x: x,
                y: y,
                width: 50,
                height: 50,

                tpl: item.template,
                monitors: item.template.monitors,
                templateName: item.template.name,
                workflowids: item.template.workflowids || []
            }
             //console.log('free text n long hub options', options) //focus here
            if (options.type === 'longhub') {
                options.type = 'LONGHUB'
                options.width = 400
                options.height = 3
            } else if (options.type === 'bi-pie') {
                options.width = 200
                options.height = 200
            } else if (options.type === 'bi-bar') {
                options.width = 200
                options.height = 200
            } else if (options.type === 'bi-line') {
                options.width = 200
                options.height = 200
            } else if (options.type === 'usertext') {
              //make change also here.. options.type = 'USERTEXT'
              //options.type = 'USERTEXT' //to avoid confusing deviceWizard part..
                options.width = 100
                options.height = 30
            }

            options.x -= options.width / 2
            options.y -= options.height / 2

            this.setState({
                dropItem: item,
                dropItemPos: offset
            })

            this.showAddWizard(options, (id, name, data) => {
               console.log(' i have reached near!!!', data)
                const refMap = this.getDivMap()
                let cmap = this.getCanvasMap()
                refMap.addMapItem(cmap, data, () => {
                   //console.log('show the mapItem', data)
                })
            }, () => {
                this.setState({dropItem: null, selectedItem: {}})
            })
        }


    }

    onClickTooltip() {
        this.onMapMouseDown(null, this.state.tipObject)
        this.setState({tooltip: null})
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickEdit() {
        console.log('edit button clicked')
        let cmap = this.getCanvasMap()
        cmap.zooming && cmap.setZooming(false)

        this.setState({
            editable: !this.state.editable,
            selectedItem: {}
        })
    }

    onClickDelete() {
        let cmap = this.getCanvasMap()
        this.promptRemoveMapItem(cmap)
    }

    onClickFontSizeUp() {
        let cmap = this.getCanvasMap()
        cmap.changeFontSize(true)
    }

    onClickFontSizeDown() {
        let cmap = this.getCanvasMap()
        cmap.changeFontSize(false)
    }

    onClickAlignLeft() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('left')
    }

    onClickAlignCenter() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('center')
    }

    onClickAlignRight() {
        let cmap = this.getCanvasMap()
        cmap.changeAlign('right')
    }

    onClickLineWidthInc() {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeWidth(true)
    }

    onClickLineWidthDec() {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeWidth(false)
    }

    onChangeLineColor(color) {
        let cmap = this.getCanvasMap()
        cmap.changeStrokeColor(color)
    }

    onChangeLineType(type, imgUrl) {
        let cmap = this.getCanvasMap()
        const lineId = cmap.changeConnectorType(type, imgUrl)
        if (!lineId) return

        this.changeLineType(lineId, type)
    }

    onClickZoomRect() {
        let cmap = this.getCanvasMap()
        cmap.setZooming(!cmap.zooming)

        this.setState({cmap})
    }

    onClickZoomIn() {
        let cmap = this.getCanvasMap()
        cmap.zoomIn()
    }

    onClickZoomOut() {
        let cmap = this.getCanvasMap()
        cmap.zoomOut()
    }

    onClickZoomReset() {
        let cmap = this.getCanvasMap()
        cmap.zoomReset()
    }

    onClickMaximize() {
        const {isFullScreen} = this.props
        this.props.requireFullScreen(!isFullScreen)

        if (fullScreen.supportsFullScreen) {
            if (isFullScreen) {
                fullScreen.cancelFullScreen()
            } else {
                fullScreen.requestFullScreen(document.body)
            }
        } else {

        }
    }

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onReceiveMapUpdated(msg) {
        const mapId = parseInt(msg.content, 10)
        if (!mapId) return
    }

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    moveMapItem(map, params, type) {
        if (!params) return true
        if (params.groupid) params.mapid = null
        this.props.updateMapItem(params)
    }

    addMapUploading(map, id) {
        if (!map) return
        map.addUploading(id)
    }

    removeMapUploading(map, id) {
        if (!map) return
        map.removeUploading(id)
    }

    promptRemoveMapItem(cmap) {
        if (!cmap) return
        if (!cmap.editable) return

        let object = cmap.getSelected()
        if (!object) {
            showAlert('Please select a device to remove.') // eslint-disable-line no-undef
            return
        }

        let name = '' // eslint-disable-line no-unused-vars
        let {data} = object
        if (object.objectType === MapItemType.Device || object.objectSubType === MapItemType.ShapeHub || object.objectSubType === MapItemType.ShapeText) { // eslint-disable-line no-undef
            name = `Name: ${object.data.name}`
        } else if (object.objectType === MapItemType.Shape) { // eslint-disable-line no-undef
            data = this.findMapLine(object.id)
        }

        showConfirm('Click OK to delete.', (btn) => {
            if (btn !== 'ok') return

            if (data) {
                if (!name) {
                    this.props.deleteMapLine(data)
                } else {
                    this.props.removeMapItem(data)
                    // this.props.updateMapItem({
                    //     ...data,
                    //     mapid: this.props.selectedMap.id === data.mapid ? null : data.mapid,
                    //     mapids: data.mapids.filter(p => p !== this.props.selectedMap.id)
                    // })
                }
            }
            cmap.removeMapItem(object, true)
        })
    }

    changeLineType(lineId, lineType) {
        let con = this.findMapLine(lineId)
        if (con) {
            const props = extend({}, con, {
                lineType
            })

            this.props.updateMapLine(props)
        }
    }

    findMapLine(lineId) {
        let con = this.props.mapLines.filter(u => u.id === lineId)
        if (con.length) return con[0]
        return null
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    showAddWizard(options, callback, closeCallback) {
      //console.log('showAddWizard in action', options)
        if (options.type === 'longhub' || options.type === 'LONGHUB') {
            const params = {
                type: 'LONGHUB',
                name: 'longhub',
                angle: 0,
                x: options.x,
                y: options.y,
                width: options.width,
                height: options.height,
                templateName: options.templateName,
                mapid: this.props.selectedMap.id,
                mapids: [this.props.selectedMap.id]
            }

            this.onClickEdit()
            this.props.addMapItem(params)

            closeCallback && closeCallback()
            if (this.state.editable) this.onClickEdit()
        } else if (options.type === 'usertext' || options.type === 'USERTEXT') {
           //cater for the FREE TEXT.
           //u need to get the text from the input modal before constructing options.
           //u shall use ur own modal dialog.. if it fails. serg wanted u to do..
            const paramsObj = {
              //type: 'usertext',
              type: 'CUSTOM',
              x: options.x,
              y: options.y,
              width: options.width,
              height: options.height,
              //fontSize: textSize || 11
              fontSize: 11,
              //textAlign: textAlign,
              mapids:[this.props.selectedMap.id],
              params: {text: 'hello goldsoft'}          
            } //use it after the addWizard... modal
             //take a look at free text
               //how are going to call the itemModal part.
               //planning to use the device Wizard part...
               /*this.setState({ //activate the renderDeviceWizard method.
                 deviceWizardConfig:{
                   options,callback, closeCallback
                 },
                 deviceWizardVisible: true
               })*/ 
                 this.setState({freeTextVisible: true})
                 //this.renderFreeTextModal();
               //console.log('hey usertext', params)
               this.onClickEdit()
               //this.props.addMapItem(params)

               //closeCallback && closeCallback()
               if (this.state.editable) this.onClickEdit()
                 
        } else {
          /*if (wizardConfig[options.type] === null) {
              showAlert(`Unrecognized Type: ${options.type}`) // eslint-disable-line no-undef
              return
          }

          this.setState({
              deviceWizardConfig: {
                  options, callback, closeCallback
              },
              deviceWizardVisible: true
          })*/
            
        } 
    }

    onFinishAddWizard(callback, res, params, url) {
        params.textWidth = Math.max(8 * params.name.length, 50)
        params.textX = params.x + params.width / 2 - params.textWidth / 2
         console.log('i want to see results after text input',params) //good finally
        //this.props.addMapDevice(params, url)
        //finally u need to call the addMapItem props here.
        //this.props.addMapItem(params);
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onFullScreenChange() {
        if (fullScreen.isFullScreen()) {
            if (!this.props.isFullScreen) this.onClickMaximize()
        } else {
            if (this.props.isFullScreen) this.onClickMaximize()
        }

        setTimeout(() => {
            window.dispatchEvent(new window.Event('resize'))
        }, 500)
    }

    updateDimensions() {

    }

    // //////////////////////////////////////////////////////

    onClickDeviceItem(selectedItem, e) {
        this.setState({selectedItem}, () => {
        })
    }

    // //////////////////////////////////////////////////////

    onChangeDivider(diffY) {
        let {mapHeight} = this.state
        mapHeight += diffY
        if (mapHeight < 250) mapHeight = 250
        this.setState({mapHeight})
    }

    onDragEndDivider() {
        window.dispatchEvent(new window.Event('resize')) // eslint-disable-line no-undef
    }

    //////////////////////////////////////////////////////////////

    onSaveMapItem(mapItem) {
        console.log('iam saving on the map')
        const {editMapItem} = this.state
        console.log(mapItem)
        const entity = {
            ...editMapItem,
            mapids: [this.props.selectedMap.id],
            type: mapItem.type,
            itemId: mapItem.item.id || mapItem.item.uid,
            entity: {
                ...mapItem.item,
                parentName: mapItem.parent ? mapItem.parent.name : ''
            }
        }

        console.log(entity)

        this.props.addMapItem(entity)
        this.onCloseMapItem()
    }

    onCloseMapItem() {
        this.setState({
            mapItemModalOpen: false
        })
    }

    //////////////////////////////////////////////////////////////

    renderMapItemModal() {
        if (!this.state.mapItemModalOpen) return null
        const {devices, fetchDevices, vendorProducts, fetchVendorProducts} = this.props
        return (
            <MapItemModal
                devices={devices}
                fetchDevices={fetchDevices}
                editMapItem={this.state.editMapItem}
                vendorProducts={vendorProducts}
                fetchVendorProducts={fetchVendorProducts}
                onSave={this.onSaveMapItem.bind(this)}
                onClose={this.onCloseMapItem.bind(this)}
            />
        )
    }
    
    /////////////////////////////////////////////////////
    
    renderFreeTextModal(){
      if (!this.state.freeTextVisible) return null 
      const freeTextObj = {
        title: 'FREE TEXT MAP ITEM',
        buttonText: 'Submit'
      }
       return (
         <FreeTextModal 
            header = {freeTextObj.title} 
            defaultValue = {this.state.freeText}
            onChangeText = {this.handleTextChange.bind(this)}
            onHide = {this.closeFreeTextModal.bind(this)}
            onSubmit = {this.handleFreeTextForm.bind(this)}
            buttonText = {freeTextObj.buttonText}            
         />
       )
    }
    
    //handleFormSubmit for the adding free text.
    handleFreeTextForm(e){
       e.preventDefault()
       let value = this.state.freeText,
           updatedValue = this.state.freeTextOptions
           updatedValue.params.text = value
           this.setState({freeTextOptions:updatedValue})
           this.setState({freeTextVisible:false}) 
           this.props.addMapItem(updatedValue)
    }
    handleTextChange(e){
      this.setState({freeText: e.target.value})
    }
    closeFreeTextModal(){
      this.setState({open: false})
    }

    render() {
        let events = this.mapEvents
        const {selectedItem, dropItem, dropItemPos, editable, mapHeight} = this.state
        const maximized = this.props.isFullScreen
        const {tooltip, tipLeft, tipTop, tipWidth, tipHeight} = this.state
        return (
            <div className={`map-row${maximized ? ' map-maximized' : ''}`}
                 tabIndex="-1" style={{outline: 0}} onKeyUp={this.onMapKeyUp.bind(this)}>
                <div className="panel panel-default mb-none" id="mapeditdiv" style={{position: 'relative'}}>
                    <MapToolbar
                        {...this.props}
                        {...events}
                        {...this.state}
                        selectedItem={selectedItem}
                        ref={(toolbar) => {
                            this.toolbar = toolbar
                        }}
                    />

                    <div className="panel-body p-none"
                         style={{height: maximized ? '100%' : (`${mapHeight}px`), position: 'relative'}}>
                        <div className={`map-hover ${tooltip ? '' : 'hidden'}`} ref="deviceTooltip"
                             data-tip={tooltip}
                             data-html
                             style={{left: tipLeft, top: tipTop, width: tipWidth, height: tipHeight}}
                             onClick={this.onClickTooltip.bind(this)}/>
                        <MapCanvas
                            listener={this.mapListener}
                            editable={editable}
                            dragItem={selectedItem}
                            dropItem={dropItem}
                            dropItemPos={dropItemPos}
                            hidden={this.props.hidden}
                            mapDevices={this.props.mapItems}
                            monitorTemplates={this.props.monitorTemplates}
                            mapLines={this.props.mapLines}
                            showTraffic={this.props.showTraffic}
                            ref="map"/>
                        <DeviceDragLayer/>
                        {maximized ? null :
                            <DividerLine onDragMove={this.onChangeDivider} onDragEnd={this.onDragEndDivider}/>}
                        <div className="map-bottom-bar">
                            <ZoomOptions
                                onZoomRect={this.onClickZoomRect.bind(this)}
                                onZoomIn={this.onClickZoomIn.bind(this)}
                                onZoomOut={this.onClickZoomOut.bind(this)}
                                onZoomReset={this.onClickZoomReset.bind(this)}
                            />
                            <ToolbarToggle onToggle={this.onClickMaximize.bind(this)}/>
                        </div>
                    </div>
                </div>

                {this.renderMapItemModal()}
                {this.renderDeviceWizard()}
                {this.renderFreeTextModal()}

            </div>
        )
    }
}

Map.defaultProps = {
    drawMapInterval: 4000,
    hidden: false
}

export default withRouter(Map)

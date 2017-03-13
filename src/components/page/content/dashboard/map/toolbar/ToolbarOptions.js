import React, { Component } from 'react'
import { ZoomOptions, DeleteObject, ColorPicker, LineWidthInc, LineWidthDec,
  TextChange, RotateHubLeft, RotateHubRight, ChangeLineType, OptionUploader,
  EditMapMenu, LogOut, DropdownToggle, DeviceMenuContainer} from './index'

class ToolbarOptions extends Component {
  render () {
    return (
      <div className="panel-options main-map-options" style={{top: '15px'}}>
        <ul className="nav nav-tabs" style={{background: 'transparent'}}>
          <ZoomOptions
            onMaximize={this.props.onMaximize}
            maximized={this.props.maximized}
            zooming={this.props.zooming}
            onZoomRect={this.props.onClickZoomRect}
            onZoomIn={this.props.onClickZoomIn}
            onZoomOut={this.props.onClickZoomOut}
            onZoomReset={this.props.onClickZoomReset}
          />
        <DeleteObject obj={this.props.obj} onDelete={this.props.onClickDelete}/>
          <ColorPicker
            line={this.props.line}
            popover={this.props.popover}
            cover={this.props.cover}
            lineGroup={this.props.lineGroup}
            isPickerDisplayed={this.props.isPickerDisplayed}
            onColorPick={this.props.onColorPick}
            onPickerChange={this.props.onPickerChange}
            onPickerClose={this.props.onPickerClose}
          />
          <LineWidthInc
            lineGroup={this.props.lineGroup}
            onLineWidthInc={this.props.onClickLineWidthInc}
          />
          <LineWidthDec
            lineGroup={this.props.lineGroup}
            onLineWidthDec={this.props.onClickLineWidthDec}
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickFontSizeUp}
            icon="fa fa-arrow-up"
            title="Increase Font Size"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickFontSizeDown}
            icon="fa fa-arrow-down"
            title="Decrease Font Size"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignLeft}
            icon="fa fa-align-left"
            title="Align Left"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignCenter}
            icon="fa fa-align-center"
            title="Align Center"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignLeft}
            icon="fa fa-align-right"
            title="Align Right"
          />
          <RotateHubLeft hub={this.props.hub} />
          <RotateHubRight hub={this.props.hub} />
          <ChangeLineType
            line={this.props.line}
            lineTypes={this.props.lineTypes}
            onChange={this.props.toggleLineTypes}
          />
          <OptionUploader />
          <EditMapMenu {...this.props}/>
          <DeviceMenuContainer {...this.props}/>
          <LogOut />
          <DropdownToggle />
        </ul>
      </div>
    )
  }
}

export default ToolbarOptions

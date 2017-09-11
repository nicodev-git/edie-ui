import React, { Component } from 'react'
import {IconButton} from 'material-ui'
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-upward'

import { DeleteObject, ColorPicker, LineWidthInc, LineWidthDec,
  TextChange, RotateHubLeft, RotateHubRight, ChangeLineType, OptionUploader,
  EditMapMenu, DropdownToggle, DeviceMenuContainer } from './index'

const buttonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

const iconStyle = {
  width: 30,
  height: 30
}

class ToolbarOptions extends Component {
  render () {
    return (
      <div className="panel-options main-map-options toolbar-options" style={{top: '0px'}}>
        <EditMapMenu
          onEdit={this.props.onMapEdit}
          onUndo={this.props.onEditMapUndo}/>
        <DeviceMenuContainer {...this.props}/>
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

        <IconButton
          onTouchTap={this.props.onClickFontSizeUp}
          className={this.props.obj ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Increase Font Size">
          <ArrowUpIcon color="#545454"/>
        </IconButton>

        <IconButton
          onTouchTap={this.props.onClickFontSizeDown}
          className={this.props.obj ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Decrease Font Size">
          <ArrowDownIcon color="#545454"/>
        </IconButton>

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
        <DropdownToggle />
      </div>
    )
  }
}

export default ToolbarOptions

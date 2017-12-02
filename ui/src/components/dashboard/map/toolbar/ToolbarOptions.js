import React, { Component } from 'react'
import {IconButton} from 'material-ui'
import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUpIcon from 'material-ui/svg-icons/navigation/arrow-upward'

import { DeleteObject, ColorPicker,
  TextChange, RotateHubLeft, RotateHubRight, ChangeLineType, OptionUploader,
  EditMapMenu, DropdownToggle, DeviceMenuContainer } from './index'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

const iconStyle = {
  width: 30,
  height: 30
}

class ToolbarOptions extends Component {
  render () {
    const {canEdit} = this.props
    return (
      <div className="panel-options main-map-options toolbar-options" style={{top: '0px'}}>
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

        <IconButton
          onTouchTap={this.props.onClickLineWidthInc}
          className={this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Increase Line Width">
          <ArrowUpIcon color="#545454"/>
        </IconButton>

        <IconButton
          onTouchTap={this.props.onClickLineWidthDec}
          className={this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Decrease Line Width">
          <ArrowDownIcon color="#545454"/>
        </IconButton>

        <IconButton
          onTouchTap={this.props.onClickFontSizeUp}
          className={this.props.obj && !this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Increase Font Size">
          <ArrowUpIcon color="#545454"/>
        </IconButton>

        <IconButton
          onTouchTap={this.props.onClickFontSizeDown}
          className={this.props.obj && !this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}
          iconStyle={iconStyle}
          tooltip="Decrease Font Size">
          <ArrowDownIcon color="#545454"/>
        </IconButton>

        <DeleteObject obj={this.props.obj} onDelete={this.props.onClickDelete}/>
        {canEdit && <EditMapMenu
          onEdit={this.props.onMapEdit}
          onUndo={this.props.onEditMapUndo}/>}
        {canEdit && <DeviceMenuContainer {...this.props}/>}
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

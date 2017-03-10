import React from 'react'

const ColorPicker = ({ line, lineGroup, isPickerDisplayed,
  onColorPick, onPickerChange, onPickerClose }) => (
  <li>
    <div
      className="input-group colorpicker-element"
      style={{display: lineGroup ? 'block' : 'none'}}
      onClick={onColorPick}
    >
      <div className="input-group-addon">
        <i className="color-preview" style={{background: lineGroup ? line.getStrokeColor() : 'black'}} />
      </div>
    </div>
    {
      isPickerDisplayed ? <div style={popover}>
        <div style={cover} onClick={onPickerClose}/>
        <ChromePicker
          color={lineGroup ? line.getStrokeColor() : 'black'}
          onChangeComplete={onPickerChange}
        />
      </div> : null
    }
  </li>
)

export default ColorPicker

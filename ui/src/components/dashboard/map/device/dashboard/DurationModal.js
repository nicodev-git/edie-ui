import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const customContentStyle = {
  maxWidth: '400px'
}

class DurationModal extends React.Component {

  onClickClose () {
    this.closeModal()
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }

  onClickOK () {
    this.closeModal({
      value: this.refs.value.value,
      period: this.refs.period.value,
      unit: this.refs.unit ? this.refs.unit.value : null
    })
  }

  render () {
    const {values, hideUnit} = this.props
    const {value, period, unit} = values

    const actions = [
      <FlatButton
        key="0"
        label="Cancel"
        onTouchTap={this.onClickClose.bind(this)}
        primary
      />,
      <FlatButton
        key="1"
        label="OK"
        primary
        onTouchTap={this.onClickOK.bind(this)}
      />
    ]

    return (
      <Dialog
        title="Duration"
        actions={actions}
        modal open
        contentStyle={customContentStyle}
      >
        <div className="form-inline text-center">

          <label>Show Last </label>

          <input type="text" className="form-control text-right input-sm input-custom" ref="value" maxLength="3"
                 defaultValue={value || 3}/>

          <select className="form-control input-sm select-custom" ref="period" defaultValue={period || 'hour'}>
            <option value="hour">Hours</option>
            <option value="day">Days</option>
            <option value="month">Months</option>
          </select>

          {
            hideUnit ? null
              : <label> With Resolution of </label>
          }

          {
            hideUnit ? null
              : <select className="form-control input-sm select-custom" ref="unit" defaultValue={unit || 'hour'}>
                <option value="hour">Hour</option>
                <option value="day">Day</option>
              </select>
          }
        </div>
      </Dialog>
    )
  }
}

DurationModal.defaultProps = {
  onClose: null,
  hideUnit: false,
  values: {}
}

export default DurationModal

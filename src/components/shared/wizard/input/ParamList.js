import React from 'react'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle } from 'style/materialStyles'

const styles = {
  chip: {
    margin: 4
  },
  chipLabel: {
    fontSize: '12px'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '300px',
    overflow: 'auto'
  }
}
class ParamList extends React.Component {
  onClickAdd () {
    this.props.openParamEditModal()
  }

  onClickSave () {
    let params = {}
    this.props.editParams.forEach(p => {
      params[p.key] = p.value
    })
    this.props.updateMonitorParams(params)
  }

  onClickEdit (p) {
    this.props.openParamEditModal(p)
  }

  onClickRemove (p) {
    this.props.removeParam(p)
  }

  render () {
    return (
      <div>
        <div className="margin-sm-bottom">
          <FlatButton label="Add Params" onClick={this.onClickAdd.bind(this)}
            style={buttonStyle} labelStyle={buttonTextStyle}/>
        </div>
        <div style={styles.wrapper} className="margin-lg-bottom margin-md-top">
          {this.props.editParams.map(p =>
            <Chip
              key={p.key}
              style={styles.chip}
              labelStyle={styles.chipLabel}
              onTouchTap={this.onClickEdit.bind(this, p)}
              onRequestDelete={this.onClickRemove.bind(this, p)}
            >
              <b>{p.key}</b>: {p.value}
            </Chip>
          )}
        </div>

      </div>
    )
  }
}

export default ParamList

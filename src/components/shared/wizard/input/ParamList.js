import React from 'react'
import Chip from 'material-ui/Chip'

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
      <div style={styles.wrapper} className="margin-lg-bottom margin-md-top">
        <Chip style={styles.chip} onTouchTap={this.onClickAdd.bind(this)}><b>Add Param</b></Chip>
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
    )
  }
}

export default ParamList

import React from 'react'
import Chip from 'material-ui/Chip'

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '300px',
    overflow: 'auto',
    marginBottom: '12px'
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

  onClickRemove (p) {
    this.props.removeParam(p)
  }

  render () {
    return (
      <div>
        <div className="margin-sm-bottom">
          <span>Params</span>
          <span className="padding-lg-left">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickAdd.bind(this)}>Add</a>
          </span>
        </div>
        <div style={styles.wrapper}>
          {this.props.editParams.map(p =>
            <Chip
              key={p.key}
              style={styles.chip}
              onRequestDelete={this.onClickRemove.bind(this, p)}
            >
              {p.key}:{p.value}
            </Chip>
          )}
        </div>

      </div>
    )
  }
}

export default ParamList

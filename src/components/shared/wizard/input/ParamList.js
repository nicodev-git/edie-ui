import React from 'react'

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

  render() {
    return (
      <div>
        <div style={{}}>
          <table className="table table-hover">
            <tbody>
            {this.props.editParams.map(p =>
              <tr key={p.key}>
                <td>{p.key}</td>
                <td>{p.value}</td>
                <td className="text-right">
                  <a href="javascript:;" onClick={this.onClickRemove.bind(this, p)}>
                    <i className="fa fa-trash-o"/>
                  </a>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className="text-right p-none">
          <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
             onClick={this.onClickAdd.bind(this)}>Add</a>

          <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right"
             onClick={this.onClickSave.bind(this)}>Save</a>
          <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
        </div>
      </div>
    )
  }
}

export default ParamList
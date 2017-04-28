import React from 'react'
import { isEqual, assign } from 'lodash'
import { ROOT_URL } from 'actions/config'

class JDataTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      selected: -1
    }

    this.draw = 1
  }

  componentWillMount () {
    this.load(this.props.params)
  }

  componentWillReceiveProps (nextProps) {
    if (!isEqual(nextProps.params, this.props.params)) {
      this.load(nextProps.params)
    }
  }

    // ///////////////////////////////////////////////////////////////////

  load (params) {
    let {url, start, length} = this.props
    if (!url) return
    let draw = this.draw++

    $.get(`${ROOT_URL}${url}`, assign({}, {draw, start, length}, params)) // eslint-disable-line no-undef
        .done(res => {
          this.setState({
            data: res.data,
            selected: -1
          })
        }).fail(() => {

        })
  }

  getSelected () {
    const { selected } = this.state
    if (selected < 0) return []
    return [this.state.data[selected]]
  }

  reload () {
    this.load(this.props.params)
  }

    // ///////////////////////////////////////////////////////////////////

  onClickRow (index) {
    if (!this.props.selectable) return
    this.setState({
      selected: index
    })
  }

  render () {
    let style = {
      overflow: 'auto',
      height: this.props.height
    }

    return (
      <div style={style}>
        <table className={`table ${this.props.className}`}>
          <thead>
          <tr>
            {this.props.columns.map((col, index) =>
              <th key={index}>{col.title}</th>
            )}
          </tr>
          </thead>
          <tbody>
          {
            this.state.data.map((row, i) =>
              <tr key={i}
                onClick={this.onClickRow.bind(this, i)}
                onDoubleClick={this.props.onRowDblClick}
                className={this.state.selected === i ? 'selected' : ''}>
                {this.props.columns.map((col, index) =>
                  <td key={index}>
                    {
                      col.render ? col.render(row[col.data], row) : row[col.data]
                    }
                  </td>
                )}
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    )
  }
}

JDataTable.defaultProps = {
  className: '',
  height: '200px',

  columns: [],
  selectable: true,

  url: '',
  params: {},
  start: 0,
  length: 50,

  onRowDblClick: null
}

export default JDataTable

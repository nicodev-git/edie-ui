import React, {Component} from 'react'
import Select from '@material-ui/core/Select'
import {MenuItem} from '@material-ui/core'

export const style = {
  width: 128,
  height: '100%',
  verticalAlign: 'top',
  lineHeight: 0,
  paddingRight: 0
}

export const labelStyle = {
  lineHeight: 2.5,
  paddingRight: 5,
  paddingLeft: 10
}

export const listStyle = {
  width: 110
}

export default class Selector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.values[0]
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
  }

  handleChange (event, index, value) {
    this.setState({
      value: value
    })
    this.props.onChange(event)
  }

  renderList () {
    let options = this.props.options
    let values = this.props.values
    let list = []
    for (let i = 0; i < options.length; i++) {
      list.push(<MenuItem key={i} value={values[i]}>{options[i]}</MenuItem>)
    }
    return list
  }

  render () {
    let menuItemsList = this.renderList()
    let autoWidth = true
    return (
      <Select
        value={this.state.value}
        autoWidth={autoWidth}
        onChange={this.handleChange.bind(this)}
        style={style}
        
        listStyle={listStyle}
        underlineStyle={{display: 'none'}}
      >
        {menuItemsList}
      </Select>
    )
  }
}

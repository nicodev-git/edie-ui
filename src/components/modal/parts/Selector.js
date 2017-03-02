import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

export default class Selector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 1
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
    let list = []
    for (let i = 0; i < options.length; i++) {
      list.push(<MenuItem key={i} value={i + 1} primaryText={options[i]} />)
    }
    return list
  }

  render () {
    let menuItemsList = this.renderList()
    return (
      <SelectField
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      >
        {menuItemsList}
      </SelectField>
    )
  }
}

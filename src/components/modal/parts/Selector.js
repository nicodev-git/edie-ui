import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

/* const styles = {
  customWidth: {
    width: 150
  }
} */

export default class Selector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.defaultValue
    }
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
      list.push(<MenuItem key={i} value={values[i]} primaryText={options[i]} />)
    }
    return list
  }

  render () {
    let menuItemsList = this.renderList()
    return (
      <SelectField
        floatingLabelText={this.props.label}
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      >
        {menuItemsList}
      </SelectField>
    )
  }
}

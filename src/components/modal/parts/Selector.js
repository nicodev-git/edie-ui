import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  customWidth: {
    width: 150
  }
}

export default class Selector extends Component {
  state = {
    value: this.props.defaultValue
  }

  handleChange (event, index, value) {
    this.setState({value})
    this.props.onChange()
  }

  renderList () {
    let options = this.props.options
    let values = this.props.values
    let list = []
    for (let i = 0; i < options.length; i++) {
      list.push(<MenuItem value={values[i]} primaryText={options[i]} />)
    }
  }

  render () {
    let menuItemsList = this.renderList()
    return (
      <SelectField
        floatingLabelText={this.props.label}
        value={this.state.value}
        onChange={this.handleChange}
        style={styles.customWidth}
      >
        {menuItemsList}
      </SelectField>
    )
  }
}

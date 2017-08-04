import React from 'react'
import {IconButton, SelectField, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { showPrompt } from 'components/common/Alert'

export default class MainDashboard extends React.Component {
  componentWillMount () {
    this.props.fetchGaugeBoards()
  }
  componentWillUpdate (nextProps) {
    const {gaugeBoards} = nextProps
    if (!this.props.gaugeBoards.length && gaugeBoards.length) {
      this.prop.selectGaugeBoard(gaugeBoards[0].id)
    }
  }
  getTabs () {
    return this.props.gaugeBoards.map(p => ({
      title: p.name
    }))
  }
  onChangeBoard (e, index, value) {
    this.props.selectGaugeBoard(value)
  }
  onClickAdd () {
    showPrompt('Please type name.', '', name => {
      if (!name) return
      this.props.addGaugeBoard({
        name
      })
    })
  }
  onClickTab (index) {

  }
  render () {
    return (
      <div className="tabs-custom flex-vertical flex-1">
        <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Dashboard" value={this.props.selectedGaugeBoard} onChange={this.onChangeBoard.bind(this)}
            className="valign-top">
            {this.props.gaugeBoards.map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>
          <IconButton onTouchTap={this.onClickAdd.bind(this)} className="valign-bottom"><AddCircleIcon /></IconButton>
        </div>

        <div className="flex-vertical flex-1">

        </div>
      </div>
    )
  }
}

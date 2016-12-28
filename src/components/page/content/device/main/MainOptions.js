import React from 'react'
import { withRouter} from 'react-router'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter'
import { EVENTS } from 'shared/event/Events'
import { ROOT_URL } from '../../../../../actions/config'

class MainOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      severities: [
                { label: 'High', value: 'High'},
                { label: 'Medium', value: 'Medium'},
                { label: 'Low', value: 'Low'},
                { label: 'Audit', value: 'Audit'},
                { label: 'Ignore', value: 'Ignore'}
      ],

      selectedSeverity: ['High', 'Medium'],

      ruleCategories: [{
        label: '[All Categories]', value: 0
      }],
      selectedCategory: 0,
      selectedCategoryName: ''
    }

        // /////////////////////////////////////////

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onChangeRuleCategory = this.onChangeRuleCategory.bind(this)
  }

  componentWillMount () {
    this.loadRuleCategories()
  }

    // ////////////////////////////////////////////////////////////////////////////////

  onChangeSeverity (selected) {
    this.setState({
      selectedSeverity: selected.map(item => item.value)
    }, () => {
      this.onFilterChange()
    })
  }

  onFilterChange () {
    emit(EVENTS.DEV_FILTER_CHANGED, this.getOptions())
  }

  onTabChange () {

  }

  getOptions () {
    let selectedTab = this.props.selectedTab

    if (selectedTab === 1) {
      return {
        text: this.refs.search.value,
        severity: this.state.selectedSeverity,
        fixed: this.refs.fixed.value,
        startTime: this.refs.dp.getStartDate().format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.refs.dp.getEndDate().format('YYYY-MM-DD HH:mm:ss')
      }
    } else if (selectedTab === 2 || selectedTab === 5) {
      return {
        categoryId: this.state.selectedCategory,
        categoryName: this.state.selectedCategoryName
      }
    } else if (selectedTab === 3) {
      return {
        text: this.refs.search.value
      }
    }
  }

    // ////////////////////////////////////////////////////////////////////////////////

  loadRuleCategories () {
    $.get(`${ROOT_URL}${Api.rule.getCategories}`, {})
            .done(res => {
              let data = [{
                label: '[All Categories]', value: 0
              }]

              let selected
              res.forEach(item => {
                data.push({
                  label: item.name,
                  value: item.id
                })

                if (item.id === this.state.selectedCategory) {
                  selected = item
                }
              })

              this.setState({
                ruleCategories: data,
                selectedCategory: selected ? selected.id : 0,
                selectedCategoryName: selected ? selected.name : ''
              })
            })
  }

  onChangeRuleCategory (selected) {
    this.setState({
      selectedCategory: selected.value,
      selectedCategoryName: selected.label
    }, () => {
      this.onFilterChange()
    })
  }

  onUpdateCategory () {
    this.loadRuleCategories()
  }

  getSelectedCategory () {
    return this.state.selectedCategory
  }

    // ////////////////////////////////////////////////////////////////////////////////

  renderTitle () {
    const {device, selectedTab} = this.props

    let suffix = ''
    if (selectedTab === 5) {
      suffix = ' - Add Rules'
    }
    return (device.name || '') + suffix
  }

  render () {
    const {device, selectedTab} = this.props
    return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">{this.renderTitle()}</span>
                </div>
                <div className="margin-md-top" style={{width: '100%'}}>
                    <div className="pull-left">
                        <div className="form-inline" style={{display: selectedTab === 1 ? 'block' : 'none'}} />

                        <div style={{display: selectedTab === 2 ? 'inline-block' : 'none'}} />
                    </div>

                    <div className="pull-right" />

                    <div style={{display: (selectedTab === 1 || selectedTab === 3) ? 'block' : 'none',
                      margin: '0 auto', position: 'relative', width: '550px', textAlign: 'center'}}>
                        <div className="inline" style={{position: 'relative'}}>
                            <input type="text" placeholder="Search" className="form-control"
                              style={{width: '100%', paddingLeft: '35px'}}
                              onChange={this.onFilterChange}
                              ref="search"/>
                            <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                                <i className="fa fa-search" /></a>
                        </div>
                    </div>
                </div>
            </div>
    )
  }

  onClickDeleteCategory () {
    const categoryId = this.getSelectedCategory()
    emit(EVENTS.DEV_RULE_REMOVE_CATEGORY_CLICKED, categoryId)
  }

  onClickAddRules () {
    this.props.router.push({
      pathname: '/dev/main/tab5',
      state: {
        device: this.props.device
      }
    })
  }
}

MainOptions.defaultProps = {
  onFilterChange: null,
  onClickOpenIncident: null,
  onClickAddException: null,
  onClickPDF: null,

  selectedTab: 1,
  device: {}
}

export default withRouter(MainOptions)

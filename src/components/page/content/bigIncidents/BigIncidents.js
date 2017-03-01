import React from 'react'
import moment from 'moment'
import IncidentTable from '../dashboard/incidents/IncidentTable'
import BigIncidentsView from '../../../modal/BigIncidentsView'

export default class BigIncidents extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      severities: [
        { label: 'High', value: 'HIGH' },
        { label: 'Medium', value: 'MEDIUM' },
        { label: 'Low', value: 'LOW' },
        { label: 'Audit', value: 'AUDIT' },
        { label: 'Ignore', value: 'IGNORE' }
      ],

      selectedSeverity: ['HIGH', 'MEDIUM'],

      selectWidth: 26,
      templateText: 'Any',

      params: {
        text: '',
        fixed: '-1',
        severity: ['High', 'Medium'],
        startTime: moment().add(-6, 'days').format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment().format('YYYY-MM-DD HH:mm:ss')
      },

      tableHeight: 200
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onChangeFixed = this.onChangeFixed.bind(this)
  }

  componentDidMount () {
    this.updateDimensions()
    window.addEventListener('resize', this.onResize, false)
    this.onFilterChange()
  }

  componentDidUpdate () {
    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize () {
    if (this.rqf) return
    this.rqf = window.setTimeout(() => {
      this.rqf = null
      this.updateDimensions()
    }, 50)
  }

  updateDimensions () {
    const container = this.refs.tableContainer
    if (!container) {
      throw new Error('Cannot find container div')
    }

    if (this.state.tableHeight === container.clientHeight) return

    this.setState({
      tableHeight: container.clientHeight
    })
  }

  renderTable () {
    return (
      <IncidentTable ref="table"
        incidents={this.props.bigIncidents}
        fixIncident={this.props.fixIncident}
        ackIncident={this.props.ackIncident}
      />
    )
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide () {
    this.props.router.goBack()
  }

  onFilterChange () {
    const refs = this.refs
    const {search, fixed, dp} = refs

    let params = {
      description: search.value || '""',
      severity: this.state.selectedSeverity,
      afterStartTimestamp: dp.getStartDate().valueOf(),
      beforeStartTimestamp: dp.getEndDate().valueOf(),
      sort: 'startTimestamp,desc'
    }
    if (fixed.value) params.fixed = fixed.value

    this.props.fetchBigIncidents(params)
  }

  onChangeSeverity (selected) {
    this.setState({
      selectedSeverity: selected.map(item => item.value)
    }, () => {
      this.onFilterChange()
    })
  }

  onChangeFixed (event) {
    let index = event.nativeEvent.target.selectedIndex
    let text = event.nativeEvent.target[index].text

    this.setState({
      templateText: text
    }, () => {
      this.setState({
        selectWidth: $(this.refs.templateSelect).width() * 1.03 // eslint-disable-line no-undef
      })
    })

    this.onFilterChange()
  }

  render () {
    let table = this.renderTable()
    return (
      <BigIncidentsView
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        value={this.state.selectedSeverity.join(',')}
        options={this.state.severities}
        onChange={this.onChangeSeverity.bind(this)}
        onFilter={this.onFilterChange}
        onSelect={this.onChangeFixed}
        text={this.state.templateText}
        table={table}
      />
    )
  }
}

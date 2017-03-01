import React from 'react'
import Modal from 'react-bootstrap-modal'
import DateRangePicker from 'components/shared/DateRangePicker'
import Select from 'react-select'
import moment from 'moment'
import IncidentTable from '../dashboard/incidents/IncidentTable'

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
    return (
      <Modal show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-default modal-fit modal-flex">
        <div className="modal-header">
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onHide.bind(this)}>×</button>
          </div>
          <h4 className="modal-title bootstrap-dialog-title">Incidents</h4>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="form-inline">

            <label>Show</label>&nbsp;
            <Select
              value={this.state.selectedSeverity.join(',')}
              options={this.state.severities}
              onChange={this.onChangeSeverity.bind(this)}
              multi
              clearable={false}
              className="select-severity"
              style={{minWidth: '85px'}}
              searchable={false}
              autosize={false}
              backspaceRemoves={false}
            />
            &nbsp;<label>incidents from</label>&nbsp;
            <DateRangePicker onClickRange={this.onFilterChange} ref="dp"/>
            &nbsp;<label>having</label>&nbsp;
            <select className="fixtype form-control inline select-custom text-primary"
              onChange={this.onChangeFixed}
              ref="fixed" defaultValue="false">
              <option value="">Any</option>
              <option value="false">Unfixed</option>
              <option value="true">Fixed</option>
            </select>
            &nbsp;<label>status that contains</label>&nbsp;
            <input
              onChange={this.onFilterChange}
              placeholder="search"
              className="form-control p-none noborder text-primary"
              style={{marginTop: '-2px'}}
              ref="search"
            />

            <select ref="templateSelect"
              className="fixtype form-control inline select-custom text-primary"
              style={{display: 'none'}}>
              <option ref="templateOption">{this.state.templateText}</option>
            </select>
          </div>
          <div className="flex-1 flex-vertical" ref="tableContainer">
            {this.renderTable()}
          </div>

        </div>
      </Modal>
    )
  }
}

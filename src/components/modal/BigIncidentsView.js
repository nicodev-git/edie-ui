import React from 'react'
import Modal from 'react-bootstrap-modal'
import DateRangePicker2 from 'components/shared/DateRangePicker2'
import Select from 'react-select'
import { Header } from './parts'

const BigIncidentsView = ({onHide,
  severities, severityOptions, onChangeSeverity,
  startDate, endDate, onChangeDateRange,
  fixedStatus, onChangeFixedStatus,
  keyword, onChangeKeyword,
  table}) => (
  <Modal show
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-default modal-fit modal-flex">
    <Header name="Incidents" onClick={onHide}/>
    <div className="modal-body bootstrap-dialog-message">
      <div className="form-inline">
        <label>Show</label>
        &nbsp;

        <Select
          value={severities}
          options={severityOptions}
          onChange={onChangeSeverity}
          multi
          clearable={false}
          className="select-severity"
          style={{minWidth: '85px'}}
          searchable={false}
          autosize={false}
          backspaceRemoves={false}
        />
        &nbsp;

        <label>incidents from</label>
        &nbsp;

        <DateRangePicker2
          startDate={startDate}
          endDate={endDate}
          onApply={onChangeDateRange}/>
        &nbsp;

        <label>having</label>
        &nbsp;

        <select className="fixtype form-control inline select-custom text-primary"
          onChange={onChangeFixedStatus}
          value={fixedStatus || ''}>
          <option value="">Any</option>
          <option value="false">Unfixed</option>
          <option value="true">Fixed</option>
        </select>
        &nbsp;

        <label>status that contains</label>
        &nbsp;

        <input
          value={keyword}
          onChange={onChangeKeyword}
          placeholder="search"
          className="form-control p-none noborder text-primary"
          style={{marginTop: '-2px'}}
        />
      </div>
      <div className="flex-1 flex-vertical">
        {table}
      </div>
    </div>
  </Modal>
)

export default BigIncidentsView

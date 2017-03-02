import React from 'react'
import Modal from 'react-bootstrap-modal'
import DateRangePicker from 'components/shared/DateRangePicker'
import Select from 'react-select'

const BigIncidentsView = ({show, onHide, value, options, onChange, onFilter, onSelect, text, table}) => (
  <Modal show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-default modal-fit modal-flex">
    <div className="modal-header">
      <div className="bootstrap-dialog-close-button">
        <button className="close" onClick={onHide}>×</button>
      </div>
      <h4 className="modal-title bootstrap-dialog-title">Incidents</h4>
    </div>
    <div className="modal-body bootstrap-dialog-message">
      <div className="form-inline">

        <label>Show</label>&nbsp;
        <Select
          value={value}
          options={options}
          onChange={onChange}
          multi
          clearable={false}
          className="select-severity"
          style={{minWidth: '85px'}}
          searchable={false}
          autosize={false}
          backspaceRemoves={false}
        />
        &nbsp;<label>incidents from</label>&nbsp;
        <DateRangePicker onClickRange={onFilter} ref="dp"/>
        &nbsp;<label>having</label>&nbsp;
        <select className="fixtype form-control inline select-custom text-primary"
          onChange={onSelect}
          ref="fixed" defaultValue="false">
          <option value="">Any</option>
          <option value="false">Unfixed</option>
          <option value="true">Fixed</option>
        </select>
        &nbsp;<label>status that contains</label>&nbsp;
        <input
          onChange={onFilter}
          placeholder="search"
          className="form-control p-none noborder text-primary"
          style={{marginTop: '-2px'}}
          ref="search"
        />

        <select ref="templateSelect"
          className="fixtype form-control inline select-custom text-primary"
          style={{display: 'none'}}>
          <option ref="templateOption">{text}</option>
        </select>
      </div>
      <div className="flex-1 flex-vertical" ref="tableContainer">
        {table}
      </div>

    </div>
  </Modal>
)

export default BigIncidentsView

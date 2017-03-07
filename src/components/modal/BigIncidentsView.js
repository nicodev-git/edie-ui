import React from 'react'
import Modal from 'react-bootstrap-modal'
import DateRangePicker from 'components/shared/DateRangePicker'
import Select from 'react-select'
import { Field } from 'redux-form'
import { Header, FormMultiSelect, SubmitBlock } from './parts'

const BigIncidentsView = ({show, onHide, value, options, onChange, onFilter, onSelect,
  text, table, onSubmit}) => (
  <Modal show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-default modal-fit modal-flex">
    <Header name="Incidents" onClick={onHide}/>
    <div className="modal-body bootstrap-dialog-message">
      <form onSubmit={onSubmit}>
        <div className="form-column">
          <Field name="select" component={FormMultiSelect} label="Severity"
            options={options} value={value}/>
        </div>
        <SubmitBlock onClick={onHide}/>
      </form>
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
        <DateRangePicker onClickRange={onFilter}/>
        &nbsp;<label>having</label>&nbsp;
        <select className="fixtype form-control inline select-custom text-primary"
          onChange={onSelect}
          defaultValue="false">
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
        />

        <select
          className="fixtype form-control inline select-custom text-primary"
          style={{display: 'none'}}>
          <option>{text}</option>
        </select>
      </div>
      <div className="flex-1 flex-vertical">
        {table}
      </div>

    </div>
  </Modal>
)

export default BigIncidentsView

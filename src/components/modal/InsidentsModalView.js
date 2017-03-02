import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from '../shared/InfiniteTable'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import { Header } from './parts'

const IncidentsModalView = ({show, onHide, onClose, header, onFilter, onChange,
  value, options, params, cells, onClick1, onClick2, onClick3}) => (
  <Modal
    show={show}
    onHide={onHide}
    aria-labelledby="ModalHeader"
    className="bootstrap-dialog type-primary"
  >
    <Header name={header} onClick={onClose} />
    <div className="modal-body bootstrap-dialog-message">

      <div className="form-inline"
        style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>

          <input type="text" placeholder="Search" className="form-control input-sm"
            onChange={onFilter}
            ref="search"/>

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
          />

          <select className="form-control text-primary margin-md-left input-sm"
            onChange={onFilter}
            ref="fixed" defaultValue="0">
              <option value="-1">Any</option>
              <option value="0">Unfixed</option>
              <option value="1">Fixed</option>
          </select>
      </div>

      <InfiniteTable
        url="/incidentstable/getMonthIncidents"
        params={params}
        cells={cells}
        ref="table"
        rowMetadata={{'key': 'incidentid'}}
        bodyHeight={500}
        selectable
      />

      <div style={{borderTop: '1px solid gray', paddingTop: '4px'}}>
        <Button bsStyle="primary" onClick={onClick1}>Fix All</Button>
        <Button bsStyle="primary" className="margin-sm-left"
          onClick={onClick2}>Add Exception</Button>
        <Button bsStyle="primary" className="margin-sm-left"
          onClick={onClick3}>Open</Button>
      </div>
    </div>
  </Modal>
)

export default IncidentsModalView

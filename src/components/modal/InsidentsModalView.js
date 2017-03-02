import React from 'react'
import Modal from 'react-bootstrap-modal'
import InfiniteTable from '../shared/InfiniteTable'
import { Header } from './parts'

const AddExceptionModalView = ({show, onHide, onClose, params, cells}) => (
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
            onChange={this.onFilterChange}
            ref="search"/>

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
          />

          <select className="form-control text-primary margin-md-left input-sm"
            onChange={this.onFilterChange}
            ref="fixed" defaultValue="0">
              <option value="-1">Any</option>
              <option value="0">Unfixed</option>
              <option value="1">Fixed</option>
          </select>
      </div>

      <InfiniteTable
        url="/incidentstable/getMonthIncidents"
        params={this.state.params}
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'incidentid'}}
        bodyHeight={500}
        selectable
      />

      <div style={{borderTop: '1px solid gray', paddingTop: '4px'}}>
        <Button bsStyle="primary" onClick={this.onClickFixAll.bind(this)}>Fix All</Button>
        <Button bsStyle="primary" className="margin-sm-left"
          onClick={this.onClickAddException.bind(this)}>Add Exception</Button>
        <Button bsStyle="primary" className="margin-sm-left"
          onClick={this.onClickOpen.bind(this)}>Open</Button>
      </div>
    </div>
  </Modal>
)

export default AddExceptionModalView

import React from 'react'

const CellInput = ({name, ref}) => (
  <div className="row margin-md-bottom">
    <label className="col-md-3">{name}</label>
    <div className="col-md-9">
        <input className="form-control" ref={ref}/>
    </div>
  </div>
)

export default CellInput

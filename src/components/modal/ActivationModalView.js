import React from 'react'
import Modal from 'react-bootstrap-modal'

const ActivationModalView = ({onHide, onSignup}) => (
  <Modal
    show
    onHide={onHide}
    className="bootstrap-dialog type-primary modal-w-wrap">
    <div>
      <div className="text-center padding-sm">
        <h3 className="text-center">License Activation</h3>
      </div>
      <div style={{background: '#d9d9dc', minWidth: '300px'}} className="padding-md">
        <div>
          <input type="text" className="form-control" autoComplete="off" placeholder="Email" ref="email"/>
        </div>

        <div>
          <input type="text" className="form-control" autoComplete="off" placeholder="License" ref="license"/>
        </div>

        <div className="text-center margin-md-top">
          <a href="javascript:;" className="btn signup-btn" onClick={onSignup}
            style={{background: '#52B6CF', borderRadius: '20px', color: 'white', minWidth: '180px', fontSize: '1.2em'}}>
            Activate
          </a>
        </div>
      </div>
    </div>
  </Modal>
)

export default ActivationModalView

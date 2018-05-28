import React from 'react'
import ReactDOM from 'react-dom'
import {CircularProgress} from '@material-ui/core'

const loadingStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  borderRadius: '50%',
  width: 55,
  height: 55,
  paddingTop: 2,
  textAlign: 'center',
  boxShadow: '1px 1px 2px 0px #292828'
}

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(80,80,80,0.5)',
  zIndex: 10000
}

export default class RefreshOverlay extends React.Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.containerDiv).focus();
  }
  render () {
    return (
      <div style={overlayStyle}>
        <div style={loadingStyle} ref="containerDiv" tabIndex="0">
          <CircularProgress
            size={50}
            style={{display: 'inline-block', position: 'relative'}}
          />
        </div>
      </div>
    )
  }
}

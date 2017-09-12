import React from 'react'

const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  marginTop: 10
}
export default class NoDataPanel extends React.Component {
  render () {
    return (
      <div style={style}>
        <img src="/resources/images/dashboard/nodata.jpg" alt=""/>
      </div>
    )
  }
}

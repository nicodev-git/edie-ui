import React from 'react'
import ReactDOM from 'react-dom'
import {RaisedButton} from 'material-ui'

import { Modal } from 'components/modal/parts'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class DetailLogModalView extends React.Component {
  onRefRow (ref) {
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(ref)
      node && node.scrollIntoView({behavior: 'smooth'})
    }, 100)
  }
  renderTable () {
    const list = this.props.items
    const {rowId, page} = this.props

    return (
      <div className="bg-white" style={{marginTop: 40}}>
        {list.map((row, index) =>
          <div key={row.id} className={row.id === rowId ? 'highlight' : ''} ref={row.id === rowId ? this.onRefRow.bind(this) : null}>
            <div dangerouslySetInnerHTML={{__html: row.entity && row.entity.dataobj ? row.entity.dataobj.line : ' '}}/>
          </div>
        )}
        {page === 0 && <div style={{height: 700}}/>}
      </div>
    )
  }

  render () {
    const {onHide, onClickPrev, onClickNext, loading} = this.props
    return (
      <Modal title="Log" onRequestClose={onHide} contentStyle={{width: '90%', maxWidth: 'initial'}}>
        <div style={{position: 'absolute', top: 11, left: 60, right: 60, textAlign: 'center', zIndex: 1}}>
          <RaisedButton label="Prev" onTouchTap={onClickPrev} disabled={loading} secondary/>&nbsp;
          <RaisedButton label="Next" onTouchTap={onClickNext} disabled={loading} secondary/>
        </div>
        {this.renderTable()}
        {loading && <RefreshOverlay/>}
      </Modal>
    )
  }
}

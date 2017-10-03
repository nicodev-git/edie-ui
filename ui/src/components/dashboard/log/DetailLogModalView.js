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
    const {rowId} = this.props

    return (
      <div className="bg-white" style={{marginTop: 40}}>
        {list.map((row, index) =>
          <div key={row.id} className={row.id === rowId ? 'highlight' : ''} ref={row.id === rowId ? this.onRefRow.bind(this) : null}>
            <div dangerouslySetInnerHTML={{__html: row.entity && row.entity.dataobj ? row.entity.dataobj.line : ' '}}/>
          </div>
        )}
        <div style={{height: 700}}/>
      </div>
    )
  }

  render () {
    const {onHide, onClickPrev, onClickNext, loading, page, size} = this.props
    return (
      <Modal title="Log" onRequestClose={onHide} contentStyle={{width: '90%', maxWidth: 'initial'}}>
        {this.renderTable()}
        <div style={{position: 'absolute', top: 11, left: 60, right: 60, textAlign: 'center', zIndex: 10}}>
          <RaisedButton label="Prev" onTouchTap={onClickPrev} disabled={loading || page < 1} secondary/>&nbsp;
          <RaisedButton label="Next" onTouchTap={onClickNext} disabled={loading || page >= (size - 1)} secondary/>
        </div>
        {loading && <RefreshOverlay/>}
      </Modal>
    )
  }
}

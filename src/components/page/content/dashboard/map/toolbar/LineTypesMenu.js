import React from 'react'

const LineTypesMenu = ({ popover, cover, toggle, lineTypes, onChoose }) => (
  <div style={popover}>
    <div style={cover} onClick={toggle}/>
    <div id="linetypediv" className="panel-group">
      <ul>
        {
          lineTypes.map(item =>
            <li key={item.typename} className={item.visible ? '' : 'hidden'}><a href="javascript:;" onClick={onChoose.bind(this, item)}>
              <div className="pull-left item-icon">
                <img src={item.image} data-type={item.type} data-typename={item.typename}/>
              </div>
              <div className="item-text">
                <strong>{item.title}</strong>
              </div>
            </a></li>
          )
        }
      </ul>
    </div>
  </div>
)

export default LineTypesMenu

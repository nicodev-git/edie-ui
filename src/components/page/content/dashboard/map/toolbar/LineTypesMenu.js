import React from 'react'

const LineTypesMenu = ({ popover, cover, toggle, lineTypes }) => (
  <div style={popover}>
    <div style={cover} onClick={toggle}/>
    <div id="linetypediv" className="panel-group">
      <div className="panel panel-default">
        <div className="panel-body"><ul>
        {
          lineTypes.map(item =>
            <li key={item.typename}><a href="javascript:;" onClick={onChoose.bind(this, item)}>
              <div className="pull-left item-icon">
                <img src={item.image} data-type={item.type} data-typename={item.typename}/>
              </div>
              <div className="item-text">
                <strong>{item.title}</strong>
              </div>
            </a></li>
          )
        }
        </ul></div>
      </div>
    </div>
  </div>
)

export default LineTypesMenu

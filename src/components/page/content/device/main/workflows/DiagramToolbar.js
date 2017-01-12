import React from 'react'

class DiagramToolbar extends React.Component {
  render () {
    return (
      <div className="toolbar-container">
        <a href="javascript:void(0);" className="geLabel"
          style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
          <div className="geSprite geSprite-formatpanel" style={{marginLeft: '-4px', marginTop: '-3px'}}/>
          <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif"/>
        </a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geLabel" style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '56px'}}>
          100%<img style={{position: 'absolute', right: '4px', top: '5px', left: '40px'}} src="/images/caret.gif"/>
        </a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton"><div className="geSprite geSprite-zoomin"/></a>
        <a href="javascript:void(0);" className="geButton"><div className="geSprite geSprite-zoomout"/></a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton" ><div className="geSprite geSprite-undo"/></a>
        <a href="javascript:void(0);" className="geButton mxDisabled"><div className="geSprite geSprite-redo"/></a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton mxDisabled"><div className="geSprite geSprite-delete"/></a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton mxDisabled"><div className="geSprite geSprite-tofront"/></a>
        <a href="javascript:void(0);" className="geButton mxDisabled"><div className="geSprite geSprite-toback"/></a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton"><div className="geSprite geSprite-fillcolor"/></a>
        <a href="javascript:void(0);" className="geButton"><div className="geSprite geSprite-strokecolor"/></a>
        <a href="javascript:void(0);" className="geButton"><div className="geSprite geSprite-shadow"/></a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geButton" style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
          <div className="geSprite geSprite-connection" style={{marginLeft: 0, marginTop: 0}}/>
          <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif"/>
        </a>
        <a href="javascript:void(0);" className="geButton" style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
          <div className="geSprite geSprite-orthogonal" style={{marginLeft: 0, marginTop: 0}}/>
          <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif"/>
        </a>

        <div className="geSeparator"/>

        <a href="javascript:void(0);" className="geLabel" style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
          <div className="geSprite geSprite-plus" style={{marginLeft: '-4px', marginTop: '-3px'}}/>
          <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif"/>
        </a>
      </div>
    )
  }
}

export default DiagramToolbar

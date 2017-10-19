import React from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout'

import GaugeMap from 'components/common/gauge/GaugeMap'
import { getWidgetSize, layoutCols, layoutRowHeight } from 'shared/Global'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export default class GridLayout extends React.Component {
  renderGauge (p) {
    let GaugePanel = GaugeMap[p.templateName || 'z']
    if (!GaugePanel) return <div key={p.id}/>
    return (
      <GaugePanel
        {...this.props}

        key={p.id}

        gauge={p}
        device={{id: p.deviceId}}
        searchList={[]}
        monitors={[]}

        viewOnly
        noDelete
        style={{width: '100%', height: '100%'}}
      />
    )
  }

  renderFullSize () {
    const gauges = this.props.gauges || []
    if (!gauges.length) return <div/>
    return this.renderGauge(gauges[0])
  }

  render () {
    const {fullSize} = this.props
    if (fullSize) return this.renderFullSize()

    const gauges = this.props.gauges || []
    const layout = mw => {
      let x = 0
      let y = 0
      return gauges.map((p, i) => {
        let {w, h, minH, minW} = getWidgetSize(p, this.props.devices, false)
        if (p.layout) {
          if (w && h) return {...p.layout, i: p.id, w, h, minW, minH}
          return {...p.layout, i: p.id, minW, minH}
        }
        if (x + w > mw) {
          x = 0
          y++
        }
        const op = {
          i: p.id,
          x, y,
          w, h,
          minW, minH
        }

        x += w
        if (x >= mw) {
          x = 0
          y++
        }
        return op
      })
    }
    const cols = layoutCols
    const layouts = {
      lg: layout(cols['lg']),
      md: layout(cols['md']),
      sm: layout(cols['sm']),
      xs: layout(cols['xs']),
      xxs: layout(cols['xxs'])
    }

    return (
      <ResponsiveReactGridLayout
        className="layout" cols={cols} rowHeight={layoutRowHeight}
        layouts={layouts}
        style={{marginTop: -10}}
        margin={[16, 16]}
        isResizable={false}
      >
        {gauges.map(p => this.renderGauge(p))}
      </ResponsiveReactGridLayout>
    )
  }
}

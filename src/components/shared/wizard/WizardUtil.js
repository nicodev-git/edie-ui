import React from 'react'

import { MAX_WIDTH } from './WizardConfig'

export const util = {

  calcWidth: function (width) {
    width = width || MAX_WIDTH
    if (width > MAX_WIDTH) width = MAX_WIDTH
    if (width < 1) width = 1
    return width
  },

  convertStyle: function (style) {
    let newStyle = {}
    style && $.each(style, (k, v) => {
      let name = k.replace(/(-)(\w)/g, (match, m1, m2) => {
        return m2.toUpperCase()
      })

      newStyle[name] = v
    })

    return newStyle
  },

  wrapInputs: function (label, input, useColumn) {
    if (useColumn) return input
    return (
            <div className="row margin-md-bottom">
                {label}
                {input}
            </div>
    )
  }
}

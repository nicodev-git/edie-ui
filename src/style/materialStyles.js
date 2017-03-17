import React from 'react'
const primeColor = '#5683bb'
const textColor = '#777777'
const badgeTextColor = '#f5f5f5'
const errorColor = '#d32f2f'
const fontSize = '18pt'

export const sidebarIconsColor = '#838489'

export const thumbup = <img title="Acknowledge" src="/images/ack.png" />
export const thumpdown = <img title="Acknowledge" src="/images/noack.png" />
export const done = <img title="State" src="/images/ok.png" />
export const notdone = <img title="State" src="/images/notok.png" />
export const rawtext = <img title="Detail" src="/images/rawtext.png" />
export const reason = <img title="Reason" src="/images/reason.png" />

export const labelStyle = {
  color: primeColor
}

export const labelFocusStyle = {
  display: 'none'
}

export const errorStyle = {
  color: errorColor
}

export const inputStyle = {
  color: textColor,
  fontSize: fontSize
}

export const textareaStyle = {
  color: textColor,
  fontSize: fontSize
}

export const underlineStyle = {
  borderColor: primeColor
}

export const selectedItemStyle = {
  color: primeColor
}

export const buttonStyle = {
  backgroundColor: primeColor
}

export const headerStyle = {
  backgroundColor: primeColor
}

export const subHeaderStyle = {
  color: primeColor,
  fontSize: fontSize
}

export const iconButtonStyle = {
  padding: '4px',
  width: 50,
  height: 50
}

export const iconStyle = {
  width: 30,
  height: 30
}

export const badgeStyle = {
  backgroundColor: errorColor,
  color: badgeTextColor,
  width: 15,
  height: 15,
  padding: 0,
  top: 7,
  right: 7,
  zIndex: 2
}

export const badgeRootStyle = {
  padding: 0,
  width: 50,
  height: 50
}

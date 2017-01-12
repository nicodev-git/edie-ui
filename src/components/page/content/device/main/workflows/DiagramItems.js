import React from 'react'

export const workflowItems = [{
  title: 'Rectangle',
  img: <g key="1"><g /><g><g transform="translate(0.5,0.5)"><rect x="2" y="10" width="31" height="16" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>
}, {
  title: 'Rounded Rectangle',
  img: <g key="2"><g /><g><g transform="translate(0.5,0.5)"><rect x="2" y="10" width="31" height="16" rx="2" ry="2" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>
}, {
  title: 'Ellipse',
  img: <g key="3"><g /><g><g transform="translate(0.5,0.5)"><ellipse cx="18" cy="18" rx="15.6" ry="10.4" fill="#ffffff" stroke="#000000"/></g></g><g/><g/></g>
}, {
  title: 'Diamond',
  img: <g key="4"><g /><g><g transform="translate(0.5,0.5)"><path d="M 18 2 L 34 18 L 18 34 L 2 18 Z" fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/></g></g><g/><g/></g>
}, {
  title: 'Parallelogram',
  img: <g key="5"><g /><g><g transform="translate(0.5,0.5)"><path d="M 2 26 L 9 10 L 34 10 L 27 26 Z" fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/></g></g><g/><g/></g>
}, {
  title: 'Triangle',
  img: <g key="6"><g /><g><g transform="translate(0.5,0.5)"><path d="M 6 2 L 30 18 L 6 34 Z" fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/></g></g><g/><g/></g>
}]

import React from 'react'

const DeleteObject = ({ obj }) => (
  <li>
    <a
      href="javascript:"
      className="option trash p-none"
      style={{display: obj ? 'block' : 'none'}}
      onClick={onDelete}
    >
      <i className="fa fa-trash-o" title="Delete" />
    </a>
  </li>
)

export default DeleteObject

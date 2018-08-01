import React from 'react'
import PropTypes from 'prop-types'

const _format = (column, rowResult) => {
  const value = rowResult[column.name]

  return column.format(value)
}

const propTypes = {
  head: PropTypes.array,
  result: PropTypes.object
}
const RowComponent = (props) => (
  <React.Fragment>
    {props.head.map((column, key) => (
      <td className="result-box-body-cell" key={key}>
        {_format(column, props.result)}
      </td>
    ))}
  </React.Fragment>
)
RowComponent.propTypes = propTypes

export default RowComponent

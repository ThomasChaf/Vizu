import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Cell = (props) => {
  if (typeof props.value === 'object') {
    return 'object'
  }

  return props.value
}
Cell.propTypes = {
  value: PropTypes.any
}

const Row = (props) => (
  <React.Fragment>
    {props.head.map((name, key) => (
      <td className="result-box-body-cell" key={key}>
        <Cell value={props.result[name]} />
      </td>
    ))}
  </React.Fragment>
)
Row.propTypes = {
  head: PropTypes.array,
  result: PropTypes.object
}

const propTypes = {
  table: PropTypes.object
}
const ResultComponent = (props) => {
  if (!props.table) return null

  return (
    <div className="result-box">
      <table>
        <thead className="result-box-head">
          <tr className="result-box-head-row">
            {props.table.head.map((name, key) => (
              <td key={key} className="result-box-head-cell">
                {name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="result-box-body">
          {props.table.rows.map((result, key) => (
            <tr key={key} className="result-box-body-row">
              <Row head={props.table.head} result={result} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
ResultComponent.propTypes = propTypes

export default ResultComponent

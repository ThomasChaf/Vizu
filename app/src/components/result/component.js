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
      <td key={key}>
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
        <thead>
          <tr>{props.table.head.map((name, key) => <td key={key}>{name}</td>)}</tr>
        </thead>
        <tbody>
          {props.table.rows.map((result, key) => (
            <tr key={key}>
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

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
  results: PropTypes.array
}
const ResultComponent = (props) => {
  if (!props.results) return null

  const keys = Object.keys(props.results[0])
  const head = []
  if (keys.indexOf('id') !== -1) head.push('id')

  _.pull(keys, 'id').map((k) => head.push(k))

  return (
    <div className="result-box">
      <table>
        <thead>
          <tr>{head.map((name, key) => <td key={key}>{name}</td>)}</tr>
        </thead>
        <tbody>
          {props.results.map((result, key) => (
            <tr key={key}>
              <Row head={head} result={result} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
ResultComponent.propTypes = propTypes

export default ResultComponent

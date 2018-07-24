import React from 'react'
import PropTypes from 'prop-types'
import FilterOrder from './filter-order'
import Row from './row'
import './style.scss'

const propTypes = {
  orders: PropTypes.array.isRequired,
  onOrder: PropTypes.func.isRequired,
  table: PropTypes.object
}
const ResultComponent = (props) => {
  if (!props.table) return null

  return (
    <div className="result-box">
      <table>
        <thead className="result-box-head">
          <tr className="result-box-head-order">
            <FilterOrder orders={props.orders} onOrder={props.onOrder} />
          </tr>
          <tr className="result-box-head-row">
            {props.table.head.map((column, key) => (
              <td key={key} className="result-box-head-row-cell">
                {column.name}
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

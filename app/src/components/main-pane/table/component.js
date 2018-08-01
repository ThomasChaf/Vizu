import React from 'react'
import PropTypes from 'prop-types'
import { withConfig } from '@contexts'
import FilterOrder from './filter-order'
import Row from './row'
import './style.scss'

const propTypes = {
  config: PropTypes.object,
  orders: PropTypes.object.isRequired,
  onOrder: PropTypes.func.isRequired,
  table: PropTypes.object
}
const ResultComponent = (props) => {
  if (!props.table) return null

  const head = props.config.organise(props.table.head)
  const orders = props.config.organise(props.orders)

  return (
    <div className="result-box">
      <table>
        <thead className="result-box-head">
          <FilterOrder orders={orders} onOrder={props.onOrder} />
          <tr className="result-box-head-row">
            {head.map((column, key) => (
              <td
                draggable
                onDrop={() => console.log('drop')}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                key={key}
                className="result-box-head-row-cell"
              >
                {column.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="result-box-body">
          {props.table.rows.map((result, key) => (
            <tr key={key} className="result-box-body-row">
              <Row head={head} result={result} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
ResultComponent.propTypes = propTypes

export default withConfig(ResultComponent)

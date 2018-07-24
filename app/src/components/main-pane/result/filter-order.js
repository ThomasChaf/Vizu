import React from 'react'
import PropTypes from 'prop-types'
import { ORDER } from '@constants'

const nextDirection = (direction) =>
  ({
    [ORDER.DEFAULT]: ORDER.ASC,
    [ORDER.ASC]: ORDER.DESC,
    [ORDER.DESC]: ORDER.ASC
  }[direction])

const computeOrder = (currentOrders, newOrder) =>
  currentOrders.map((order) => {
    const [tableName, direction] = order

    if (tableName === newOrder) {
      return [tableName, nextDirection(direction)]
    }
    return order
  })

const propTypes = {
  orders: PropTypes.array.isRequired
}
const FilterOrderComponent = (props) => (
  <React.Fragment>
    {props.orders.map(([tableName, direction], key) => (
      <td key={key} className="result-box-head-order-cell">
        <button type="button" onClick={() => props.onOrder(computeOrder(props.orders, tableName))}>
          {{ [ORDER.DEFAULT]: '-', [ORDER.DESC]: '^', [ORDER.ASC]: 'v' }[direction]}
        </button>
      </td>
    ))}
  </React.Fragment>
)
FilterOrderComponent.propTypes = propTypes

export default FilterOrderComponent

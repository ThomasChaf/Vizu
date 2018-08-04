import React from 'react'
import PropTypes from 'prop-types'
import { ORDER } from '@constants'

const propTypes = {
  orders: PropTypes.array.isRequired
}
const FilterOrderComponent = (props) => (
  <tr className="result-box-head-order">
    {props.orders.map((order, key) => (
      <td key={key} className="result-box-head-order-cell">
        <button type="button" onClick={() => props.onOrder(order.tableName)}>
          {{ [ORDER.DEFAULT]: '-', [ORDER.DESC]: '^', [ORDER.ASC]: 'v' }[order.direction]}
        </button>
      </td>
    ))}
  </tr>
)
FilterOrderComponent.propTypes = propTypes

export default FilterOrderComponent

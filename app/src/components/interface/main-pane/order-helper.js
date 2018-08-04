import _ from 'lodash'
import { ORDER } from '@constants'

export const computeOrders = ({ orders }, newOrderTableName) => {
  const res = {}

  _.forIn(orders, (order) => {
    res[order.tableName] = order.tableName === newOrderTableName ? order.next() : order.reset()
  })

  return res
}

export class Order {
  constructor(tableName) {
    this.tableName = tableName
    this.direction = ORDER.DEFAULT
  }

  reset() {
    this.direction = ORDER.DEFAULT

    return this
  }

  next() {
    this.direction = {
      [ORDER.DEFAULT]: ORDER.ASC,
      [ORDER.ASC]: ORDER.DESC,
      [ORDER.DESC]: ORDER.ASC
    }[this.direction]

    return this
  }
}

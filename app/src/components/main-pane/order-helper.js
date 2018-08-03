import _ from 'lodash'
import { ORDER } from '@constants'

export const computeOrders = ({ orders }, newOrder) =>
  _.merge({}, orders, {
    [newOrder.tableName]: newOrder.next()
  })

export class Order {
  constructor(tableName) {
    this.tableName = tableName
    this.direction = ORDER.DEFAULT
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

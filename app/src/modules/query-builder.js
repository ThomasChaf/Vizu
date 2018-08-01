import squel from 'squel'
import _ from 'lodash'
import { ORDER } from '@constants'

class QueryBuilder {
  constructor(verb) {
    this._query = {
      SELECT: squel.select
    }[verb]()
  }

  _similar(action, params) {
    this._query = this._query[action](...params)

    return this
  }

  from = (...params) => this._similar('from', params)
  where = (...params) => this._similar('where', params)
  limit = (...params) => this._similar('limit', params)

  order(orders) {
    _.forIn(orders, (order) => {
      if (order.direction) {
        this._query = this._query.order(order.tableName, order.direction === ORDER.ASC)
      }
    })

    return this
  }

  toString() {
    return this._query.toString()
  }
}

export default {
  get select() {
    return new QueryBuilder('SELECT')
  }
}

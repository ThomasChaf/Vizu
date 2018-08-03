import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Filter from './filter/component'
import Table from './table/component'
import { computeOrders, Order } from './order-helper'

const propTypes = {
  executeQuery: PropTypes.func.isRequired,
  table: PropTypes.object
}
class SmartTableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      orders: _.mapValues(props.table.head, (x, tableName) => new Order(tableName))
    }
  }

  handleFilter = (filter) => this.setState({ filter }, () => this.props.executeQuery(this.state))

  handleOrder = (newOrder) =>
    this.setState({ orders: computeOrders(this.state, newOrder) }, () => this.props.executeQuery(this.state))

  render() {
    return (
      <React.Fragment>
        <Filter filter={this.state.filter} onSubmit={this.handleFilter} />

        <Table table={this.props.table} orders={this.state.orders} onOrder={this.handleOrder} />
      </React.Fragment>
    )
  }
}
SmartTableComponent.propTypes = propTypes

export default SmartTableComponent

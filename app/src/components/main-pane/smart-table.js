import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ORDER } from '@constants'
import Filter from './filter/component'
import Table from './table/component'

const nextDirection = (direction) =>
  ({
    [ORDER.DEFAULT]: ORDER.ASC,
    [ORDER.ASC]: ORDER.DESC,
    [ORDER.DESC]: ORDER.ASC
  }[direction])

const propTypes = {
  executeQuery: PropTypes.func.isRequired,
  table: PropTypes.object
}
class SmartTableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      orders: _.mapValues(props.table.head, (x, tableName) => ({
        tableName,
        direction: ORDER.DEFAULT
      }))
    }
  }

  handleFilter = (filter) => this.setState({ filter }, () => this.props.executeQuery(this.state))

  handleOrder = (newOrder) =>
    this.setState(
      {
        orders: _.merge({}, this.state.orders, {
          [newOrder.tableName]: { tableName: newOrder.tableName, direction: nextDirection(newOrder.direction) }
        })
      },
      () => this.props.executeQuery(this.state)
    )

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

import React from 'react'
import PropTypes from 'prop-types'
import { ORDER } from '@constants'
import Filter from '../filter/component'
import Result from '../result/component'

const propTypes = {
  executeQuery: PropTypes.func.isRequired,
  table: PropTypes.object
}
class SmartTableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filter: '', orders: props.table.head.map((column) => [column.name, ORDER.DEFAULT]) }
  }

  handleFilter = (filter) => this.setState({ filter }, () => this.props.executeQuery(this.state))

  handleOrder = (orders) => this.setState({ orders }, () => this.props.executeQuery(this.state))

  render() {
    return (
      <React.Fragment>
        <Filter filter={this.state.filter} onSubmit={this.handleFilter} />

        <Result table={this.props.table} orders={this.state.orders} onOrder={this.handleOrder} />
      </React.Fragment>
    )
  }
}
SmartTableComponent.propTypes = propTypes

export default SmartTableComponent

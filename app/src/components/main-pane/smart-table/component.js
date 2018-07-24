import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../filter/component'
import Result from '../result/component'

const propTypes = {
  executeQuery: PropTypes.func.isRequired,
  table: PropTypes.object
}
class SmartTableComponent extends React.Component {
  state = { filter: null, order: null }

  handleFilter = (filter) => this.setState({ filter }, () => this.props.executeQuery(this.state))

  handleOrder = (order) => this.setState({ order }, () => this.props.executeQuery(this.state))

  render() {
    return (
      <React.Fragment>
        <Filter filter={this.state.filter} onSubmit={this.handleFilter} />

        <Result table={this.props.table} order={this.state.order} onOrder={this.handleOrder} />
      </React.Fragment>
    )
  }
}
SmartTableComponent.propTypes = propTypes

export default SmartTableComponent

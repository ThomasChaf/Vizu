import React from 'react'
import PropTypes from 'prop-types'
import Hoc from '../../contexts/connector'
import Filter from './filter/component'
import Result from './result/component'
import './style.scss'

const propTypes = {
  connector: PropTypes.object.isRequired,
  tableName: PropTypes.string
}
class MainePaneComponent extends React.Component {
  state = { table: null }

  async componentDidMount() {
    if (!this.props.tableName) return

    const table = await this.props.connector.select(this.props.tableName)

    this.setState({ table })
  }

  handleFilter = async ({ filter }) => {
    const table = await this.props.connector.select(this.props.tableName, filter)

    this.setState({ table })
  }

  render() {
    if (!this.state.table) return <div>Loading...</div>

    return (
      <div className="main-pane-box">
        <Filter onSubmit={this.handleFilter} />

        <Result table={this.state.table} />
      </div>
    )
  }
}
MainePaneComponent.propTypes = propTypes

export default Hoc.withConnector(MainePaneComponent)

// TODO everytime component is mounted:
// const
// Then filter

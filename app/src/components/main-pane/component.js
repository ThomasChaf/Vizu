import React from 'react'
import PropTypes from 'prop-types'
import { withConnector } from '@contexts'
import SmartTable from './smart-table'
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

  executeQuery = async ({ filter, orders }) => {
    const table = await this.props.connector.select(this.props.tableName, filter, orders)

    this.setState({ table })
  }

  render() {
    if (!this.state.table) return <div>Loading...</div>

    return (
      <div className="main-pane-box">
        <SmartTable table={this.state.table} executeQuery={this.executeQuery} />
      </div>
    )
  }
}
MainePaneComponent.propTypes = propTypes

export default withConnector(MainePaneComponent)

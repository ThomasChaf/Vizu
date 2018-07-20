import React from 'react'
import PropTypes from 'prop-types'
import Hoc from '../../contexts/connector'
import TablesBar from '../table-bar/component'
import Result from '../result/component'
import './style.scss'

const propTypes = {
  connector: PropTypes.object.isRequired
}
class InterfaceComponent extends React.Component {
  state = { tableNames: null, currentTable: null }

  async componentDidMount() {
    this.setState({ tableNames: await this.props.connector.tableNames() })
  }

  handleSelect = async (selected) => this.setState({ currentTable: await this.props.connector.select(selected) })

  render() {
    if (!this.state.tableNames) return <div>Loading...</div>

    return (
      <div className="interface">
        <TablesBar
          database={this.props.connector.database}
          onSelect={this.handleSelect}
          selected={this.state.currentTable?.name}
          tableNames={this.state.tableNames}
        />
        <Result table={this.state.currentTable} />
      </div>
    )
  }
}
InterfaceComponent.propTypes = propTypes

export default Hoc.withConnector(InterfaceComponent)

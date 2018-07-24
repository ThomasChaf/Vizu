import React from 'react'
import PropTypes from 'prop-types'
import Hoc from '../../contexts/connector'
import TablesBar from '../table-bar/component'
import MainPane from '../main-pane/component'
import './style.scss'

const propTypes = {
  connector: PropTypes.object.isRequired
}
class InterfaceComponent extends React.Component {
  state = { tableNames: null, currentTable: null }

  async componentDidMount() {
    this.setState({ tableNames: await this.props.connector.tableNames() })
  }

  handleSelect = async (selected) => this.setState({ currentTable: selected })

  render() {
    if (!this.state.tableNames) return <div>Loading...</div>

    return (
      <div className="interface">
        <TablesBar
          database={this.props.connector.database}
          onSelect={this.handleSelect}
          selected={this.state.currentTable}
          tableNames={this.state.tableNames}
        />
        <MainPane key={this.state.currentTable} tableName={this.state.currentTable} />
      </div>
    )
  }
}
InterfaceComponent.propTypes = propTypes

export default Hoc.withConnector(InterfaceComponent)

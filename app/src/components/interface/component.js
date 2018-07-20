import React from 'react'
import PropTypes from 'prop-types'
import Hoc from '../../contexts/connector'
import TablesBar from '../table-bar/component'

const propTypes = {
  connector: PropTypes.object.isRequired
}
class InterfaceComponent extends React.Component {
  state = { schemas: null }

  async componentDidMount() {
    this.setState({ schemas: await this.props.connector.schema() })
  }

  handleSelect = (selected) => {
    this.setState({ selected })
  }

  render() {
    if (!this.state.schemas) return <div>Loading...</div>

    return (
      <div>
        <TablesBar
          database={this.props.connector.database}
          onSelect={this.handleSelect}
          selected={this.state.selected}
          schemas={this.state.schemas}
        />
      </div>
    )
  }
}
InterfaceComponent.propTypes = propTypes

export default Hoc.withConnector(InterfaceComponent)

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
  state = { schemas: null, results: null }

  async componentDidMount() {
    this.setState({ schemas: await this.props.connector.schema() })
  }

  handleSelect = async (selected) => {
    const results = await this.props.connector.select(selected)
    this.setState({ selected, results })
  }

  render() {
    if (!this.state.schemas) return <div>Loading...</div>

    return (
      <div className="interface">
        <TablesBar
          database={this.props.connector.database}
          onSelect={this.handleSelect}
          selected={this.state.selected}
          schemas={this.state.schemas}
        />
        <Result results={this.state.results} />
      </div>
    )
  }
}
InterfaceComponent.propTypes = propTypes

export default Hoc.withConnector(InterfaceComponent)

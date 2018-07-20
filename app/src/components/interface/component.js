import React from 'react'
import PropTypes from 'prop-types'
import TablesBar from '../table-bar/component'

const propTypes = {
  database: PropTypes.string.isRequired,
  schemas: PropTypes.array
}
class InterfaceComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: null }

    this.handleSelect = (selected) => this.setState({ selected })
  }

  render() {
    if (!this.props.schemas) return <div>Loading...</div>

    return (
      <div>
        <TablesBar
          database={this.props.database}
          onSelect={this.handleSelect}
          selected={this.state.selected}
          schemas={this.props.schemas}
        />
      </div>
    )
  }
}
InterfaceComponent.propTypes = propTypes

export default InterfaceComponent

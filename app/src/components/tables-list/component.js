import React from 'react'
import PropTypes from 'prop-types'
import Row from './row'
import './style.scss'

const propTypes = {
  database: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  tableNames: PropTypes.array.isRequired,
  selected: PropTypes.string
}
class TablesListComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tableNames: this.props.tableNames }
  }

  handleFilter(filter) {
    this.setState({ tableNames: this.props.tableNames.filter((tableName) => tableName.includes(filter)) })
  }

  render() {
    return (
      <div className="tables-list">
        <span className="tables-list-header">{this.props.database}</span>

        <input autoFocus onChange={(e) => this.handleFilter(e.target.value)} placeholder="Filter" />

        <div className="tables-list-list">
          {this.state.tableNames.map((name, key) => (
            <Row
              key={key}
              onClick={() => this.props.onSelect(name)}
              selected={name === this.props.selected}
              name={name}
            />
          ))}
        </div>
      </div>
    )
  }
}
TablesListComponent.propTypes = propTypes

export default TablesListComponent

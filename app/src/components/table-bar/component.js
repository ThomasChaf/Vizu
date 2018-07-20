import React from 'react'
import PropTypes from 'prop-types'
import Row from './row'
import './style.scss'

const propTypes = {
  database: PropTypes.string,
  schemas: PropTypes.array.isRequired,
  selected: PropTypes.string
}
const TablesBarComponent = (props) => (
  <div className="table-bar">
    <span className="table-bar-header">{props.database}</span>

    <div className="table-bar-list">
      {props.schemas.map((name, key) => (
        <Row key={key} onClick={() => props.onSelect(name)} selected={name === props.selected} name={name} />
      ))}
    </div>
  </div>
)

TablesBarComponent.propTypes = propTypes

export default TablesBarComponent

import React from 'react'
import PropTypes from 'prop-types'
import * as Dropdown from '@library/dropdown'
import './style.scss'

const colorHelper = (credential) => ({ backgroundColor: credential.color })

const propTypes = {
  credentials: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired
}
const DropdowComponent = (props) => (
  <Dropdown.Provider>
    <Dropdown.Toggler style={colorHelper(props.selected)}>
      {props.selected.name}
      <span className="home-dropdown-icon">&#9662;</span>
    </Dropdown.Toggler>
    <Dropdown.Box>
      {props.credentials.map((credential, key) => (
        <Dropdown.Row style={colorHelper(credential)} key={key} onClick={() => props.onSelect(credential)}>
          {credential.name}
        </Dropdown.Row>
      ))}
    </Dropdown.Box>
  </Dropdown.Provider>
)
DropdowComponent.propTypes = propTypes

export default DropdowComponent

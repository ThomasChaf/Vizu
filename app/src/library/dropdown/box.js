import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired
}
const DropdownBoxComponent = ({ children, ...props }) => (
  <div className="home-dropdown-container" {...props}>
    {children}
  </div>
)

DropdownBoxComponent.propTypes = propTypes

export default DropdownBoxComponent

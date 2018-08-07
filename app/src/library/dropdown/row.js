import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired
}
const DropdownRowComponent = ({ children, ...props }) => (
  <div className="home-dropdown-row" {...props}>
    <span />
    {children}
  </div>
)
DropdownRowComponent.propTypes = propTypes

export default DropdownRowComponent

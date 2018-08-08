import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired
}
const DropdownTogglerComponent = ({ children, ...props }) => (
  <div className="vz-dropdown-toggler" {...props}>
    {children}
  </div>
)
DropdownTogglerComponent.propTypes = propTypes

export default DropdownTogglerComponent

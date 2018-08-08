import React from 'react'
import PropTypes from 'prop-types'
import { Context } from './provider'

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}
const DropdownRowComponent = ({ children, onClick, ...props }) => (
  <Context.Consumer>
    {({ close }) => (
      <div className="vz-dropdown-row" {...props}>
        <span onClick={() => close(onClick)} />
        {children}
      </div>
    )}
  </Context.Consumer>
)
DropdownRowComponent.propTypes = propTypes

export default DropdownRowComponent

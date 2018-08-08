import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DropdownProvider from './provider'
import DropdownToggler from './toggler'
import DropdownBox from './box'
import './style.scss'

const propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired
}
const DropdowMenuIconComponent = (props) => (
  <DropdownProvider>
    <DropdownToggler>
      <i className={cn('vz-dropdown-menu-icon', 'fa', props.icon)} />
    </DropdownToggler>
    <DropdownBox>{props.children}</DropdownBox>
  </DropdownProvider>
)
DropdowMenuIconComponent.propTypes = propTypes

export default DropdowMenuIconComponent

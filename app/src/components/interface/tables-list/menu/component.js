import React from 'react'
import * as Dropdown from '@library/dropdown'

const MENUS = [
  {
    name: 'toto',
    onSelect: () => {}
  },
  {
    name: 'titi',
    onSelect: () => {}
  }
]

const propTypes = {}
const MenuDropdowComponent = () => (
  <Dropdown.IconMenu icon="fa-ellipsis-h">
    {MENUS.map((menu, key) => (
      <Dropdown.Row key={key} onClick={menu.onSelect}>
        {menu.name}
      </Dropdown.Row>
    ))}
  </Dropdown.IconMenu>
)
MenuDropdowComponent.propTypes = propTypes

export default MenuDropdowComponent

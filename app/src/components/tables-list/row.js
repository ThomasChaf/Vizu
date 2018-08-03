import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
}
const RowComponent = (props) => (
  <span onClick={props.onClick} className={cn('tables-list-row', { selected: props.selected })}>
    {props.name}
  </span>
)

RowComponent.propTypes = propTypes

export default RowComponent

import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Label from './label'

const COLORS = ['#FFFFFF', '#FBCC94', '#94FBB4', '#FB9494', '#94FBFB', '#A994FB', '#F5FB94', '#94C7FB']

const Color = (props) => (
  <button
    type="button"
    className={cn('home-form-color', { selected: props.selected })}
    style={{ backgroundColor: props.value }}
    onClick={() => props.onSelect(props.value)}
  />
)

Color.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired
}

const propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string
}
const ColorSelectorComponent = (props) => (
  <Label value="color">
    <div id="color" className="home-form-color-list">
      {COLORS.map((color, key) => (
        <Color key={key} value={color} selected={color === props.value} onSelect={props.onSelect} />
      ))}
    </div>
  </Label>
)
ColorSelectorComponent.propTypes = propTypes

export default ColorSelectorComponent

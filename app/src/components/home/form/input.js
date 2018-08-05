import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  values: PropTypes.object
}
const InputComponent = (props) => (
  <div className="home-form-input-box">
    <label className="home-form-input-label" htmlFor={props.id}>
      {props.id}
    </label>

    <input
      id={props.id}
      className="home-form-input-field"
      type="text"
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      value={props.values[props.id]}
    />
  </div>
)
InputComponent.propTypes = propTypes

export default InputComponent

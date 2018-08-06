import React from 'react'
import PropTypes from 'prop-types'
import Label from './label'

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.object,
  values: PropTypes.object
}
const InputComponent = (props) => (
  <Label value={props.id} error={props.errors[props.id]}>
    <input
      id={props.id}
      className="home-form-input-field"
      type="text"
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      value={props.values[props.id]}
    />
  </Label>
)
InputComponent.propTypes = propTypes

export default InputComponent

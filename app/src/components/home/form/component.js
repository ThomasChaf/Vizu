import React from 'react'
import PropTypes from 'prop-types'
import Input from './input'
import ColorSelector from './color-selector'
import './style.scss'

const propTypes = {
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.object
}
const FormComponent = (props) => (
  <form className="home-form-box">
    {props.errors._error && <span className="home-form-error">{props.errors._error}</span>}

    <Input id="name" {...props} />

    <ColorSelector onSelect={(color) => props.setFieldValue('color', color)} value={props.values.color} />

    <Input id="host" {...props} />

    <Input id="username" {...props} />

    <Input id="password" {...props} />

    <Input id="database" {...props} />

    <Input id="port" {...props} />

    <button type="submit" className="home-form-submit" onClick={props.handleSubmit}>
      Connect
    </button>
  </form>
)
FormComponent.propTypes = propTypes

export default FormComponent

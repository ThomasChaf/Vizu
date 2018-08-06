import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  value: PropTypes.string
}
const LabelComponent = (props) => (
  <div className="home-form-input-box">
    <label className="home-form-input-label" htmlFor={props.value}>
      {props.value}

      {props.error && <span className="home-form-input-error">{props.error}</span>}
    </label>

    {props.children}
  </div>
)

LabelComponent.propTypes = propTypes

export default LabelComponent

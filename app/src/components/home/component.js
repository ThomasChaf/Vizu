import React from 'react'
import PropTypes from 'prop-types'
import Form from './form/formik'
import './style.scss'

const propTypes = {
  onSelect: PropTypes.func.isRequired
}
const HomeComponent = (props) => (
  <div className="home-box">
    <Form onSubmit={props.onSelect} />
  </div>
)
HomeComponent.propTypes = propTypes

export default HomeComponent

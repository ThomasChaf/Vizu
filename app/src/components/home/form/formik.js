/* eslint-disable no-throw-literal */
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import _ from 'lodash'
import { withConnector, withConfig } from '@contexts'
import FormComponent from './component'

const validate = async (values, connector) => {
  const requiredError = ['name', 'host', 'username', 'password', 'database', 'port'].reduce(
    (acc, field) => (!values[field] ? _.merge(acc, { [field]: 'Required' }) : acc),
    null
  )

  if (requiredError) throw requiredError

  await connector.login(values).catch((e) => {
    console.log(e)
    throw { _error: e.message }
  })
}

const propTypes = {
  config: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}
const FormikComponent = (props) => (
  <Formik
    enableReinitialize
    validateOnBlur={false}
    validateOnChange={false}
    initialValues={props.initialValues}
    validate={(values) => validate(values, props.connector)}
    onSubmit={async (values) => {
      await props.config.loadDatabase(values.database)
      props.onSubmit()
    }}
    render={FormComponent}
  />
)

FormikComponent.propTypes = propTypes

export default withConfig(withConnector(FormikComponent))

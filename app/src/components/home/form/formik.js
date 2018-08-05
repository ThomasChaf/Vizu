/* eslint-disable no-throw-literal */
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import _ from 'lodash'
import { withConnector, withConfig } from '@contexts'
import FormComponent from './component'

const validate = async (values, connector) => {
  const requiredError = ['name', 'host', 'username', 'password', 'database', 'port'].reduce(
    (acc, field) => (!values[field] ? _.merge(acc, { field: 'Required' }) : acc),
    null
  )

  if (requiredError) throw requiredError

  await connector.login(values).catch((e) => {
    throw { _error: e.message }
  })
}

const propTypes = {
  config: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
}
class FormikComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { config: this.props.config.getFirstConfig() }
  }

  updateConfig = (name) => this.setState({ config: this.props.config.get(name) })

  render() {
    return (
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={this.state.config}
        validate={(values) => validate(values, this.props.connector)}
        onSubmit={async (values) => {
          await this.props.config.loadDatabase(values.database)
          this.props.onSubmit()
        }}
        render={FormComponent}
      />
    )
  }
}
FormikComponent.propTypes = propTypes

export default withConfig(withConnector(FormikComponent))

import React from 'react'
import PropTypes from 'prop-types'
import { withFormik, Field } from 'formik'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
const FilterComponent = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field type="text" name="filter" />

    <button type="submit">Valid</button>
  </form>
)
FilterComponent.propTypes = propTypes

export default withFormik({
  mapPropsToValues: (props) => ({
    filter: props.filter
  }),

  validate: (values) => {
    const errors = {}

    if (!values.filter) {
      errors.filter = 'Required'
    }
    return errors
  },

  handleSubmit: async ({ filter }, { props }) => props.onSubmit(filter)
})(FilterComponent)

import React from 'react'
import PropTypes from 'prop-types'
import { withConfig } from '@contexts'
import _ from 'lodash'
import Form from './form/formik'
import Dropdown from './dropdown/component'
import './style.scss'

const propTypes = {
  config: PropTypes.object.isRequired,
  onConnect: PropTypes.func.isRequired
}
class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.config.getFirstConfig().name || 'New configuration',
      credentials: [
        { name: 'New configuration', color: '#ffffff', host: '', username: '', password: '', database: '', port: 3306 },
        ...this.props.config.getCredentials()
      ]
    }
  }

  handleSelect = (credential) => this.setState({ selected: credential.name })

  handleSubmit = async (values) => {
    await this.props.config.loadDatabase(values.database)
    this.props.onConnect()
  }

  render() {
    const selected = _.find(this.state.credentials, ['name', this.state.selected])

    return (
      <div className="home-box">
        <div className="home-box-carton">
          <Dropdown credentials={this.state.credentials} onSelect={this.handleSelect} selected={selected} />

          <Form onSubmit={this.handleSubmit} initialValues={selected} />
        </div>
      </div>
    )
  }
}
HomeComponent.propTypes = propTypes

export default withConfig(HomeComponent)

/* eslint-disable react/no-multi-comp */
import React from 'react'
import PropTypes from 'prop-types'
import { withConfig } from '@contexts'
import _ from 'lodash'
import Form from './form/formik'
import './style.scss'

class SelectComponent extends React.Component {
  state = { toggle: false }

  handleToggle = () => this.setState({ toggle: !this.state.toggle })

  render() {
    return (
      <div>
        <div onClick={this.handleToggle}>{this.props.selected.name}</div>

        {this.state.toggle && (
          <div>
            {this.props.credentials.map((credential, key) => (
              <div key={key} onClick={() => this.props.onSelect(credential.name)}>
                {credential.name}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
SelectComponent.propTypes = {
  credentials: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
}

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
        { name: 'New configuration', host: '', username: '', password: '', database: '', port: 3306 },
        ...this.props.config.getCredentials()
      ]
    }
  }

  handleSelect = (selected) => this.setState({ selected })

  render() {
    const selected = _.find(this.state.credentials, ['name', this.state.selected])

    return (
      <div className="home-box">
        <div className="home-box-carton">
          <SelectComponent credentials={this.state.credentials} onSelect={this.handleSelect} selected={selected} />

          <Form onSubmit={this.props.onConnect} initialValues={selected} />
        </div>
      </div>
    )
  }
}
HomeComponent.propTypes = propTypes

export default withConfig(HomeComponent)

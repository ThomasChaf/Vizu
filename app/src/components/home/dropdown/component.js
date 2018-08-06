import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import './style.scss'

const colorHelper = (credential) => ({ backgroundColor: credential.color })

const Transition = (props) => <CSSTransition {...props} timeout={250} classNames="home-dropdown-animation" />

const propTypes = {
  credentials: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
}
class DropdowComponent extends React.Component {
  state = { toggle: false }

  handleToggle = () => this.setState({ toggle: !this.state.toggle })

  handleSelect = (credential) => this.setState({ toggle: false }, () => this.props.onSelect(credential))

  render() {
    return (
      <div className="home-dropdown">
        <div className="home-dropdown-toggler" onClick={this.handleToggle} style={colorHelper(this.props.selected)}>
          {this.props.selected.name}
          <span className="home-dropdown-icon">&#9662;</span>
        </div>

        <Transition in={this.state.toggle}>
          <div className="home-dropdown-container">
            {this.props.credentials.map((credential, key) => (
              <div className="home-dropdown-row" key={key} onClick={() => this.handleSelect(credential)}>
                {credential.name}
              </div>
            ))}
          </div>
        </Transition>
      </div>
    )
  }
}
DropdowComponent.propTypes = propTypes

export default DropdowComponent

import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import './style.scss'

const Transition = (props) => <CSSTransition {...props} timeout={250} classNames="home-dropdown-animation" />

const propTypes = {
  children: PropTypes.node.isRequired
}
class DropdowComponent extends React.Component {
  state = { toggle: false }

  handleToggle = () => this.setState({ toggle: !this.state.toggle })

  render() {
    const { children, ...props } = this.props
    return (
      <div className="home-dropdown" {...props}>
        {React.cloneElement(children[0], { onClick: this.handleToggle })}
        <Transition in={this.state.toggle}>{children[1]}</Transition>
      </div>
    )
  }
}
DropdowComponent.propTypes = propTypes

export default DropdowComponent

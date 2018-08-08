import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import './style.scss'

export const Context = React.createContext()

const Transition = (props) => <CSSTransition {...props} timeout={250} classNames="vz-dropdown-animation" />

const propTypes = {
  children: PropTypes.node.isRequired
}
class DropdowComponent extends React.Component {
  state = { toggle: false }

  handleToggle = () => this.setState({ toggle: !this.state.toggle })

  close = (cb) => this.setState({ toggle: false }, cb)

  _context = { close: this.close }

  render() {
    const { children, ...props } = this.props
    return (
      <Context.Provider value={this._context}>
        <div className="vz-dropdown" {...props}>
          {React.cloneElement(children[0], { onClick: this.handleToggle })}
          <Transition in={this.state.toggle}>{children[1]}</Transition>
        </div>
      </Context.Provider>
    )
  }
}
DropdowComponent.propTypes = propTypes

export default DropdowComponent

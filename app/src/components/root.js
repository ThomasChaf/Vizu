import React from 'react'
import Interface from './interface/component'
import Home from './home/component'

class Root extends React.Component {
  state = { selected: 'HOME' }

  handleSubmit = () => {
    this.setState({ selected: 'INTERFACE' })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selected === 'HOME' && <Home onSubmit={this.handleSubmit} />}
        {this.state.selected === 'INTERFACE' && <Interface />}
      </React.Fragment>
    )
  }
}

export default Root

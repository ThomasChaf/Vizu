import React from 'react'
import Connector from './modules/connector'
import ConnectorContext from './contexts/connector'
import Interface from './components/interface/component'

class App extends React.Component {
  state = { connector: new Connector() }

  render() {
    return (
      <ConnectorContext.Provider value={this.state.connector}>
        <Interface />
      </ConnectorContext.Provider>
    )
  }
}

export default App

import React from 'react'
import Config from './modules/configuration'
import Connector from './modules/connector'

export const Contexts = {
  Connector: React.createContext(new Connector()),
  Config: React.createContext(new Config())
}

export const withConnector = (Component) => (props) => (
  <Contexts.Connector.Consumer>
    {(connector) => <Component {...props} connector={connector} />}
  </Contexts.Connector.Consumer>
)

export const withConfig = (Component) => (props) => (
  <Contexts.Config.Consumer>{(config) => <Component {...props} config={config} />}</Contexts.Config.Consumer>
)

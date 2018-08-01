import React from 'react'

export const Contexts = {
  Connector: React.createContext(),
  Config: React.createContext()
}

export const withConnector = (Component) => (props) => (
  <Contexts.Connector.Consumer>
    {(connector) => <Component {...props} connector={connector} />}
  </Contexts.Connector.Consumer>
)

export const withConfig = (Component) => (props) => (
  <Contexts.Config.Consumer>{(config) => <Component {...props} config={config} />}</Contexts.Config.Consumer>
)

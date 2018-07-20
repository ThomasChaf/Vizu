import React from 'react'

const Context = React.createContext()

const withConnector = (Component) => (props) => (
  <Context.Consumer>{(connector) => <Component {...props} connector={connector} />}</Context.Consumer>
)

export default { ...Context, withConnector }

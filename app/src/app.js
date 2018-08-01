import React from 'react'
import { Contexts } from '@contexts'
import 'reflect-metadata'
import { ipcRenderer } from 'electron'
import Config from './modules/configuration'
import Connector from './modules/connector'
import Interface from './components/interface/component'

class App extends React.Component {
  state = { connector: new Connector(), config: new Config(), error: null, mounted: false }

  async componentDidMount() {
    await this.state.config.init(this.state.connector.database)
    const res = await this.state.connector.init().catch((e) => this.setState({ error: e.message }))

    if (res) this.setState({ mounted: true })

    ipcRenderer.on('app-close', this.handleExit)
  }

  handleExit = async () => {
    await this.state.config.save(() => ipcRenderer.send('closed').catch((e) => this.setState({ error: e.message })))
  }

  render() {
    if (this.state.error) return <div>{this.state.error}</div>

    if (!this.state.mounted) return null

    return (
      <Contexts.Connector.Provider value={this.state.connector}>
        <Contexts.Config.Provider value={this.state.config}>
          <Interface />
        </Contexts.Config.Provider>
      </Contexts.Connector.Provider>
    )
  }
}

export default App

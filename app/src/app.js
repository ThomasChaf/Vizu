import 'reflect-metadata'
import React from 'react'
import PropTypes from 'prop-types'
import { ipcRenderer } from 'electron'
import { withConfig } from '@contexts'
import Root from './components/root'

const propTypes = {
  config: PropTypes.object.isRequired
}
class App extends React.Component {
  state = { error: null, mounted: false }

  async componentDidMount() {
    await this.props.config.init()

    this.setState({ mounted: true })

    ipcRenderer.on('app-close', this.handleExit)
  }

  handleExit = async () => {
    await this.props.config.save(() => ipcRenderer.send('closed').catch((e) => this.setState({ error: e.message })))
  }

  render() {
    if (this.state.error) return <div>{this.state.error}</div>

    if (!this.state.mounted) return null

    return <Root />
  }
}
App.propTypes = propTypes

export default withConfig(App)

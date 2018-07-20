import React from 'react'
import Sequelize from './modules/sequelize'
import Interface from './components/interface/component'

class App extends React.Component {
  constructor(props) {
    super(props)
    this._sequelize = new Sequelize()
    this.state = { schemas: null }
  }

  async componentDidMount() {
    this.setState({ schemas: await this._sequelize.schema() })
  }

  render() {
    return <Interface database={this._sequelize.database} schemas={this.state.schemas} />
  }
}

export default App

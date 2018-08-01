import storage from 'electron-json-storage'

class ConfigurationManager {
  constructor() {
    storage.setDataPath(`${$dirname}/database`)
  }

  init = (database) => {
    this._database = database

    storage.get(database, (error, data) => {
      if (error) {
        console.error(error)
      }

      this._config = JSON.parse(data)
    })
  }

  /* TODO this method but before its probably good to get autocompletion from props to know what's in head */
  organise(elements) {
    if (!this._config.levels) {
      this._config.levels = []
      Object.keys(elements).map((columnName, level) => this._config.levels.push({ level, columnName, display: true }))
    }

    return this._config.levels.map(({ columnName }) => elements[columnName])
  }

  save(onSave) {
    if (this._database && this._config) {
      storage.set(this._database, JSON.stringify(this._config), (error) => {
        if (error) throw error

        onSave()
      })
    }
  }
}

export default ConfigurationManager

import storage from 'electron-json-storage'
import _ from 'lodash'

class ConfigurationManager {
  constructor() {
    storage.setDataPath(`${$dirname}/database`)
  }

  init = (database) => {
    this._database = database

    return new Promise((resolve, reject) => {
      storage.get(database, (error, data) => {
        if (error) reject(error)
        else {
          this._config = data
          resolve()
        }
      })
    })
  }

  organise = (tablename, elements) => {
    if (!this._config[tablename]) {
      this._config[tablename] = { levels: {} }
      Object.keys(elements).forEach((columnName, position) => {
        this._config[tablename].levels[columnName] = { position, columnName, display: true }
      })
    }

    const res = []
    _.forIn(this._config[tablename].levels, (level) => {
      res[level.position] = elements[level.columnName]
    })

    return res
  }

  swap = (tablename, column1, column2) => {
    const tmp = this._config[tablename].levels[column1].position
    this._config[tablename].levels[column1].position = this._config[tablename].levels[column2].position
    this._config[tablename].levels[column2].position = tmp
  }

  save(onSave) {
    if (this._database && this._config) {
      storage.set(this._database, this._config, (error) => {
        if (error) throw error

        onSave()
      })
    }
  }
}

export default ConfigurationManager

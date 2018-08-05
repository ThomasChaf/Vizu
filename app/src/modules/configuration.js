import storage from 'electron-json-storage'
import _ from 'lodash'

const EMPTY_CONFIG = { credentials: [] }
const CONFIG_PATH = 'vizu-storage'

class ConfigurationManager {
  constructor() {
    storage.setDataPath(`${$dirname}/../.database`)
  }

  init = () =>
    new Promise((resolve, reject) => {
      storage.get(CONFIG_PATH, (error, data) => {
        if (error) reject(error)
        else {
          this._generalConfig = _.merge(EMPTY_CONFIG, data)
          console.log('GENERAL CONFIG:', this._generalConfig)
          resolve()
        }
      })
    })

  getConfig = (name) => _.merge({ port: 3306 }, _.find(this._generalConfig.credentials, [name]))

  getFirstConfig = () => this._generalConfig.credentials[0]

  loadDatabase = (database) =>
    new Promise((resolve, reject) => {
      storage.get(database, (error, data) => {
        if (error) reject(error)
        else {
          this._config = data
          resolve()
        }
      })
    })

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

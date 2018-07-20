import Sequelize from 'sequelize'
import squel from 'squel'
import _ from 'lodash'
import Table from './table'

class Connector {
  _database = 'allsquare_prod'

  _sequelize = new Sequelize(this._database, 'allsquare', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  })

  get database() {
    return this._database
  }

  async tableNames() {
    const tableNames = await this._sequelize
      .getQueryInterface()
      .showAllSchemas()
      .catch((err) => console.log('Error: Show schema doesnt work', err))

    return tableNames.map((blob) => Object.values(blob)[0])
  }

  async select(selected) {
    const [results, types] = await Promise.all([
      this._sequelize.query(
        squel
          .select()
          .from(selected)
          .limit(10)
          .toString()
      ),
      this._sequelize.query(`SHOW COLUMNS FROM ${selected}`)
    ]).catch((err) => console.error('Error:', err))

    return new Table(selected, _.flatten(results), _.flatten(types))
  }
}

export default Connector

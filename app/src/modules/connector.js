import Sequelize from 'sequelize'
import squel from 'squel'
import memoize from 'memoize-one'
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

  tableInfo = memoize((tableName) => this._sequelize.query(`SHOW COLUMNS FROM ${tableName}`))

  async select(tableName, condition = '') {
    const [results, types] = await Promise.all([
      this._sequelize.query(
        squel
          .select()
          .from(tableName)
          .where(condition)
          .limit(10)
          .toString()
      ),
      this.tableInfo(tableName)
    ]).catch((err) => console.error('Error:', err))

    return new Table(tableName, results[0], types[0])
  }
}

export default Connector

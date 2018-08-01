import * as TypeORM from 'typeorm'
import memoize from 'memoize-one'
import Table from './table'
import QueryBuilder from './query-builder'

class Connector {
  _database = 'allsquare_prod'

  async init() {
    this._orm = await TypeORM.createConnection({
      type: 'mysql',

      host: 'localhost',

      database: this._database,

      username: 'allsquare',
      password: ''
    })

    return this._orm
  }

  get database() {
    return this._database
  }

  async tableNames() {
    const tableNames = await this._orm
      .query('SHOW TABLES')
      .catch((err) => console.error('Error: Show schema doesnt work', err))

    return tableNames.map((blob) => Object.values(blob)[0])
  }

  tableInfo = memoize((tableName) => this._orm.query(`SHOW COLUMNS FROM ${tableName}`))

  async select(tableName, condition = '', orders = {}) {
    const [results, types] = await Promise.all([
      this._orm.query(
        QueryBuilder.select
          .from(tableName)
          .order(orders)
          .where(condition)
          .limit(10)
          .toString()
      ),
      this.tableInfo(tableName)
    ]).catch((err) => console.error('Error:', err))

    return new Table(tableName, results, types)
  }
}

export default Connector

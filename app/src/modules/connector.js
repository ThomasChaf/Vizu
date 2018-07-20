import Sequelize from 'sequelize'
import squel from 'squel'
import _ from 'lodash'

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

  async schema() {
    const schemas = await this._sequelize
      .getQueryInterface()
      .showAllSchemas()
      .catch((err) => console.log('Error: Show schema doesnt work', err))

    return schemas.map((schema) => Object.values(schema)[0])
  }

  async select(selected) {
    const query = squel
      .select()
      .from(selected)
      .limit(10)

    const results = await this._sequelize
      .query(query.toString())
      .catch((err) => console.error('Error: Can select', err))

    return _.flatten(results)
  }
}

export default Connector

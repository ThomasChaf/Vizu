import Sequelize from 'sequelize'

class Connector {
  constructor() {
    this._database = 'allsquare_prod'
    this._sequelize = new Sequelize(this._database, 'allsquare', '', {
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
  }

  get database() {
    console.log('ca get', this._database)
    return this._database
  }

  async schema() {
    const schemas = await this._sequelize
      .getQueryInterface()
      .showAllSchemas()
      .catch((err) => console.log('SHOW SCHEMA DOESNT WORK', err))

    return schemas.map((schema) => Object.values(schema)[0])
  }
}

export default Connector

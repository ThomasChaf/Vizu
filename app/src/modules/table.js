import _ from 'lodash'
import moment from 'moment'

class Column {
  FORMATS = [
    {
      match: (type) => [/int\(\d+\)/, /varchar\(\d+\)/, /text/].find((regex) => type.match(regex)),
      toString: (x) => x || 'NULL'
    },
    {
      match: (type) => [/datetime/].find((regex) => type.match(regex)),
      toString: (x) => (x ? moment(x).format('DD/MM/YYYY HH:mm:ss') : 'NULL')
    }
  ]

  constructor(name, type) {
    this._name = name
    this._type = type
    this._format = this.FORMATS.find((format) => format.match(type.Type)) || {
      toString: () => {
        console.log(`Type: ${type.Type} not implemented`)
        return ''
      }
    }
  }

  format(value) {
    return this._format.toString(value)
  }

  get name() {
    return this._name
  }
}

class Table {
  constructor(name, rows, types) {
    this._name = name
    this._rows = rows
    this._types = types
    this._head = []

    const columns = Object.keys(this.rows[0])

    if (columns.indexOf('id') !== -1) this.head.push(this._createColumn('id'))

    _.pull(columns, 'id').map((columnName) => this.head.push(this._createColumn(columnName)))

    console.log(types)
  }

  _createColumn = (name) => new Column(name, this._types.find((type) => type.Field === name))

  get name() {
    return this._name
  }

  get head() {
    return this._head
  }

  get rows() {
    return this._rows
  }
}

export default Table

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

  constructor(type) {
    this._name = type.Field
    this._type = type.Type
    this._format = this.FORMATS.find((format) => format.match(type.Type)) || {
      toString: () => {
        console.info(`Type: ${type.Type} not implemented`)
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
    this._head = {}

    this._types.forEach((type) => {
      this._head[type.Field] = new Column(type)
    })
  }

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

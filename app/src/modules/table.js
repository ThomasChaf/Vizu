import _ from 'lodash'

class Table {
  constructor(name, rows, types) {
    this._name = name
    this._rows = rows
    this._types = types
  }

  get name() {
    return this._name
  }

  get head() {
    const columns = Object.keys(this.rows[0])
    const head = []
    if (columns.indexOf('id') !== -1) head.push('id')

    _.pull(columns, 'id').map((k) => head.push(k))

    return head
  }

  get rows() {
    return this._rows
  }
}

export default Table

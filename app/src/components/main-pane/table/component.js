import React from 'react'
import PropTypes from 'prop-types'
import { withConfig } from '@contexts'
import FilterOrder from './filter-order'
import Row from './row'
import './style.scss'

const propTypes = {
  config: PropTypes.object,
  orders: PropTypes.object.isRequired,
  onOrder: PropTypes.func.isRequired,
  table: PropTypes.object
}
class ResultComponent extends React.Component {
  state = { toggleColumn: true }

  handleColumnArranging(tablename, column1, column2) {
    this.props.config.swap(tablename, column1, column2)
    this.setState({ toggleColumn: !this.state.toggleColumn })
  }

  render() {
    if (!this.props.table) return null

    const tablename = this.props.table.name
    const head = this.props.config.organise(tablename, this.props.table.head)
    const orders = this.props.config.organise(tablename, this.props.orders)

    return (
      <div className="result-box">
        <table>
          <thead className="result-box-head">
            <FilterOrder orders={orders} onOrder={this.props.onOrder} />
            <tr className="result-box-head-row">
              {head.map((column, key) => (
                <td
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('column', column.name)
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    const targetColumn = event.dataTransfer.getData('column')

                    this.handleColumnArranging(tablename, column.name, targetColumn)
                  }}
                  key={key}
                  className="result-box-head-row-cell"
                >
                  {column.name}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="result-box-body">
            {this.props.table.rows.map((result, key) => (
              <tr key={key} className="result-box-body-row">
                <Row head={head} result={result} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
ResultComponent.propTypes = propTypes

export default withConfig(ResultComponent)

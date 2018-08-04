import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  onSubmit: PropTypes.func.isRequired
}
const Home = ({ onSubmit }) => (
  <div>
    HOME HEU??<button onClick={onSubmit}>Interface</button>
  </div>
)

Home.propTypes = propTypes

export default Home

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pal justify-between nowrap blue">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">List of Authors</div>
          <Link to="/" className="ml1 no-underline black">
            list
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

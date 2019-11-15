import React, { Component } from 'react'

class Author extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.author.author_id}. {this.props.author.firstName}
        </div>
      </div>
    )
  }
}

export default Author

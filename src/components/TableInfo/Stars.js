import React, { Component } from 'react'

import Rating from '@material-ui/lab/Rating'

class Stars extends Component {

  constructor(props){
    super(props)
    this.state={
      number: this.props.number
    }
  }

  handleChange = (event, newValue) => {
    console.log(event)
    this.setState({
      number: newValue
    })
  }

  render() {

    return(
      <div>
        <Rating
          name="read-only"
          value={this.state.number}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Stars

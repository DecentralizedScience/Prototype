import React, { Component } from 'react'

import Rating from '@material-ui/lab/Rating'

class Stars extends Component {

  constructor(props){
    super(props)
    this.state={
      rating: this.props.rating
    }
  }

  handleChange = (event, newValue) => {
    console.log(event)
    this.setState({
      rating: newValue
    })
  }

  renderStars(){
    if(this.state.rating===null){
      return (
        <Rating
          name="simple-controlled"
          value={this.state.rating}
          onChange={this.handleChange}
        />
      )
    } else {
      return (
        <Rating
          name="read-only"
          value={this.state.rating}
          readOnly
        />
      )
    }
  }

  render() {

    return(
      <div>
        {this.renderStars()}
      </div>
    )
  }
}

export default Stars

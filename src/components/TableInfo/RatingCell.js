import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import StarIcon from '@material-ui/icons/Star'

class RatingCell extends Component {

  constructor(props){
    super(props)
    this.state={
      reviews: this.props.reviews
    }
  }

  render() {
    let sum=0, num=0
    this.state.reviews.map(review => {
      if(review.quality!=undefined){
        sum=sum+review.quality
        num++
      }
    })
    if(num==0){
      return(
        <Tooltip title="No information available">
          <span>
            <Button
              startIcon={<StarIcon />}
              disabled
            >
              -/5
            </Button>
          </span>
        </Tooltip>
      )
    } else {
      return(
        <Button
          startIcon={<StarIcon />}
        >
          {sum/num}/5
        </Button>
      )
    }
  }
}

export default RatingCell

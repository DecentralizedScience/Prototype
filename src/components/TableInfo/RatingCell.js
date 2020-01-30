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

  calculateRating = (reviews) => {
    let sum=0, num=0
    reviews.map(review => {
      if(review.quality!=undefined){
        sum=sum+review.quality
        num++
      }
    })

    // Round to two decimals
    let rating = Math.round(((sum/num)+ Number.EPSILON)*100)/100

    return [num, rating]
  };

  render() {
    let num, rating

    num = this.calculateRating(this.state.reviews)[0]
    rating = this.calculateRating(this.state.reviews)[1]


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
          {rating}/5
        </Button>
      )
    }
  }
}

export default RatingCell

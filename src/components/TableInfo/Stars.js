import React, { Component } from 'react'

import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import StarHalfIcon from '@material-ui/icons/StarHalf'

class Stars extends Component {

  constructor(props){
    super(props)
    this.state={
      number: this.props.number
    }
  }

  computeStars(rating) {
    const starArray = new Array(5)
    for(let i = 0; i<5; i++){
      if (rating >= i+1) {
        starArray[i] = <StarIcon style={{color: '#fbc02d'}} />
      } else if (rating > i && rating < i+1) {
        starArray[i] = <StarHalfIcon style={{color: '#fbc02d'}} />
      } else {
        starArray[i] = <StarBorderIcon style={{color: '#fbc02d'}} />
      }
    }

    return starArray
  }

  render() {

    const starArray = this.computeStars(this.state.number)

    return(
      <div>
        {starArray}
      </div>
    )
  }
}

export default Stars

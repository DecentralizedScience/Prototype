import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import VisibilityIcon from '@material-ui/icons/Visibility'

class ReviewsList extends Component {

  constructor(props){
    super(props)
    this.state = {
      reviews: [
        {
          title: "Decentralized blockchain technology and the rise of lex cryptographia",
          authors: ["A. Wright", "P. De Filippi"],
          journal: "Available at SSRN 2580664",
          kudos: [1, 2],
          imported_from: "Publons"
        },
        {
          title: "Blockchains and the economic institutions of capitalism",
          authors: ["S. Davidson", "P. De Filippi", "J. Potts"],
          journal: "Journal of Institutional Economics 14 (4), 639-658",
          kudos: [3],
          imported_from: undefined
        },
        {
          title: "Blockchain and values systems in the sharing economy: The illustrative case of Backfeed",
          authors: ["A. Pazaitis", "P. De Filippi", "V. Kostakis"],
          journal: "Tech Forecasting and Social Change 125, 105-115",
          kudos: [4],
          imported_from: undefined
        }
      ]
    }
  }

  render() {

    return(
      <div>
        {this.state.reviews.map( review =>
          <Typography style={{color: '#374784'}}>
            {/*<VisibilityIcon />
            {review.title}*/}
            <Grid container style={{marginLeft: 20}}>
              <Grid item>
                <VisibilityIcon style={{color: '#374784'}} />
              </Grid>
              <Grid item style={{marginLeft: 10}}>
                <Typography>
                  {review.title}
                </Typography>
                <Typography style={{color: '#727474'}}>
                  {review.authors.join(', ')}
                </Typography>
                <Typography style={{color: '#727474'}}>
                  {review.journal}
                </Typography>
              </Grid>
            </Grid>
          </Typography>
        )}
      </div>
    )
  }
}

export default ReviewsList

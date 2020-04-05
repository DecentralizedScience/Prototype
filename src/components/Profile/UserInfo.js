import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

import Interests from './Interests'
import ImportFrom from './ImportFrom'
import ReviewsList from './ReviewsList'

class UserInfo extends Component {

  render(){

    return(
      <div>
        <div style={{marginBottom: 80}}>
          <Typography variant="h3" style={{color: '#727474', marginBottom: 10}}>
            Your Interests
          </Typography>
          <Typography style={{color: '#727474'}}>
            Write here your interests so others can find you as a reviewer.
          </Typography>
          <Typography style={{color: '#727474', marginBottom: 10}}>
            E.G: Artificial Intelligence, Computer Science, Blockchain, Open Science.
          </Typography>
          <Typography style={{color: '#A7A2A6'}}>
            (You have to put a comma to separate them)
          </Typography>
          <Interests />
          <Paper>
          </Paper>
        </div>
        <div></div>
        <Typography variant="h3" style={{color: '#727474', marginBottom: 10}}>
          Your Reviews
        </Typography>
        <Typography style={{color: '#727474'}}>
          Add your reviewss to improve your visibility and win <b>recognitions</b> for your good work.
        </Typography>
        <ImportFrom />
        <Typography style={{color: '#727474'}}>
          Or send them to us: &nbsp;
        <Link href="mailto:reviews@decentralized.science">
          reviews@decentralized.science
        </Link>
        </Typography>
        <Typography variant="h5" style={{color: '#727474', marginTop: 20, marginBottom: 15}}>
          Your reviews on Decentralized Science
        </Typography>
        <ReviewsList />
      </div>
    )
  }
}

export default UserInfo

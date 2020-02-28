import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import Interests from './Interests'

class UserInfo extends Component {

  render(){

    return(
      <div>
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
    )
  }
}

export default UserInfo

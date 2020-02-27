import React, { Component } from 'react'

import Typography from '@material-ui/core/Typography'

class UserInfo extends Component {

  render(){

    return(
      <div>
        <Typography variant="h3" style={{color: '#727474'}}>
          Your Interests
        </Typography>
        <Typography style={{color: '#727474'}}>
          Write here your interests so others can find you as a reviewer.
        </Typography>
        <Typography style={{color: '#727474'}}>
          E.G: Artificial Intelligence, Computer Science, Blockchain, Open Science.
        </Typography>
        <Typography style={{color: '#A7A2A6'}}>
          (You have to put a comma to separate them)
        </Typography>
      </div>
    )
  }
}

export default UserInfo

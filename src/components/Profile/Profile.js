import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'

import UserProfile from './UserProfile'
import UserInfo from './UserInfo'

class Profile extends Component {

  render() {
    return(
      <div style={{margin:40}}>
        <div>Profile</div>
        <Grid container style={{padding:20}}>
          <Grid item xs={12} sm={4}>
            <UserProfile />
          </Grid>
          <Grid item xs={12} sm={8}>
            <UserInfo />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Profile

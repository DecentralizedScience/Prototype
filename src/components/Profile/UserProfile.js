import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import FaceIcon from '@material-ui/icons/Face'
import DotIcon from '@material-ui/icons/FiberManualRecord'
import RedeemIcon from '@material-ui/icons/Redeem'

const styles = theme => ({
  root:{
    width: 500
  },
  title: {
    color: '#7EC3C7'
  },
  avatar: {
    backgroundColor: '#7EC3C7',
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  icon: {
    fontSize: 120
  }
})

class UserProfile extends Component {

  render() {
    const { classes } = this.props

    return(
      <Paper className={classes.root}>
        <Grid container spacing={2} direction='column' alignItems='center' justify='center'>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              My profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>
              <FaceIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4'>
              Name Surname
            </Typography>
            <Typography align='center' style={{color: '#727474'}}>
              University or affiliation
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{color: '#E16364'}}>
              Academia profile
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{padding: 20, paddingLeft: 0, margin:20, marginTop:60}}>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item>
                <DotIcon style={{color: '#374784'}} />
              </Grid>
              <Grid item>
                <Typography>
                  25 tokens
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item>
                <RedeemIcon />
              </Grid>
              <Grid item>
                <Typography>
                  4 rewards
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item>
                <DotIcon style={{color: '#E16364'}} />
              </Grid>
              <Grid item>
                <Typography>
                  104 reputation
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(UserProfile)

import React, { Component } from 'react'

import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Box from '@material-ui/core/Box'

import Background from '../assets/DS_background.png'

const styles = theme => ({
  root: {
    margin: -60,
    marginBottom: -100,
    padding: 60,
    paddingBottom: 150,
    //background: '#21305c'
    backgroundImage: `url(${Background})`
  },
  search: {
    margin: 20,
    paddingTop: 85
  },
  font: {
    color: '#a7cee2'
  },
  input: {
    flex: 1,
    background: "white",
    padding:20,
    marginRight: -70,
    width: 850,
    borderRadius: 36
  },
  iconButton: {
    padding: 10,
  }
})

class Header extends Component {

  render() {
    const {classes} = this.props
    return(
      <Paper className={classes.root}>
        <React.Fragment>
          <img alt='Decentralized Science logo' src={require('../assets/DS_logo.png')} height='85'/>
        </React.Fragment>
        <Box className={classes.search}>
          <Typography variant='h4' align='center' color='white' gutterBottom paragraph className={classes.font}>
            <Box fontWeight="fontWeightBold" >
              SEARCH THE BEST REVIEWER FOR YOUR PAPER
            </Box>
          </Typography>
          <div align='center'>
            <InputBase
              className={classes.input}
              placeholder="Search by name or interest"
              autoFocus
              value={this.props.value}
              onChange={this.props.onChange}
              inputProps={{
                'aria-label': 'reviewers search',
                style: {textAlign: 'left', marginLeft:10}
              }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon style={{fontSize: 40}}/>
            </IconButton>
          </div>
        </Box>
      </Paper>

    )
  }
}

export default withStyles(styles)(Header)

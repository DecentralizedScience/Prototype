import React, { Component } from 'react'

import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => console.log(theme) || ({
  root: {
    margin: 20,
    padding: 100,
    background: '#21305c'
  },
  font: {
    color: '#a7cee2'
  },
  input: {
    marginLeft: theme.spacing(3),
    flex: 1,
    background: "white",
    padding:10,
    width: '30%',
  },
  iconButton: {
    padding: 10,
  }
})

class Header extends Component {
  render() {
    const {classes} = this.props
    return(
      /*<Typography variant='h4' align='center' gutterBottom>
        Recommended Reviewers
      </Typography>*/
      <Paper className={classes.root}>
        <Typography variant='h5' align='center' color='white' gutterBottom className={classes.font}>
          SEARCH THE BEST REVIEWER FOR YOUR PAPER
        </Typography>
        <div align='center'>
          <InputBase
            className={classes.input}
            placeholder="Search by name or interest"
            inputProps={{
              'aria-label': 'reviewers search',
              style: {textAlign: 'center'}
            }}
            endAdornment={
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            }
          />
        </div>
      </Paper>

    )
  }
}

export default withStyles(styles)(Header)

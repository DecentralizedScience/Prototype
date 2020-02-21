import React, { Component } from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  root: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: -10,
    marginRight: -24
  }
})

class TableToolbar extends Component {

  render(){
    const {classes} = this.props

    return(
      <Box display="flex" className={classes.root}>
        <Box p={1} flexGrow={1}>
          <Typography variant='h6'>
            RECOMMENDED REVIEWERS
          </Typography>
        </Box>
        <Box p={1}>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.checked}
                onChange={this.props.onChange}
                value="checked"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Show me only unoccupied"
          />
        </Box>
      </Box>
    )
  }

}

export default withStyles(styles)(TableToolbar)

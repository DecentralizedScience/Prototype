import React, { Component } from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  root: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
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

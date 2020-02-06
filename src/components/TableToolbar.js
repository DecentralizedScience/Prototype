import React, { Component } from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => console.log(theme) || ({
  root: {
    margin: 20,
    padding: 20,
  }
})

class TableToolbar extends Component {

  constructor(props){
    super(props)
    this.state={
      checked: false
    }
  }

  handleChange = name => event => {
    this.setState({
      checked: event.target.checked
    })
  }

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
                checked={this.state.checkedA}
                onChange={this.handleChange}
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

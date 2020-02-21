import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    margin: 20,
    padding: 20,
    backgroundColor: '#a7cee2'
  }
})

class Register extends Component {

  render(){
    const { classes } = this.props

    return(
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        styles={{ minHeight: '100vh' }}
      >
        <Paper className={classes.root}>
          <div style={{padding:20}}>
            <Grid
              container
              direction="Column"
              alignItems="center"
            >
              <p>Welcome to Decentralized Science! To join us, fill the following form:</p>
            </Grid>
          </div>
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <div>
              <TextField
                required
                id="name"
                label="Name"
                variant="outlined"
                margin="normal"
                style={{backgroundColor: "white", margin: 10}}
              />
                <TextField
                  required
                  id="surname"
                  label="Surname"
                  variant="outlined"
                  margin="normal"
                  style={{backgroundColor: "white", margin: 10}}
                />
            </div>
            <div>
              <TextField
                required
                id="email"
                label="E-mail"
                variant="outlined"
                margin="normal"
                style={{backgroundColor: "white"}}
              />
            </div>
            <div>
              <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                style={{backgroundColor: "white"}}
              />
            </div>
          </Grid>

          <Grid container alignItems="flex-start" justify="flex-end" direction="row">
            <Button variant="contained" style={{margin:20, backgroundColor:'#374784', color:'white'}}>
              Register
            </Button>
          </Grid>
        </Paper>
      </Grid>
      /*<form className={classes.form} noValidate autocomplete="off">
        <div>
          <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
          <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </form>*/
    )
  }
}

export default withStyles(styles)(Register)

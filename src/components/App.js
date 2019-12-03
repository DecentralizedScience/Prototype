import React, { Component } from 'react'
import UserList from './UserList'
import Header from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => console.log(theme) || ({
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 1200
  }
})

class App extends Component {
  render() {
    const {classes } = this.props
    return (
      <Paper className={classes.root}>
        <Header />
        <UserList />
      </Paper>
    )
  }
}

export default withStyles(styles)(App)

import React, { Component } from 'react'
import AuthorList from './AuthorList'
import Header from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => console.log(theme) || ({
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 800
  }
})

class App extends Component {
  render() {
    const {classes } = this.props
    return (
      <Paper className={classes.root}>
        <Header />
        <AuthorList />
      </Paper>
    )
  }
}

export default withStyles(styles)(App)

import React, { Component } from 'react'
import UserList from './UserList'
import Header from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => console.log(theme) || ({
  root: {
    margin: 20,
    padding: 20
  }
})

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  handleValueChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  render() {
    const {classes } = this.props
    return (
      <Paper className={classes.root}>
        <Header
          onChange={this.handleValueChange}
        />
        <UserList
          value={this.state.searchValue}
          key={this.state.searchValue}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(App)

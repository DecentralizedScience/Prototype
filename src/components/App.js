import React, { Component } from 'react'
import UserList from './UserList'
import Header from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => ({
  root: {
    margin: 0,
    padding: 60
  }
})

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchValue: '',
      unoccupied: false,
      labels: []
    }
  }

  handleValueChange = (event) => {
    this.setState({
      searchValue: event.target.value
    })
  }

  handleSwitchChange = (event) => {
    this.setState({
      unoccupied: event.target.checked
    })
  }

  handleLabelClick = (event) => {
    console.log(event.target)
    if(!this.state.labels.includes(event.target.textContent)){
      this.setState({
        labels: this.state.labels.concat(event.target.textContent)
      })
    }
  }

  handleLabelDelete = (labelToDelete) => () => {
    this.setState({
      labels: this.state.labels.filter(label => label !== labelToDelete)
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
          onSwitchChange={this.handleSwitchChange}
          unoccupied={this.state.unoccupied}
          onLabelClick={this.handleLabelClick}
          onLabelDelete={this.handleLabelDelete}
          labels={this.state.labels}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(App)

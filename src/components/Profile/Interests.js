import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
//ChipInput from https://github.com/TeamWertarbyte/material-ui-chip-input
//import ChipInput from 'material-ui-chip-input'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    maxWidth: 700,
    marginTop: 20
  },
  chip: {
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#a7cee2',
    fontWeight: 'bold',
    color: 'white'
  },
})

class Interests extends Component {

  constructor(props){
    super(props)
    this.state ={
      interests: ['Artificial Intelligence', 'Computer Science', 'Blockchain', 'Open Access', 'Decentralization']
    }
  }

  handleDelete = (interestToDelete) => () => {
    this.setState({
      interests: this.state.interests.filter(interest => interest !== interestToDelete)
    })
  }

  handleAddChip = (chip) => {
    this.setState(state => {
      const interests = this.state.interests.push(chip)

      return({
        interests
      })
    })
  }

  render() {
    const { classes } = this.props

    return(
      <div>
        <Paper className={classes.root}>
          {this.state.interests.map(interest => {
            return(
              <Chip
                className={classes.chip}
                key={interest}
                label={interest}
                onDelete={this.handleDelete(interest)}
              />
            )
          })}
          <Button size='small' color='primary'>
            Add another interest
          </Button>
        </Paper>
        {/*<Paper className={classes.root}>
          <ChipInput>
            value={this.state.interests}
            onAdd={(chip) => this.handleAddChip(chip)}
            onDelete={(chip) => this.handleDelete(chip)}
            placeholder="Add another interest"
          </ChipInput>
        </Paper>*/}
      </div>
    )
  }
}

export default withStyles(styles)(Interests)

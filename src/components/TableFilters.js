import React, { Component } from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root:{
    marginLeft: 60
  },
  chip:{
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#a7cee2',
    fontWeight: 'bold'
  }
})

class TableFilters extends Component {
  static defaultProps = {
    labels: []
  }

  constructor(props) {
    super(props)
    this.state = {
      labels: this.props.labels
    }
  }



  render() {
    const {classes} = this.props
    return(
      <div className={classes.root}>
        {this.state.labels.map(label => {
          return(
            <Tooltip key={label} title={label} enterDelay={500} leaveDelay={200}>
              <Chip
                className={classes.chip}
                key={label}
                label={label}
                color='primary'
                onDelete={this.props.labelDelete(label)}
              />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(TableFilters)

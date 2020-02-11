import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chip:{
    borderRadius: 5,
    margin: 5
  }
})

class InterestsCell extends Component{

  constructor(props){
    super(props)
    this.state={
      interests: this.props.interests
    }
  }

  render(){
    const {classes}=this.props
    return(
      <div>
        {this.state.interests.map(interest => {
          return(
            <Tooltip key={interest.id} title={interest.text} enterDelay={500} leaveDelay={200}>
              <Chip
                className={classes.chip}
                key={interest.id}
                label={interest.text}
                value={interest.text}
                color='primary'
                onClick={this.props.labelClick}
              />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(InterestsCell)

import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'

class InterestsCell extends Component{

  constructor(props){
    super(props)
    this.state={
      interests: this.props.interests
    }
  }

  render(){
    return(
      <div>
        {this.state.interests.map(interest => {
          return(
            <Tooltip title={interest.text} enterDelay={500} leaveDelay={200}>
              <Chip
                key={interest.id}
                label={interest.text}
                color='primary'
              />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

export default InterestsCell

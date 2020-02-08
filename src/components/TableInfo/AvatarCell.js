import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

let red = '#f44336'
  , yellow = '#fbc02d'
  , green = '#4caf50'

const coloredBadeStyle = color => {
  return (theme => ({
    badge: {
      backgroundColor: color,
    },
  }))
}

const RedBadge = withStyles(
  coloredBadeStyle(red)
)(Badge);

const YellowBadge = withStyles(
  coloredBadeStyle(yellow)
)(Badge);

const GreenBadge = withStyles(
  coloredBadeStyle(green)
)(Badge);

class AvatarCell extends Component{

  constructor(props){
    super(props)
    this.state={
      reviews: this.props.reviews,
      avatar: this.props.avatar
    }
  }

  render(){
    let revs=0
    for (const review of this.state.reviews) {
      if(!review.dateCompleted && !review.declined){
        revs=revs+1
      }
    }

    let ColoredBadge
    if(revs===0){
      ColoredBadge = GreenBadge
    } else if(revs>0 && revs<3){
      ColoredBadge = YellowBadge
    } else {
      ColoredBadge = RedBadge
    }

    return(
      <HtmlTooltip title={<div>{revs} reviews pending</div>}>
        <ColoredBadge
          variant="dot"
          showZero
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <img src={this.state.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
        </ColoredBadge>
      </HtmlTooltip>
    )
  }
}

export { AvatarCell as default, GreenBadge, RedBadge, YellowBadge }

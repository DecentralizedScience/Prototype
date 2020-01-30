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

const RedBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#f44336',
    color: "white"
  },
}))(Badge);

const YellowBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#fbc02d',
    color: "black"
  },
}))(Badge);

const GreenBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#4caf50',
    color: "white"
  },
}))(Badge);


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
    this.state.reviews.map(review => {
      if(review.dateCompleted==undefined && review.declined==0){
        revs=revs+1
      }
    })
    if(revs==0){
      return(
        <HtmlTooltip title={<div>{revs} reviews pending</div>}>
          <GreenBadge
            variant="dot"
            showZero
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <img src={this.state.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
          </GreenBadge>
        </HtmlTooltip>
      )
    } else if(revs>0 && revs<3){
      return(
        <HtmlTooltip title={<div>{revs} reviews pending</div>}>
          <YellowBadge
            variant="dot"
            showZero
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <img src={this.state.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
          </YellowBadge>
        </HtmlTooltip>
      )
    } else {
      return(
        <HtmlTooltip title={<div>{revs} reviews pending</div>}>
          <RedBadge
            variant="dot"
            showZero
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <img src={this.state.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
          </RedBadge>
        </HtmlTooltip>
      )
    }
  }
}

export default AvatarCell

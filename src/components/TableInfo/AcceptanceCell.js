import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
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

class AcceptanceCell extends Component {

  constructor(props){
    super(props)
    this.state={
      accept: this.props.accept,
      reviews: this.props.reviews
    }
  }


  calculateAcceptance = (reviews) => {
    let accept=0, minorChanges=0, majorChanges=0, reject=0, total=0
    reviews.map(review => {
      if(review.recommendation==1){
        accept++
      } else if(review.recommendation==2){
        minorChanges++
      } else if(review.recommendation==3){
        majorChanges++
      } else if(review.recommendation>3){
        reject++
      }

      if(review.recommendation>0)
      total++
    })

    //Round to two decimals
    let percentage = Math.round(((((accept+minorChanges+majorChanges/2)/total)*100)+ Number.EPSILON)*100)/100

    return [accept, minorChanges, majorChanges, reject, total, percentage]
  };


  render() {
    let accept, minorChanges, majorChanges, reject, total, percentage
    let acceptance = this.calculateAcceptance(this.state.reviews)

    accept = acceptance[0]
    minorChanges = acceptance[1]
    majorChanges = acceptance[2]
    reject = acceptance[3]
    total = acceptance[4]
    percentage = acceptance[5]

    return(
      <HtmlTooltip
        title={
          <React.Fragment>
            <img src={require('../../assets/stats_long.png')} alt="Graph"/>
          </React.Fragment>
        }
        interactive
      >
        <Button
          startIcon={<Icon>thumb_up</Icon>}
        >
          {percentage}%
        </Button>
      </HtmlTooltip>
    )
  }
}

export default AcceptanceCell

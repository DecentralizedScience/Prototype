import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
import { Pie } from '@nivo/pie'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const MyResponsivePie = ({ data }) => (
  <Pie
    data={data}
    height={400}
    width={400}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: 'accent' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [ ['darker', 0.2 ] ] }}
    enableRadialLabels={false}
    radialLabelsSkipAngle={10}
    radialLabelsTextOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: 'accept'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'minorChanges'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'majorChanges'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'reject'
        },
        id: 'dots'
      }
    ]}
    legends={[
      {
        anchor: 'bottom',
        direction: 'column',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        symbolSize: 13,
        symbolShape: 'square',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000'
            }
          }
        ]
      }
    ]}
  />
)


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

    const accData=[
      {
        "id": "Accept",
        "label": "accept",
        "value": accept,
        "color": "hs1(125, 70%, 50%)"
      },
      {
        "id": "Minor Changes",
        "label": "minorChanges",
        "value": minorChanges,
        "color": "hs1(355, 70%, 50%)"
      },
      {
        "id": "Major Changes",
        "label": "majorChanges",
        "value": majorChanges,
        "color": "hs1(217, 70%, 50%)"
      },
      {
        "id": "Reject",
        "label": "reject",
        "value": reject,
        "color": "hs1(186, 70%, 50%)"
      }
    ]

    return(
      <HtmlTooltip
        title={
          <React.Fragment>
            <MyResponsivePie data={accData}/>
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

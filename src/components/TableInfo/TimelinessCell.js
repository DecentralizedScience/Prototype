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
          id: 'onTime'
        },
        id: 'lines'
      },
      {
        match: {
          id: 'late'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'declined'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'never'
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


class TimelinessCell extends Component{

  constructor(props){
    super(props)
    this.state={
      reviews: props.reviews
    }
  }

  calculateTimeliness = (reviews) => {
    let declined=0, onTime=0, late=0, never=0, total=0
    reviews.map(review => {
      if(review.declined){
        declined++
      } else if(review.dateCompleted==" " || review.dateCompleted==undefined){
        never++
      } else if(new Date(review.dateCompleted)<=new Date(review.dateDue)){
        onTime++
      } else if(new Date(review.dateCompleted)>new Date(review.dateDue)){
        late++
      }
      total++
    })

    //Round to two decimals
    let percentage = Math.round(((((onTime+declined+late/2)/total)*100)+ Number.EPSILON)*100)/100

    return [declined, onTime, late, never, total, percentage]
  };


  render(){
    let declined, onTime, late, never, total, percentage
    let timeliness = this.calculateTimeliness(this.state.reviews)

    declined = timeliness[0]
    onTime = timeliness[1]
    late = timeliness[2]
    never = timeliness[3]
    total = timeliness[4]
    percentage = timeliness[5]

    const timeData=[
      {
        "id": "On time",
        "label": "onTime",
        "value": onTime,
        "color": "hs1(125, 70%, 50%)"
      },
      {
        "id": "Late",
        "label": "late",
        "value": late,
        "color": "hs1(355, 70%, 50%)"
      },
      {
        "id": "Declined",
        "label": "declined",
        "value": declined,
        "color": "hs1(217, 70%, 50%)"
      },
      {
        "id": "Never answered",
        "label": "never",
        "value": never,
        "color": "hs1(186, 70%, 50%)"
      }
    ]

    return(
      <HtmlTooltip
        title={
          <React.Fragment>
            <MyResponsivePie data={timeData}/>
          </React.Fragment>
        }
        interactive
      >
        <Button
          startIcon={<Icon>alarm</Icon>}
        >
          {percentage}%
        </Button>
      </HtmlTooltip>
    )
  }
}

export default TimelinessCell

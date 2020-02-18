import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Pie } from '@nivo/pie'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: '2px solid #dadde9',
  },
}))(Tooltip);

const styles = theme => ({
  typography: {
    color: "#374784",
    marginTop: 20
  }
})

const MyResponsivePie = ({ data }) => (
  <Pie
    data={data}
    height={400}
    width={300}
    margin={{ top: 10, right: 30, bottom: 100, left: 30 }}
    innerRadius={0.55}
    padAngle={0.7}
    cornerRadius={3}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [ ['brighter', 0.2 ] ] }}
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
    slicesLabelsTextColor={d => d.textColor}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    colors={d => d.color}
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
        translateY: 75,
        translateX: -10,
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
    theme={{
      legends: {
        text: {
          fontSize: 14,
        }
      }
    }}
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
    for (const review of reviews) {
      if(review.declined){
        declined++
      } else if(!review.dateCompleted){
        never++
      } else if(new Date(review.dateCompleted)<=new Date(review.dateDue)){
        onTime++
      } else if(new Date(review.dateCompleted)>new Date(review.dateDue)){
        late++
      }
      total++
    }

    //Round to two decimals
    let percentage = Math.round(((((onTime+declined+late/2)/total)*100)+ Number.EPSILON)*100)/100

    return [declined, onTime, late, never, total, percentage]
  };


  render(){
    const {classes} = this.props

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
        "color": '#4caf50',
        "textColor": "#ffffff"
      },
      {
        "id": "Late",
        "label": "late",
        "value": late,
        "color": "#a7cee2",
        "textColor": "#ffffff"
      },
      {
        "id": "Declined",
        "label": "declined",
        "value": declined,
        "color": "#f3eccf",
        "textColor": "#333333"
      },
      {
        "id": "Never answered",
        "label": "never",
        "value": never,
        "color": "#ef696a",
        "textColor": "#ffffff"
      }
    ]

    if(total===0){
      return(
        <Tooltip title="No information available">
          <span>
            <Button
              startIcon={<Icon>alarm</Icon>}
              disabled
            >
              -%
            </Button>
          </span>
        </Tooltip>
      )
    } else {
      return(
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography variant='h6' align='center' className={classes.typography}>
                TIMELINESS
              </Typography>
              <MyResponsivePie data={timeData}/>
            </React.Fragment>
          }
          interactive
        >
          <Button
            style={{
              color: "#374784"
            }}
            startIcon={<Icon>alarm</Icon>}
          >
            {percentage}%
          </Button>
        </HtmlTooltip>
      )
    }

  }
}

export default withStyles(styles)(TimelinessCell)

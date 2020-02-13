import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
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
    for (const review of reviews) {
       switch(review.recommendation) {
         case 1:
          accept++
          break
         case 2:
          minorChanges++
          break
        case 3:
          majorChanges++
          break
        default:
          if (review.recommendation > 3)
          reject++
          break
      }

      if(review.recommendation>0)
      total++
    }
    //Round to two decimals
    let percentage = Math.round(((((accept+minorChanges+majorChanges/2)/total)*100)+ Number.EPSILON)*100)/100

    return [accept, minorChanges, majorChanges, reject, total, percentage]
  };


  render() {
    const {classes} = this.props

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
        "color": "#374784",
        "textColor": "#ffffff"
      },
      {
        "id": "Minor Changes",
        "label": "minorChanges",
        "value": minorChanges,
        "color": "#a7cee2",
        "textColor": "#ffffff"
      },
      {
        "id": "Major Changes",
        "label": "majorChanges",
        "value": majorChanges,
        "color": "#f3eccf",
        "textColor": "#333333"
      },
      {
        "id": "Reject",
        "label": "reject",
        "value": reject,
        "color": "#ef696a",
        "textColor": "#ffffff"
      }
    ]

    if (total===0){
      return(
        <Tooltip title="No information available">
          <span>
            <Button
              startIcon={<ThumbUpOutlinedIcon />}
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
                ACCEPTANCE
              </Typography>
              <MyResponsivePie data={accData}/>
            </React.Fragment>
          }
          interactive
        >
          <Button
            style={{
              color: "#374784"
            }}
            startIcon={<ThumbUpOutlinedIcon />}
          >
            {percentage}%
          </Button>
        </HtmlTooltip>
      )
    }

  }
}

export default withStyles(styles)(AcceptanceCell)

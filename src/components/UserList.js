import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CloseIcon from '@material-ui/icons/Close'
import MailIcon from '@material-ui/icons/Mail';

import { Chip, Tooltip, Button, Icon, IconButton } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { red, green, yellow } from '@material-ui/core/colors'
import Badge from '@material-ui/core/Badge'
import { Box } from '@material-ui/core'

import MaterialTable, { MTableToolbar } from "material-table";

import gravatar from 'gravatar'

import { ResponsivePie, Pie } from '@nivo/pie'

import * as xss from 'xss';

const avatarUrl='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'

const scholarSearch='https://scholar.google.es/scholar?hl=es&as_sdt=0%2C5&q='

const USERS_QUERY = gql`
  {
    users {
      id
      name
      surname
      email
      url
      interests {
        id
        text
      }
      reviews {
        id
        dateAssigned
        dateCompleted
        dateDue
        declined
        quality
        recommendation
        reviewComments {
          id
          text
        }
        submission {
          keywords {
            keywords
          }
          title {
            text
          }
          abstract {
            text
          }
          doi {
            url
          }
        }
      }
    }
  }
`


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


class UserList extends Component {

  render(){

    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {

          const [open, setOpen] = React.useState(false)

          if (loading) return <div>Fetching</div>
          if (error){
            console.error(error)
            return <div>{error}</div>
          }

          const authorsToRender = data.users

          const handleClick = () => {
            setOpen(true)
          };

          const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
            if (reason === 'clickaway') {
              return;
            }

            setOpen(false);
          };

          const calculateTimeliness = (reviews) => {
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

          return (

            <MaterialTable
              title=""
              columns={[
                { title: '', field: 'avatar', render: rowData => {
                  let revs=0
                  rowData.reviews.map(review => {
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
                          <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
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
                          <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
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
                          <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
                        </RedBadge>
                      </HtmlTooltip>
                    )
                  }
                },
                  sorting: false,
                  cellStyle: {
                    width: "50px"
                  }
                },
                { title: 'NAME', field: 'name',
                  render: rowData => {
                    let web
                    if (rowData.url=='' || rowData.url==undefined) {
                      web = scholarSearch+rowData.name.split(' ').join('+')
                    } else {
                      web = rowData.url
                    }
                    return (
                      <Typography>
                        <Link href={web} target="_blank">
                          {rowData.name}
                        </Link>
                      </Typography>
                    )
                  },
                  cellStyle: {
                    width: "300px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  width: "300px"
                },
                { title: 'INTERESTS',
                  field: 'interests',
                  customFilterAndSearch: (term, rowData) => {
                    let inputTerms = term.split(' ');
                    let found=true;
                    inputTerms.map(term => {
                       found = found && rowData.interests.find(interest => interest.text.toLowerCase().includes(term.toLowerCase()))!=undefined
                    })
                    return found
                  },
                  render: rowData =>
                  <div>
                    {rowData.interests.map(interest => {
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
                  </div>,
                  headerStyle: {
                    fontSize: "12px",
                  }
                },
                {
                  title: 'TIMELINESS', field: 'time', render: rowData =>{
                    let declined, onTime, late, never, total, percentage
                    let timeliness = calculateTimeliness(rowData.reviews)

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
                  },
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  customSort: (a, b) => calculateTimeliness(a.reviews)[5] - calculateTimeliness(b.reviews)[5]
                },
                {
                  title: 'ACCEPTANCE', field: 'accept', render: rowData =>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <img src={require('../assets/stats_long.png')} alt="Graph"/>
                      </React.Fragment>
                    }
                    interactive
                  >
                    <Button
                      startIcon={<Icon>thumb_up</Icon>}
                    >
                      {rowData.accept}%
                    </Button>
                  </HtmlTooltip>,
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  }
                },
                {
                  title: 'RATING', field: 'rating', render: rowData => {
                    let sum=0, num=0
                    rowData.reviews.map(review => {
                      if(review.quality!=undefined){
                        sum=sum+review.quality
                        num++
                      }
                    })
                    if(num==0){
                      return(
                        <Tooltip title="No information available">
                          <span>
                            <Button
                              startIcon={<Icon>star_rate</Icon>}
                              disabled
                            >
                              -/5
                            </Button>
                          </span>
                        </Tooltip>
                      )
                    } else {
                      return(
                        <Button
                          startIcon={<Icon>star_rate</Icon>}
                        >
                          {sum/num}/5
                        </Button>
                      )
                    }
                  },
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  }
                },
                { title: 'E-MAIL', field: 'email',
                  render: rowData =>
                  <div>
                    <CopyToClipboard text={rowData.email}
                      onCopy={() => this.setState({copied: true})}>
                      <IconButton
                        aria-label="mail"
                        onClick={handleClick}
                      >
                        <MailIcon style={{ color: "#0285BB" }}/>
                      </IconButton>
                    </CopyToClipboard>
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      ContentProps={{
                        'aria-describedby': 'message-id',
                      }}
                      message={<span id="message-id"><Icon>mail</Icon> Email copied to clipboard</span>}
                      action={[
                        <IconButton
                          key="close"
                          aria-label="close"
                          color="inherit"
                          onClick={handleClose}
                        >
                          <CloseIcon />
                        </IconButton>
                    ]}
                    />
                  </div>,
                  cellStyle: {
                    width: "70px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  }
                }
              ]}
              data={
                authorsToRender.map(user =>{
                  return({
                    avatar: gravatar.url(user.email, {d: 'identicon'}),
                    email: user.email,
                    url: user.url,
                    name: user.name + " " + user.surname,
                    first_name: user.name,
                    surname: user.surname,
                    interests: user.interests.map(interest =>{
                      return({
                        id: interest.id,
                        text: interest.text
                      })
                    }),
                    time: 80,
                    accept: 45,
                    rating: 3.8,
                    keywords: user.reviews.map(review => review.submission.keywords.keywords).join(' '),
                    reviews: user.reviews.map(review =>{
                      return({
                        id: review.id,
                        dateAssigned: review.dateAssigned,
                        dateCompleted: review.dateCompleted,
                        dateDue: review.dateDue,
                        declined: review.declined,
                        quality: review.quality,
                        recommendation: review.recommendation,
                        reviewComments: review.reviewComments,
                        submission: review.submission,
                        // .map(submission =>{
                        //   return({
                        //     title: submission.title.map(title => {
                        //       return {
                        //         text: title.text
                        //       }
                        //     }),
                        //     abstract: submission.abstract.map(abstract => {
                        //       return {
                        //         text: abstract.text
                        //       }
                        //     }),
                        //     doi: submission.title.map(doi => {
                        //       return {
                        //         url: doi.url
                        //       }
                        //     })
                        //  })
                      //  }),
                      })
                    })
                  })
                })
              }
              detailPanel={
                //Details for debugging
                rowData => {
                  let declined=0, onTime=0, late=0, never=0, total=0, qqqqq=0
                  rowData.reviews.map(review =>{
                    if(review.declined){
                      declined++
                    } else if(review.dateCompleted==" " || review.dateCompleted==undefined){
                      never++
                    } else if(new Date(review.dateCompleted)<=new Date(review.dateDue)){
                      onTime++
                    } else if(new Date(review.dateCompleted)>new Date(review.dateDue)){
                      late++
                    } else {
                      qqqqq++
                    }
                    total++
                  })

                  let sumQuality=0, numQuality=0
                  rowData.reviews.map(review => {
                    if(review.quality!=undefined){
                      sumQuality=sumQuality+review.quality
                      numQuality++
                    }
                  })

                  return(
                    <div>
                      {rowData.keywords}
                      <p>Reviews</p>
                      {rowData.reviews.map(review => {
                        return(
                          <p id={review.id}>Assigned: {review.dateAssigned}       Completed: {review.dateCompleted}       Due: {review.dateDue}       Declined: {review.declined}       Quality: {review.quality}<br />
                          <div dangerouslySetInnerHTML={{__html: (review.reviewComments[0]) ? '<h3> Review of ' + xss('<em>' + review.submission.title.text + '</em>') + ((review.submission.doi !== null)?
                            '<a target="_blank" rel="noopener noreferrer" href="https://doi.org/' + xss(review.submission.doi.url) +  '"> doi </a>' : '') + ' </h3>' + xss(review.reviewComments[0].text) : ''}}></div>
                          
                          </p>
                        )
                      })}
                      <p></p>
                      <p>TIMELINESS</p>
                      <p>On time: {onTime}</p>
                      <p>Declined: {declined}</p>
                      <p>Late: {late}</p>
                      <p>Never: {never}</p>
                      <p>Total: {total}</p>
                      <p>------------------------</p>
                      <p>QUALITY</p>
                      <p>Total: {sumQuality}</p>
                      <p>Number of evaluations: {numQuality}</p>
                    </div>
                  )
                }
              }
              localization={{
                toolbar: {
                  searchPlaceholder: 'Search by interest or name'
                }
              }}
              options={{
                draggable: false,
                sort: true
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default UserList

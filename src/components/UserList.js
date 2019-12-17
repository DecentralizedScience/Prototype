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

import MaterialTable, { MTableToolbar } from "material-table";

import gravatar from 'gravatar'


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
        submissionKeywords {
          keywords
        }
      }
    }
  }
`


const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
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

class UserList2 extends Component {

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
                    return(
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <img src={require('../assets/stats_long.png')} alt="Graph"/>
                          </React.Fragment>
                        }
                      >
                        <Button
                          startIcon={<Icon>alarm</Icon>}
                        >
                          {/*Round to two decimals*/}
                          {Math.round((((onTime/total)*100)+ Number.EPSILON)*100)/100}%
                        </Button>
                      </HtmlTooltip>
                    )
                  },
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  }
                },
                {
                  title: 'ACCEPTANCE', field: 'accept', render: rowData =>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <img src={require('../assets/stats_long.png')} alt="Graph"/>
                      </React.Fragment>
                    }
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
                        <Button
                          startIcon={<Icon>star_rate</Icon>}
                          disabled
                        >
                          -/5
                        </Button>
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
                    keywords: user.reviews.map(review => review.submissionKeywords.keywords).join(' '),
                    reviews: user.reviews.map(review =>{
                      return({
                        id: review.id,
                        dateAssigned: review.dateAssigned,
                        dateCompleted: review.dateCompleted,
                        dateDue: review.dateDue,
                        declined: review.declined,
                        quality: review.quality
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
                          <p id={review.id}>Assigned: {review.dateAssigned}       Completed: {review.dateCompleted}       Due: {review.dateDue}       Declined: {review.declined}       Quality: {review.quality}</p>
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
                draggable: false
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default UserList2

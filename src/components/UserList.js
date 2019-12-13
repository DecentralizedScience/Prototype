import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CloseIcon from '@material-ui/icons/Close'
import MailIcon from '@material-ui/icons/Mail'

import { Chip, Tooltip, Button, Icon, IconButton } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

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
                { title: '', field: 'avatar', render: rowData =>
                  <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>,
                  sorting: false
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
                  }
                },
                { title: 'e-mail', field: 'email',
                  render: rowData =>
                  <div>
                    <CopyToClipboard text={rowData.email}
                      onCopy={() => this.setState({copied: true})}>
                      <IconButton
                        aria-label="mail"
                        onClick={handleClick}
                      >
                        <Icon>mail</Icon>
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
                  </div>
                },
                { title: 'Interests',
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
                  </div>
                },
                {
                  title: 'Timeliness', field: 'time', render: rowData =>
                  <Button
                    startIcon={<Icon>alarm</Icon>}
                  >
                    {rowData.time}%
                  </Button>
                },
                {
                  title: 'Acceptance', field: 'accept', render: rowData =>
                  <Button
                    startIcon={<Icon>thumb_up</Icon>}
                  >
                    {rowData.accept}%
                  </Button>
                },
                {
                  title: 'Rating', field: 'rating', render: rowData =>
                  <Button
                    startIcon={<Icon>star_rate</Icon>}
                  >
                    {rowData.rating}/5
                  </Button>
                },
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
                    rating: 3.8
                  })
                })
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

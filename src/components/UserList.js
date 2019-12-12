import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Chip, Tooltip, Button, Icon, IconButton } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import MaterialTable, { MTableToolbar } from "material-table";

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
          if (loading) return <div>Fetching</div>
          if (error){
            console.error(error)
            return <div>{error}</div>
          }

          const authorsToRender = data.users
          console.log(data.users)

          return (
            <MaterialTable
              title=""
              columns={[
              { title: 'e-mail', field: 'email',
                render: rowData =>
                <div>
                  <CopyToClipboard text={rowData.email}
                    onCopy={() => this.setState({copied: true})}>
                    <IconButton
                      aria-label="mail"
                      onClick={() => alert(rowData.email + " coped to clipboard")}
                    >
                      <Icon>mail</Icon>
                    </IconButton>
                  </CopyToClipboard>
                </div>
              },
                { title: '', field: 'avatar', render: rowData =>
                  <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>,
                  sorting: false
                },
                { title: 'Name', field: 'name',
                  render: rowData => {
                    let web
                    if (rowData.url=='' || rowData.url==undefined) {
                      web = scholarSearch+rowData.name.split(' ').join('+')
                    } else {
                      web = rowData.url
                    }
                    return (
                      <Typography>
                        <Link href={web}>
                          {rowData.name}
                        </Link>
                      </Typography>
                    )
                  }
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
                    avatar: avatarUrl,
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

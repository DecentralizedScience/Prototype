import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Chip, Tooltip, Button, Icon } from '@material-ui/core'

import MaterialTable from "material-table";

const avatarUrl='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'

const USERS_QUERY = gql`
  {
    users {
      id
      name
      surname
      interests {
        id
        text
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

          return (
            <MaterialTable
              title="Recommended Reviewers"
              columns={[
                { title: '', field: 'avatar', render: rowData =>
                  <img src={rowData.avatar} alt="avatar" style={{width: 40, borderRadius: '50%'}}/>
                },
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Interests',
                  field: 'interests',
                  customFilterAndSearch: (term, rowData) => {
                    return (rowData.interests.find(interest => interest.text.includes(term))!=undefined)
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
                    name: user.name,
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
              actions={[
                {
                  //icon: 'send',
                  icon: 'rate_review',
                  tooltip: 'Request review',
                  onClick: (event, rowData) => alert("You requested a review from " + rowData.name)
                }
              ]}
              options={{
                filtering: true
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default UserList2

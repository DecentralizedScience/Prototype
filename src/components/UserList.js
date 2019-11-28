import React, { Component } from 'react'
import User from './User.js'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
      reviews{
        id
        dateAssigned
      }
    }
  }
`

class UserList extends Component {
  render() {
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
            <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Surname</TableCell>
                    <TableCell align="center">Interests</TableCell>
                    <TableCell align="center">Statistics</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {authorsToRender.map(user => (
                    <User key={user.id} user={user}/>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )
        }}
      </Query>
    )
  }
}

export default UserList

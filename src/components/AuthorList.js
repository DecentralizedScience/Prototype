import React, { Component } from 'react'
import Author from './Author.js'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AUTHORS_QUERY = gql`
  {
    authors {
      author_id
      country
      email
      firstName
      includeInBrowse
      lastName
      middleName
      primaryContact
      seq
      submissionId
      suffix
      url
      userGroupId
    }
  }
`

class AuthorList extends Component {
  render() {
    return (
      <Query query={AUTHORS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error){
            console.error(error)
            return <div>{error}</div>
          }

          const authorsToRender = data.authors

          return (
            <Paper>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Interests</TableCell>
                    <TableCell align="center">Statistics</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {authorsToRender.map(author => (
                    <Author key={author.author_id} author={author}/>
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

export default AuthorList

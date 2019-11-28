import React from 'react'
import User from './User.js'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
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
    }
  }
`

export default function UserList() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }

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
                  {authorsToRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user =>
                    <User key={user.id} user={user}/>
                  )}
                  {/*{authorsToRender.map(user => (
                    <User key={user.id} user={user}/>
                  ))}*/}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={authorsToRender.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          )
        }}
      </Query>
    )
}

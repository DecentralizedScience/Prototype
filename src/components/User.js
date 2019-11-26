import React, { Component } from 'react'

import { TableRow, TableCell, Chip } from '@material-ui/core'
import Stats from './Stats.js'


class User extends Component {
  render() {

    const interestsToRender = this.props.user.interests

    return (
      <TableRow key={this.props.user.id}>
        <TableCell component="th" scope="row">
          {this.props.user.id}
        </TableCell>
        <TableCell align="center">
          {this.props.user.name}
        </TableCell>
        <TableCell align="center">
          {this.props.user.surname}
        </TableCell>
        <TableCell align="center">
          {interestsToRender.map(interest => {
            return(
              <Chip
                key={interest.id}
                label={interest.text}
                color='primary'
              />
            )
          })}
        </TableCell>
        <TableCell align="center">
          <Stats/>
        </TableCell>
      </TableRow>
    )
  }
}

export default User

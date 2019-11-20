import React, { Component } from 'react'

import { TableRow, TableCell, Chip } from '@material-ui/core'
import Stats from './Stats.js'


class Author extends Component {
  render() {
    const chipData = [
        { key: 0, label: 'Blockchain' },
        { key: 1, label: 'Decentralization' },
        { key: 2, label: 'Governance' }
    ];
    return (
      <TableRow key={this.props.author.author_id}>
        <TableCell component="th" scope="row">
          {this.props.author.author_id}
        </TableCell>
        <TableCell align="center">
          {this.props.author.firstName}
        </TableCell>
        <TableCell align="center">
          {chipData.map(data => {
            return(
              <Chip
                key={data.key}
                label={data.label}
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

export default Author

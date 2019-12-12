import React, { Component } from 'react'

import { Typography } from '@material-ui/core'

class Header extends Component {
  render() {
    return(
      <Typography variant='h4' align='center' gutterBottom>
        Recommended Reviewers
      </Typography>
    )
  }
}

export default Header

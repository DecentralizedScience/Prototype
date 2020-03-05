import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const scholarSearch='https://scholar.google.es/scholar?hl=es&as_sdt=0%2C5&q='

class NameCell extends Component {

  constructor(props){
    super(props)
    this.state={
      name: props.name,
      url: props.url
    }
  }

  render(){
    let web
    web = scholarSearch+this.state.name.split(' ').join('+')
    return (
      <Typography>
        <Link href={web} target="_blank">
          {this.state.name}
        </Link>
      </Typography>
    )
  }
}

export default NameCell

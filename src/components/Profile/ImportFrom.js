import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

class ImportFrom extends Component {

  render(){
    return(
      <div>
        <Typography style={{color: '#727474'}}>
          Import from:
          <Button variant="outlined" style={{margin:20, borderColor:"#374784"}} href="https://publons.com/" target="_blank">
            <Icon style={{width: 100, height: 40}}>
              <img src={require("../../assets/publons.png")} alt="Publons logo" width="100" />
            </Icon>
          </Button>
          <Button variant="outlined" style={{margin:20, borderColor:"#ef696a"}}>
            <Icon style={{width: 100, height: 40}}>
              <img src={require("../../assets/f1000.png")} alt="Publons logo" width="100" />
            </Icon>
          </Button>
        </Typography>
      </div>
    )
  }
}

export default ImportFrom

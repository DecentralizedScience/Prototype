import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

class EmailCell extends Component {

  constructor(props){
    super(props);
    this.state={
      email: this.props.email,
      open: false
    }
  }

  setOpen(val){
    this.setState({open: val})
  }

  handleClick = () => {
    this.setOpen(true)
  }

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setOpen(false);
  }

  render() {
    return(
      <div>
        <CopyToClipboard text={this.state.email}
          onCopy={() => this.setState({copied: true})}>
          <IconButton
            aria-label="mail"
            onClick={this.handleClick}
          >
            <MailOutlineIcon style={{ color: "#374784" }}/>
          </IconButton>
        </CopyToClipboard>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"><Icon>mail</Icon> Email copied to clipboard</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
        ]}
        />
      </div>
    )
  }
}

export default EmailCell

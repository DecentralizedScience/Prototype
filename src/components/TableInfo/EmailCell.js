import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
//import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LaptopIcon from '@material-ui/icons/LaptopMac'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    margin:0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    paddingBottom: 50
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

class EmailCell extends Component {

  constructor(props){
    super(props);
    this.state={
      email: this.props.email,
      name: this.props.name,
      open: false,
      dialogOpen:false
    }
  }

  setDialogOpen(val){
    this.setState({dialogOpen: val})
  }

  handleDialogClickOpen = () => {
    this.setDialogOpen(true)
  }

  handleDialogClose = () => {
    this.setDialogOpen(false)
  }

  //A snackbar is shown at the end of the process. This code will come in handy
  /*setOpen(val){
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
  }*/

  render() {
    const {classes} = this.props
    return(
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleDialogClickOpen}
          style={{fontSize:"12px"}}
        >
          REQUEST A REVIEW
        </Button>
        <Dialog
          onClose={this.handleDialogClose}
          aria-labelledby="request-review-dialog"
          open={this.state.dialogOpen}
        >
          <DialogTitle
            id="request-review-dialog"
            onClose={this.handleDialogClose}
          >
            Modal title
          </DialogTitle>
          <DialogContent
            className={classes.dialog}
          >
            <Grid container spacing={2} alignItems="center" justify="center" direction="column" style={{paddingLeft: 70, paddingRight:70}}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h4" gutterBottom>
                  Request a review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <LaptopIcon style={{fontSize: 80, color: "#A7CEE2"}} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography gutterBottom align="center">
                  Are you sure you want to send your paper to {this.state.name}?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={()=>{}}
                  style={{fontSize:"12px", marginRight: 10, paddingLeft:35, paddingRight: 35}}
                >
                  NO, THANKS
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>{}}
                  style={{fontSize:"12px", marginLeft: 10}}
                >
                  REQUEST A REVIEW
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        {/*A snackbar is shown at the end of the process. This code will come in handy*/}
        {/*<Snackbar
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
        />*/}
      </div>
    )
  }
}

export default withStyles(styles)(EmailCell)

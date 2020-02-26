import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
//import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LaptopIcon from '@material-ui/icons/LaptopMac'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Snackbar from '@material-ui/core/Snackbar'

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
    paddingBottom: 50,
    width: 560,
    height: 280
  },
  dialogText: {
    paddingBottom: 15,
    marginTop: -15,
    color: '#727474'
  },
  errorTitle: {
    color: "#E16364"
  },
  snackbar: {
    backgroundColor: "#308380"
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
      dialog1Open:false,
      dialog2Open: false,
      dialogFailOpen: false,
      snackbarOpen: false,
      ojsUser: '',
      ojsPassword: ''
    }
  }

  setDialog1Open(val){
    this.setState({dialog1Open: val})
  }

  handleDialog1ClickOpen = () => {
    this.setDialog1Open(true)
  }

  handleDialog1Close = () => {
    this.setDialog1Open(false)
  }

  setDialog2Open(val){
    this.setState({dialog2Open: val})
  }

  handleDialog2ClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialog2Open(true)
  }

  handleDialog2Close = () => {
    this.setDialog2Open(false)
  }

  setDialogFailOpen(val){
    this.setState({dialogFailOpen: val})
  }

  handleDialogFailClickOpen = () => {
    this.setDialog2Open(false)
    this.setDialogFailOpen(true)
  }

  handleDialogFailClose = () => {
    this.setDialogFailOpen(false)
  }

  setSnackbarOpen(val){
    this.setState({snackbarOpen: val})
  }

  handleSnackbarClickOpen = () => {
    this.setDialog2Open(false)
    this.setSnackbarOpen(true)
    console.log("Snackbar")
  }

  handleSnackbarClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setSnackbarOpen(false);
  }

  render() {
    const {classes} = this.props
    return(
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleDialog1ClickOpen}
          style={{fontSize:"12px"}}
        >
          REQUEST A REVIEW
        </Button>

        {/*First dialog*/}
        <Dialog
          onClose={this.handleDialog1Close}
          aria-labelledby="request-review-dialog"
          open={this.state.dialog1Open}
        >
          <DialogTitle
            id="request-review-dialog"
            onClose={this.handleDialog1Close}
          >
            Modal title
          </DialogTitle>
          <DialogContent
            className={classes.dialog}
          >
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12} sm={12}>
                <Typography variant="h4" gutterBottom>
                  Request a review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <LaptopIcon style={{fontSize: 80, color: "#A7CEE2"}} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography gutterBottom align="center" className={classes.dialogText}>
                  Are you sure you want to send your paper to {this.state.name}?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleDialog1Close}
                  style={{fontSize:"12px", marginRight: 10, paddingLeft:35, paddingRight: 35}}
                >
                  NO, THANKS
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleDialog2ClickOpen}
                  style={{fontSize:"12px", marginLeft: 10}}
                >
                  REQUEST A REVIEW
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        {/*Second dialog*/}
        <Dialog
          onClose={this.handleDialog2Close}
          aria-labelledby="request-review-dialog"
          open={this.state.dialog2Open}
        >
          <DialogTitle
            id="request-review-dialog"
            onClose={this.handleDialog2Close}
          >
            Modal title
          </DialogTitle>
          <DialogContent
            className={classes.dialog}
          >
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12} sm={12}>
                <Typography variant="h4" gutterBottom>
                  Request a review
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} style={{marginBottom: -18}}>
                <Typography gutterBottom align="center" className={classes.dialogText}>
                  First, we need your credentials on OJS
                </Typography>
              </Grid>
              <img src={require("../../assets/ojs.png")} alt="OJS logo" width="10%" class="center"/>
              <Grid item xs={12} style={{marginBottom: -15}}>
                <TextField
                  autoComplete="username"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username or email"
                  autoFocus
                  margin="dense"
                  onChange={e => this.setState({ ojsUser: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  margin="dense"
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  style={{marginRight:10}}
                  variant="contained"
                  color="primary"
                  onClick={this.handleSnackbarClickOpen}
                >
                  LOGIN WITH OJS
                </Button>
                <Button
                  style={{marginLeft:10}}
                  variant="contained"
                  color="primary"
                  onClick={this.handleDialogFailClickOpen}
                >
                  WRONG LOGIN
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        {/*Error dialog*/}
        <Dialog
          onClose={this.handleDialogFailClose}
          aria-labelledby="request-review-dialog"
          open={this.state.dialogFailOpen}
        >
          <DialogTitle
            id="request-review-dialog"
            onClose={this.handleDialogFailClose}
          >
            Modal title
          </DialogTitle>
          <DialogContent
            className={classes.dialog}
          >
            <Grid container spacing={2} alignItems="center" justify="center" direction="column" style={{paddingTop: 75}}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h4" gutterBottom className={classes.errorTitle}>
                  Ooops!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} style={{marginBottom: -18}}>
                <Typography gutterBottom align="center" className={classes.dialogText}>
                  Something went wrong
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} style={{marginBottom: -18}}>
                <Typography gutterBottom align="center" className={classes.dialogText}>
                  Have you got a problem?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} style={{marginBottom: -18}}>
                <Typography gutterBottom align="center" className={classes.dialogText}>
                  Please &nbsp;
                  <Link href="/terms-and-conditions">
                    contact us
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        
        {/*Success snackbar*/}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            className: classes.snackbar
          }}
          message="Congratulations! Your review request has been sent"
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

export default withStyles(styles)(EmailCell)

import React, { Component } from 'react'

import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'
import {Button, Typography } from '@material-ui/core'
//import { makeStyles } from '@material-ui/core/styles'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton'
import { CloseIcon } from '@material-ui/icons/Close'


/*const useStyles = makeStyles({
  card: {
    maxwidth: 300,
  },
})*/

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palete.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


//class Stats extends Component {
function Stats() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //render() {
    //const classes = useStyles();

    //const statsData = [];


    return (
      //<Card className={classes.card}>
      <Card>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            alt="Author statistics"
            height="100"
            image={require("../assets/logo.jpg")}
            title="Author statistics"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Author Statistics
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            More
          </Button>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          arial-labelledby="customized-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Detailed Author Statistics
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Here is where the deetailed statistics should be.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onclick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    )
  //}
}

export default Stats

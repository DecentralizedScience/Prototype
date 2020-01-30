import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles'

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

class AcceptanceCell extends Component {

  constructor(props){
    super(props)
    this.state={
      accept: this.props.accept
    }
  }

  render() {
    return(
      <HtmlTooltip
        title={
          <React.Fragment>
            <img src={require('../../assets/stats_long.png')} alt="Graph"/>
          </React.Fragment>
        }
        interactive
      >
        <Button
          startIcon={<Icon>thumb_up</Icon>}
        >
          {this.state.accept}%
        </Button>
      </HtmlTooltip>
    )
  }
}

export default AcceptanceCell

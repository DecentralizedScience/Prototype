import React, { Component } from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'

class TableFilters extends Component {
  static defaultProps = {
    labels: []
  }

  constructor(props) {
    super(props)
    this.state = {
      labels: this.props.labels
    }
  }



  render() {
    return(
      <div>
        {this.state.labels.map(label => {
          return(
            <Tooltip key={label} title={label} enterDelay={500} leaveDelay={200}>
              <Chip
                key={label}
                label={label}
                color='primary'
                onDelete={this.props.labelDelete(label)}
              />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

export default TableFilters

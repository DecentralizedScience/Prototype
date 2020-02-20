import React, { Component } from 'react'
import MaterialTable from 'material-table'
import * as xss from 'xss'

import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { withStyles } from '@material-ui/core/styles'
import DotIcon from '@material-ui/icons/FiberManualRecord'

import Stars from './Stars.js'

const styles = theme => ({
  root: {
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    padding: 20,
    paddingTop: 0
  },
  stars: {
    marginLeft: 40,
    marginRight: 0,
    paddingRight: 0
  }
})

class ReviewsTable extends Component {

  constructor(props){
    super(props);
    this.state = { data: this.props.data }
  }

  recommendationToText(rec){
    switch(rec) {
      case 1:
        return "Accept"
      case 2:
        return "Accept with minor changes"
      case 3:
        return "Major changes"
      case 4:
        return "Reject (Resubmit elsewhere)"
      case 0:
      case null:
        return '\u2014'
      default:
      return "Reject"
    }
  }

  recommendationToColor(rec){
    switch(rec) {
      case 1:
        return <DotIcon style={{color: '#4caf50', fontSize: 'small'}} />
      case 2:
        return <DotIcon style={{color: '#a7cee2', fontSize: 'small'}} />
      case 3:
        return <DotIcon style={{color: '#f3eccf', fontSize: 'small'}} />
      case 4:
        return <DotIcon style={{color: '#ef696a', fontSize: 'small'}}/>
      case 0:
      case null:
        return ""
      default:
        return <DotIcon style={{color: '#ef696a', fontSize: 'small'}}/>
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <MaterialTable
          title="Reviews"
          columns={[
            {
              title: 'ARTICLE REVIEWED', field: 'title',
              render: rowData =>
              {
                if(rowData.submission.doi!==null){
                  return(
                    <div>
                      <h3>
                        <Link href={'https://doi.org/'+rowData.submission.doi.url} target="_blank" >
                          {rowData.submission.title.text}
                        </Link>
                      </h3>
                    </div>
                  )
                } else {
                  return(
                    <div>
                      <h3>
                        {rowData.submission.title.text}
                      </h3>
                    </div>
                  )
                }
              },
              cellStyle: {
                width: "400px",
                verticalAlign: 'top'
              },
              headerStyle: {
                fontSize: "12px",
              }
            },
            { title: 'REVIEW', field: 'text',
              render: rowData =>
                <div>
                  <Box display="flex" className={classes.root}>
                    <Box p={1} flexGrow={1}>
                    </Box>
                    <Box p={1}>
                      Recommendation: {this.recommendationToColor(rowData.recommendation)}{this.recommendationToText(rowData.recommendation)}
                    </Box>
                    <Box p={1} className={classes.stars}>
                      <Stars rating={rowData.quality}/>
                    </Box>
                  </Box>
                  <div
                    dangerouslySetInnerHTML={{__html: (rowData.reviewComments[0]) ? ' </h3>' + xss(rowData.reviewComments[0].text) : ((rowData.recommendation>0) ? '' : '<i>Review pending</i>')}}
                    style={{
                      lineHeight: 1.75
                    }}
                  >
                  </div>
                </div>,
              headerStyle: {
                fontSize: "12px",
              }
            },
            { title: 'RECOMMENDATION', field: 'recommendation',
              render: rowData =>
                <div>
                  {this.recommendationToText(rowData.recommendation)}
                </div>
            }
          ]}
          data={
            this.state.data.reviews.map(review =>{
              return({
                id: review.id,
                dateAssigned: review.dateAssigned,
                dateCompleted: review.dateCompleted,
                dateDue: review.dateDue,
                declined: review.declined,
                quality: review.quality,
                recommendation: review.recommendation,
                reviewComments: review.reviewComments,
                submission: review.submission,
              })
            })
          }
          options={{
            search: false,
            toolbar: false,
            draggable: false
          }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(ReviewsTable)

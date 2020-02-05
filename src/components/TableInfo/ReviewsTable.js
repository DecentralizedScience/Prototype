import React, { Component } from 'react'
import MaterialTable from 'material-table'
import * as xss from 'xss'
import Link from '@material-ui/core/Link'

class ReviewsTable extends Component {

  constructor(props){
    super(props);
    this.state = { data: this.props.data }
  }

  recommendationToText(rec){
    if (rec==1) {
      return "Accept"
    } else if (rec==2) {
      return "Accept with minor changes"
    } else if (rec==3) {
      return "Major changes"
    } else if (rec==4) {
      return "Reject (Resubmit elsewhere)"
    } else if (rec==0 || rec==null) {
      return ""
    } else {
      return "Reject"
    }
  }

  render() {
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
                <div dangerouslySetInnerHTML={{__html: (rowData.reviewComments[0]) ? ' </h3>' + xss(rowData.reviewComments[0].text) : ((rowData.recommendation>0) ? '' : '<i>Review pending</i>')}}></div>,
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

export default ReviewsTable

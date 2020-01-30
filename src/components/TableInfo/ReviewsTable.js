import React, { Component } from 'react'
import MaterialTable from 'material-table'
import * as xss from 'xss'

class ReviewsTable extends Component {

  constructor(props){
    super(props);
    this.state = { data: this.props.data }
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="Reviews"
          columns={[
            {
              title: 'Article reviewed', field: 'title',
              render: rowData =>
              <div dangerouslySetInnerHTML={{__html: (rowData.reviewComments[0]) ? '<h3> Review of ' + xss('<em>' + rowData.submission.title.text + '</em>') + ((rowData.submission.doi !== null)?
                '<a target="_blank" rel="noopener noreferrer" href="https://doi.org/' + xss(rowData.submission.doi.url) +  '"> doi </a>' : '') : ''}}></div>,
              cellStyle: {
                width: "400px",
                verticalAlign: 'top'
              },
            },
            { title: 'Review', field: 'text',
              render: rowData =>
                <div dangerouslySetInnerHTML={{__html: (rowData.reviewComments[0]) ? ' </h3>' + xss(rowData.reviewComments[0].text) : ''}}></div>
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
        />
      </div>
    )
  }
}

export default ReviewsTable

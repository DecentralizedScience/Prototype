import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import MaterialTable from "material-table";

import gravatar from 'gravatar'

import ReviewerDetails from './TableInfo/ReviewerDetails.js';
import EmailCell from './TableInfo/EmailCell.js'
import RatingCell from './TableInfo/RatingCell.js'
import AcceptanceCell from './TableInfo/AcceptanceCell.js'
import TimelinessCell from './TableInfo/TimelinessCell.js'
import InterestsCell from './TableInfo/InterestsCell.js'
import NameCell from './TableInfo/NameCell.js'
import AvatarCell from './TableInfo/AvatarCell.js'


const USERS_QUERY = gql`
  {
    users {
      id
      name
      surname
      email
      url
      interests {
        id
        text
      }
      reviews {
        id
        dateAssigned
        dateCompleted
        dateDue
        declined
        quality
        recommendation
        reviewComments {
          id
          text
        }
        submission {
          keywords {
            keywords
          }
          title {
            text
          }
          abstract {
            text
          }
          doi {
            url
          }
        }
      }
    }
  }
`


class UserList extends Component {

  render(){

    return (
      <Query query={USERS_QUERY}>
        {({ loading, error, data }) => {

          if (loading) return <div>Fetching</div>
          if (error){
            console.error(error)
            return <div>{error}</div>
          }

          const authorsToRender = data.users

          const calculateTimeliness = (reviews) => {
            let declined=0, onTime=0, late=0, never=0, total=0
            reviews.map(review => {
              if(review.declined){
                declined++
              } else if(review.dateCompleted==" " || review.dateCompleted==undefined){
                never++
              } else if(new Date(review.dateCompleted)<=new Date(review.dateDue)){
                onTime++
              } else if(new Date(review.dateCompleted)>new Date(review.dateDue)){
                late++
              }
              total++
            })

            //Round to two decimals
            let percentage = Math.round(((((onTime+declined+late/2)/total)*100)+ Number.EPSILON)*100)/100

            return [declined, onTime, late, never, total, percentage]
          };

          const calculateAcceptance = (reviews) => {
            let accept=0, minorChanges=0, majorChanges=0, reject=0, total=0
            reviews.map(review => {
              if(review.recommendation==1){
                accept++
              } else if(review.recommendation==2){
                minorChanges++
              } else if(review.recommendation==3){
                majorChanges++
              } else if(review.recommendation>3){
                reject++
              }

              if(review.recommendation>0)
              total++
            })

            //Round to two decimals
            let percentage = Math.round(((((accept+minorChanges+majorChanges/2)/total)*100)+ Number.EPSILON)*100)/100

            return [accept, minorChanges, majorChanges, reject, total, percentage]
          };

          const calculateRating = (reviews) => {
            let sum=0, num=0
            reviews.map(review => {
              if(review.quality!=undefined){
                sum=sum+review.quality
                num++
              }
            })

            // Round to two decimals
            let rating
            if(num==0) {
              rating = 0
            } else {
              rating = Math.round(((sum/num)+ Number.EPSILON)*100)/100
            }

            return [num, rating]
          };

          return (

            <MaterialTable
              title="RECOMMENDED REVIEWERS"
              columns={[
                { title: '', field: 'avatar', render: rowData =>
                    <AvatarCell reviews={rowData.reviews} avatar={rowData.avatar} />,
                  sorting: false,
                  cellStyle: {
                    width: "50px"
                  }
                },
                { title: 'NAME', field: 'name',
                  render: rowData =>
                    <NameCell name={rowData.name} url={rowData.url} />,
                  cellStyle: {
                    width: "300px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  width: "300px"
                },
                { title: 'INTERESTS',
                  field: 'interests',
                  customFilterAndSearch: (term, rowData) => {
                    let inputTerms = term.split(' ');
                    let found=true;
                    inputTerms.map(term => {
                       found = found && rowData.interests.find(interest => interest.text.toLowerCase().includes(term.toLowerCase()))!=undefined
                    })
                    return found
                  },
                  render: rowData =>
                  <InterestsCell interests={rowData.interests} />,
                  headerStyle: {
                    fontSize: "12px",
                  },
                  sorting: false
                },
                {
                  title: 'TIMELINESS', field: 'time', render: rowData =>
                    <TimelinessCell reviews={rowData.reviews} />,
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  customSort: (a, b) => calculateTimeliness(a.reviews)[5] - calculateTimeliness(b.reviews)[5]
                },
                {
                  title: 'ACCEPTANCE', field: 'accept', render: rowData =>
                    <AcceptanceCell accept={rowData.accept} reviews={rowData.reviews} />,
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  customSort: (a, b) => calculateAcceptance(a.reviews)[5] - calculateAcceptance(b.reviews)[5]
                },
                {
                  title: 'RATING', field: 'rating', render: rowData =>
                    <RatingCell reviews={rowData.reviews} />,
                  cellStyle: {
                    width: "100px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  customSort: (a, b) => calculateRating(a.reviews)[1] - calculateRating(b.reviews)[1]
                },
                { title: 'E-MAIL', field: 'email',
                  render: rowData =>
                    <EmailCell email={rowData.email} />,
                  cellStyle: {
                    width: "70px"
                  },
                  headerStyle: {
                    fontSize: "12px",
                  },
                  sorting: false
                }
              ]}
              data={
                authorsToRender.map(user =>{
                  return({
                    avatar: gravatar.url(user.email, {d: 'identicon'}),
                    email: user.email,
                    url: user.url,
                    name: user.name + " " + user.surname,
                    first_name: user.name,
                    surname: user.surname,
                    interests: user.interests.map(interest =>{
                      return({
                        id: interest.id,
                        text: interest.text
                      })
                    }),
                    accept: 45,
                    keywords: user.reviews.map(review => review.submission.keywords.keywords).join(' '),
                    reviews: user.reviews.map(review =>{
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
                  })
                })
              }
              detailPanel={
                //Details for debugging
                rowData => {
                  let declined=0, onTime=0, late=0, never=0, total=0, qqqqq=0
                  rowData.reviews.map(review =>{
                    if(review.declined){
                      declined++
                    } else if(review.dateCompleted==" " || review.dateCompleted==undefined){
                      never++
                    } else if(new Date(review.dateCompleted)<=new Date(review.dateDue)){
                      onTime++
                    } else if(new Date(review.dateCompleted)>new Date(review.dateDue)){
                      late++
                    } else {
                      qqqqq++
                    }
                    total++
                  })

                  let sumQuality=0, numQuality=0
                  rowData.reviews.map(review => {
                    if(review.quality!=undefined){
                      sumQuality=sumQuality+review.quality
                      numQuality++
                    }
                  })

                  return(
                    <div>
                      <ReviewerDetails data={rowData}/>

                      {rowData.keywords}
                      <p>Reviews</p>

                      <p></p>
                      <p>TIMELINESS</p>
                      <p>On time: {onTime}</p>
                      <p>Declined: {declined}</p>
                      <p>Late: {late}</p>
                      <p>Never: {never}</p>
                      <p>Total: {total}</p>
                      <p>------------------------</p>
                      <p>QUALITY</p>
                      <p>Total: {sumQuality}</p>
                      <p>Number of evaluations: {numQuality}</p>
                    </div>
                  )
                }
              }
              localization={{
                toolbar: {
                  searchPlaceholder: 'Search by interest or name'
                }
              }}
              options={{
                draggable: false,
                sort: true,
                searchText: this.props.value
              }}
            />
          )
        }}
      </Query>
    )
  }
}

xport { UserList as default, USERS_QUERY as USERS_QUERY}

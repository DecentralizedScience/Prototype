import React, { Component } from 'react'
import Author from './Author.js'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const AUTHORS_QUERY = gql`
  {
    authors {
      author_id
      country
      email
      firstName
      includeInBrowse
      lastName
      middleName
      primaryContact
      seq
      submissionId
      suffix
      url
      userGroupId
    }
  }
`

class AuthorList extends Component {
  render() {
    return (
      <Query query={AUTHORS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error){
            console.error(error)
            return <div>{error}</div>
          }

          const authorsToRender = data.authors

          return (
            <div>
              {authorsToRender.map(author => <Author key={author.author_id} author={author} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default AuthorList

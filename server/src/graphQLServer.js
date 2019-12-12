
import { GraphQLSchema } from 'graphql'
import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql'
import joinMonster from 'join-monster'

import config from './serverConfig.json'

console.log(JSON.stringify(config))

// import knex from 'knex'
var knex = require('knex')({
  client: 'mysql',
  connection: config
});

const { graphql } = require('graphql')
const { GraphQLServer } = require('graphql-yoga')


const User = new GraphQLObjectType({
  name: 'User',
  // Select only reviewers
  sqlTable: '(SELECT * from users WHERE users.user_id IN (SELECT reviewer_id FROM review_assignments))',
  uniqueKey: 'user_id',
  fields: () => ({
    id: {
      type: GraphQLInt,
      sqlColumn: 'user_id'
    },
    name: {
      type: GraphQLString,
      sqlDeps: [ 'first_name', 'middle_name' ],
      resolve: user => {
        const name = `${user.first_name}`
        const middleName = `${user.middle_name}`
        const composed = (middleName === 'null')? name: name + ' ' + middleName
        return composed
      }
    },
    surname: {
      type: GraphQLString,
      sqlColumn: 'last_name'
    },
    email: {
      type: GraphQLString,
      sqlColumn: 'email'
    },
    url: {
      type: GraphQLString,
      sqlColumn: 'url'
    },
    interests: {
      type: new GraphQLList(Interest),
      junction: {
        sqlTable: 'user_interests',
        sqlJoins: [
          // first the parent table to the junction
          (userTable, junctionTable, args) => `${userTable}.user_id = ${junctionTable}.user_id`,
          // then the junction to the child
          (junctionTable, interestTable, args) => `${junctionTable}.controlled_vocab_entry_id = ${interestTable}.controlled_vocab_entry_id`
        ]
      }
    },
    reviews: {
      type: new GraphQLList(Review),
      sqlJoin:
        (userTable, reviewAssignmentTable) => `${userTable}.user_id = ${reviewAssignmentTable}.reviewer_id`
    }
  })
})

const Keyword = new GraphQLObjectType({
  name: 'Keyword',
  sqlTable: '(SELECT submission_id, keyword_text FROM submission_search_keyword_list as c INNER JOIN (Select submission_id, keyword_id FROM submission_search_object_keywords AS a INNER JOIN submission_search_objects as b ON a.object_id = b.object_id) as d ON c.keyword_id = d.keyword_id)',
  uniqueKey: ['submission_id', 'keyword_text'],
  fields: {
      submissionId: {
        type: GraphQLString,
        sqlColumn: 'submission_id'
      },
      keywordText:{
        type: GraphQLString,
        sqlColumn: 'keyword_text'
    }
  }
})


const Review = new GraphQLObjectType({
  name: 'Review',
  sqlTable: 'review_assignments',
  uniqueKey: 'review_id',
  fields:{
    id: {
      type: GraphQLInt,
      sqlColumn: 'review_id'
    },
    dateAssigned: {
      type: GraphQLString,
      sqlColumn: 'date_assigned'
    },
    dateCompleted: {
      type: GraphQLString,
      sqlColumn: 'date_completed'
    },
    dateDue: {
      type: GraphQLString,
      sqlColumn: 'date_due'
    },
    declined: {
      type: GraphQLInt,
      sqlColumn: 'declined'
    },
    quality: {
      type: GraphQLInt,
      sqlColumn: 'quality'
    },
    recommendation: {
      type: GraphQLInt,
      sqlColumn: 'recommendation'
    },
    submissionKeywords: {
      type: GraphQLList(Keyword),
      sqlJoin:
        (reviewAssignmentTable, keywordsTable) => `${keywordsTable}.submission_id = ${reviewAssignmentTable}.submission_id`
    }
  }
})


const Interest = new GraphQLObjectType({
  name: 'Interest',
  sqlTable: 'controlled_vocab_entry_settings',
  uniqueKey: 'controlled_vocab_entry_id',
  fields: {
    id: {
      type: GraphQLInt,
      sqlColumn: 'controlled_vocab_entry_id'
    },
    text: {
      type: GraphQLString,
      sqlColumn: 'setting_value'
    }
  }
})

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
          return knex.raw(sql + ';').then(rows => rows[0]);
        },  {dialect: 'mysql'})
      }
    }
  })
})

const schema = new GraphQLSchema({
  description: 'a test schema',
  query: QueryRoot
})

const server = new GraphQLServer({
  schema
})

export default server

import escape from 'pg-escape'
import { GraphQLSchema } from 'graphql'
import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql'
import joinMonster from 'join-monster'
import UserDSmodel from '../mongoModels/UserDS'
import mongoose from 'mongoose';
import configMongoose from '../../peer-review-app/server/config';


var config
try {
   config = require('./serverConfig.json')
} catch (e) {
  console.info('Server configuration file not found.')
  console.error('Cannot start server without configuration file');
}
// import knex from 'knex'
var knex = require('knex')({
  client: 'mysql',
  connection: config
});

const { GraphQLServer } = require('graphql-yoga')


// Mongo Database connection
var _db;

const dbConfig = configMongoose.database;
const dbURI = configMongoose.databaseURI;

mongoose.connect(dbURI, dbConfig)
_db = mongoose.connection;
_db.on('error', console.error.bind(console, '> error occurred from the database:'));
_db.once('open', () => {
  console.log('> successfully opened the database');
});


const UserDecSci = new GraphQLObjectType({
  name: 'UserDS',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    surname: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
})

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

const Keywords = new GraphQLObjectType({
  name: 'Keywords',
  sqlTable: '(SELECT submission_id, GROUP_CONCAT(keyword_text SEPARATOR \' \') as keywords FROM submission_search_keyword_list as c INNER JOIN (Select submission_id, keyword_id FROM submission_search_object_keywords AS a INNER JOIN submission_search_objects as b ON a.object_id = b.object_id) as d ON c.keyword_id = d.keyword_id GROUP BY submission_id)',
  uniqueKey: 'submission_id',
  fields: {
      submissionId: {
        type: GraphQLString,
        sqlColumn: 'submission_id'
      },
      keywords:{
        type: GraphQLString,
        sqlColumn: 'keywords'
    }
  }
})


const ReviewComment = new GraphQLObjectType({
  name: 'ReviewComment',
  sqlTable: 'submission_comments',
  uniqueKey: 'comment_id',
  fields: {
    id: {
      type: GraphQLInt,
      sqlColumn: 'comment_id'
    },
    text: {
      type: GraphQLString,
      sqlColumn: 'comments'
    },
    viewable: {
      type: GraphQLInt,
      sqlColumn: 'viewable'
    },
    submission_id: {
      type: GraphQLInt,
      sqlColumn: 'submission_id'
    },
    review_id: {
      type: GraphQLInt,
      sqlColumn: 'assoc_id'
    }
  },
  where: (usersTable) => {
    return `${usersTable}.viewable = 1`
  }
})

const Title = new GraphQLObjectType({
  name: 'Title',
  sqlTable: '(SELECT submission_id, setting_value, locale, IF(locale = \'en_US\', 1, 2) as SortingId FROM submission_settings WHERE setting_name = \'title\' ORDER BY SortingId)',
  uniqueKey: ['submission_id', 'locale'],
  fields: {
    text: {
      type: GraphQLString,
      sqlColumn: 'setting_value'
    },
    locale: {
      type: GraphQLString,
      sqlColumn: 'locale'
    }
  }
})

const Abstract = new GraphQLObjectType({
  name: 'Abstract',
  sqlTable: '(SELECT submission_id, setting_value, locale, IF(locale = \'en_US\', 1, 2) as SortingId FROM submission_settings WHERE setting_name = \'abstract\' ORDER BY SortingId)',
  uniqueKey: ['submission_id', 'locale'],
  fields: {
    text: {
      type: GraphQLString,
      sqlColumn: 'setting_value'
    },
    locale: {
      type: GraphQLString,
      sqlColumn: 'locale'
    }
  }
})

const Doi = new GraphQLObjectType({
  name: 'Doi',
  sqlTable: '(SELECT submission_id, setting_value, locale, IF(locale = \'en_US\', 1, 2) as SortingId FROM submission_settings WHERE setting_name = \'pub-id::doi\' ORDER BY SortingId)',
  uniqueKey: ['submission_id', 'locale'],
  fields: {
    url: {
      type: GraphQLString,
      sqlColumn: 'setting_value'
    }
  }
})

const Submission = new GraphQLObjectType({
  name: 'Submission',
  sqlTable: 'submissions',
  uniqueKey: ['submission_id'],
  fields: {
    id: {
      type: GraphQLInt,
      sqlColumn: 'submission_id'
    },
    abstract: {
      type: Abstract,
      sqlJoin: (submissionTable, abstractsTable) => `${submissionTable}.submission_id = ${abstractsTable}.submission_id`
    },
    title: {
      type: Title,
      sqlJoin: (submissionTable, titlesTable) => `${submissionTable}.submission_id = ${titlesTable}.submission_id`
    },
    doi: {
      type: Doi,
      sqlJoin: (submissionTable, doisTable) => `${submissionTable}.submission_id = ${doisTable}.submission_id`
    },
    keywords: {
      type: GraphQLList(Keywords),
      sqlJoin:
        (submissionsTable, keywordsTable) => `${keywordsTable}.submission_id = ${submissionsTable}.submission_id`
    },
    status: {
      type: GraphQLInt,
      sqlColumn: 'status'
    },
    hide_author: {
      type: GraphQLInt,
      sqlColumn: 'hide_author'
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
    submission: {
      type: Submission,
      sqlJoin: (reviewAssignmentTable, submissionTable) => `${submissionTable}.submission_id = ${reviewAssignmentTable}.submission_id`
    },
    reviewComments: {
      type: GraphQLList(ReviewComment),
      sqlJoin:
        (reviewAssignmentTable, reviewCommentsTable) => `${reviewCommentsTable}.assoc_id = ${reviewAssignmentTable}.review_id`,
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
    },
    submissions: {
      type: new GraphQLList(Submission),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
          return knex.raw(sql + ';').then(rows => rows[0]);
        },  {dialect: 'mysql'})
      }
    },
    submission: {
      type: Submission,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      where: (submissionsTable, args, context) => {
        return escape(`${submissionsTable}.submission_id = ${args.id}`)
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
          return knex.raw(sql + ';').then(rows => rows[0]);
        },  {dialect: 'mysql'})
      }
    },
  })
})

const MutationRoot = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
  signup: {
    type: UserDecSci,
    args:{
      name: {
        type: GraphQLString
      },
      surname: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      }
    },
    resolve: async (_, args) => {

        let schema = new UserDSmodel({
            _id: args.username,
            ...args
          }
        )

        let found = await UserDSmodel.findById(schema._id)

        if (found)
          return new Error('User with id '+ schema._id + ' already exists' )

        return await schema.save().then((schema, e)=>{
          console.log('saved user schema: ', schema);
          return schema
        }).catch(
          e => {
            console.error(e);
            return new Error('Error tring to save user: ' + schema);
          }
        )

      }
    }
  }
});

const schema = new GraphQLSchema({
  description: 'a test schema',
  query: QueryRoot,
  mutation: MutationRoot
})

const server = new GraphQLServer({
  schema
})

export default server

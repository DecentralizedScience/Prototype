const { GraphQLServer } = require('graphql-yoga')

let users = [{
  id: 'user-0',
  name: 'Name0',
  surname: 'Surname0',
  email: 'email0@example.com',
  interests: [{
    id: 'int-0.0',
    text: 'Interest0.0'
  },
  {
    id: 'int-0.1',
    text: 'Interest0.1'
  }]
},
{
  id: 'user-1',
  name: 'Name1',
  surname: 'Surname1',
  email: 'email1@example.com',
  interests: [{
    id: 'int-1.0',
    text: 'Interest1.0'
  },
  {
    id: 'int-1.1',
    text: 'Interest1.1'
  }]
},
{
  id: 'user-2',
  name: 'Name2',
  surname: 'Surname2',
  email: 'email2@example.com',
  interests: [{
    id: 'int-2.0',
    text: 'Interest2.0'
  },
  {
    id: 'int-2.1',
    text: 'Interest2.1'
  }]
},
{
  id: 'user-3',
  name: 'Name3',
  surname: 'Surname3',
  email: 'email3@example.com',
  interests: [{
    id: 'int-3.0',
    text: 'Long interest qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
  }]
},
{
  id: 'user-4',
  name: 'Name4',
  surname: 'Surname4',
  email: 'email4@example.com',
  interests: [{
    id: 'int-4.0',
    text: 'Interest4.0'
  },
  {
    id: 'int-4.1',
    text: 'Interest4.1'
  }]
},
{
  id: 'user-5',
  name: 'Name5',
  surname: 'Surname5',
  email: 'email5@example.com',
  interests: [{
    id: 'int-5.0',
    text: 'Interest5.0'
  },
  {
    id: 'int-5.1',
    text: 'Interest5.1'
  }]
},
{
  id: 'user-6',
  name: 'Name6',
  surname: 'Surname6',
  email: 'email6@example.com',
  interests: [{
    id: 'int-6.0',
    text: 'Interest6.0'
  },
  {
    id: 'int-6.1',
    text: 'Interest6.1'
  }]
}]

const resolvers = {
  Query: {
    info: () => `This is the API of the prototype`,
    users: () => users,
  },

  User: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    surname: (parent) => parent.surname,
    interests: (parent) => parent.interests,
  },

  Interest: {
    id: (parent) => parent.id,
    text: (parent) => parent.text,
  },
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

export default server

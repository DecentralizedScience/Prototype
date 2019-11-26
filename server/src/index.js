const { GraphQLServer } = require('graphql-yoga')

let users = [{
  id: 'user-0',
  name: 'Name0',
  surname: 'Surname0',
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
  interests: [{
    id: 'int-2.0',
    text: 'Interest2.0'
  },
  {
    id: 'int-2.1',
    text: 'Interest2.1'
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
server.start(() => console.log(`Server is running on http://localhost:4000`))

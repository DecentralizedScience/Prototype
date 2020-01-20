var server = require('./graphQLServer').default

server.start({endpoint: '/graphql'}, () => console.log(`Server is running on http://localhost:4000/graphql`))

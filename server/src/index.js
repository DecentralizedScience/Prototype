var server = require('./graphQLServer').default

server.start(() => console.log(`Server is running on http://localhost:4000`))

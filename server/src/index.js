// Mocked Data Version:
import server from './mockedGraphQLServer'

// Real Data Version:
// import server from './graphQLServer'

server.start(() => console.log(`Server is running on http://localhost:4000`))

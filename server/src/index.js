var config = undefined

try {
   config = require('./serverConfig.json')
} catch (e) {
  console.info('Server configuration file not found.', config)
}

var server
if (config === undefined || config.mockedData) {
  // Mocked Data Version:

  server = require('./mockedGraphQLServer').default
  console.log(config, JSON.stringify(server));
} else {
  // Served Data Version:
  console.log(config, JSON.stringify(server));
  server = require('./graphQLServer').default
}

server.start(() => console.log(`Server is running on http://localhost:4000`))

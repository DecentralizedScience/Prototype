# Prototype
Decentralized science prototype (WIP)

## Requisites

To run and install this application you need:

* [node](https://nodejs.org) and [npm](https://www.npmjs.com/)

## How to run this prototype

### Without Prisma
First, you have to initialize the server. To do so, go to the `server` directory, install the dependecies and run the code:
```
cd server
npm install
npm start
```

The server is now running on http://localhost:4000. If you want to change the address the clien should connect to, you can copy `src/config.json.exampe` to `src/config.json` and set the host and port configuration.

Now, go back to the main directory (`cd ..`) and start the React application:
```
npm install
npm start
```

A browser window should then open, showing the list of the users (now mocked).

#### With real data

Instead of using mocked data, you can connect to a real OJS database. To connect to a OJS database, copy `server/src/serverConfig.json.example` to `server/src/serverConfig.json` and change `server/src/index.js` to start with the following code:

```javascript
// Mocked Data Version:
// import server from './mockedGraphQLServer'

// Real Data Version:
import server from './graphQLServer'
```


### With Prisma
If you want to test the prototype with the database using Prisma, you have to go back to [this older version of the repo](https://github.com/DecentralizedScience/Prototype/tree/b70a5275b8e55fddcfd782cbedeae9375c956a6e), where everything was set to use Prisma. Then, proceed with the following steps.

First, Prisma must be installed globally:
```
sudo npm install -g prisma
```
Also Docker must be installed.

Then, make sure you have the OJS database in your local MySQL, and proceed to modify the `user` and `password` values inside `server_ojs/docker-compose.yml` to your own (the user you choose must have permissions to read and modify the database).

Once the file is modified, start Prisma and connect it to the database:
```
cd server_ojs
docker-compose up -d
```
Prisma is now connected to the database and running on http://localhost:4466

(You can check if the docker container is working properly using the command `docker ps`)

To run the Prisma datamodel, run the following command:
```
prisma deploy
```

After waiting for a couple of seconds, everything will be initialized, and the status of the database can be checked at http://localhost:4466/_admin

Now, go back to the main directory (`cd ..`) and start the React application:
```
npm install
npm start
```

A browser window should then open, showing the list of the authors registered in the database.

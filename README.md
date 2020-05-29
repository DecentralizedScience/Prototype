[![Build Status](https://travis-ci.org/DecentralizedScience/Prototype.png?branch=master)](https://travis-ci.org/DecentralizedScience/Prototype/)
[![Coverage Status](https://coveralls.io/repos/github/DecentralizedScience/Prototype/badge.svg?branch=master&service=github)](https://coveralls.io/github/DecentralizedScience/Prototype?branch=master&service=github)
[![License: AGPL v3](https://img.shields.io/github/license/DecentralizedScience/Prototype?color=blue)](http://www.gnu.org/licenses/agpl-3.0)

# Prototype
Decentralized science prototype (WIP)

## Community
* join our [community forum](https://discuss.decentralized.science/)
* connect at our [developers' chat](https://dec-sci.zulipchat.com/#narrow/stream/238971-development) 

## Requisites

To run and install this application you need:

* [node](https://nodejs.org) and [npm](https://www.npmjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Download
First, clone this repo.

Then, run:

`git submodule init`

## How to run this prototype

To install, run

```
npm install
```

Before running the server, you have to start the mongoDB service. Check if it is already running:
```
service mongod status
```

If it is not, start the service:
```
sudo service mongod start
```

> **Note:** It might be *mongodb* insted of *mongod* for certain Linux distributions, such as OpenSuse

### Run server

#### With mocked data

We use [GraphQL Faker](https://github.com/APIs-guru/graphql-faker) to generate mocked data. To use it, first install it globally:

```
npm install -g graphql-faker
```

Then, to start the server, run:

```
npm run mocked
```

The server is now running on http://localhost:4000. If you want to change the address the clien should connect to, you can set the host and port configuration at `src/config.json`.


#### With real data

Instead of using mocked data, you can connect to a real OJS database. To connect to a OJS database, copy `server/src/serverConfig.json.example` to `server/src/serverConfig.json` and set the database connection configuration variables `host`, `port`, `user`, `password`, and `database`.

Then, to start the server, run:

```
npm run server
```

##### Protect your data
Now your data is served at port `4000` and can probably be accessed from outside your computer.

To avoid access from outside your computer, you can close the port for external connections:

```
iptables -A INPUT ! -s 127.0.0.1 -p tcp -m tcp --dport 4000 -j DROP
```

See Deployment section for instructions on how to password protect the data to allow external usage.

### Run the web app

To run the web app, run:

```
npm start
```

A browser window should then open, with our web app working and connected to the server's data.

## Deployment

To deploy the app you sould build it and serve it.

### Build
- configure your `src/config.json`file, and set the host to your server name, port to `433` and path to the path you want to use for your server, for instance `graphql`
`npm run build` commands builds the solution

### Protect the data
#### Disallow external access to port 4000
To avoid access from outside your computer, you can close the port for external connections:

```
iptables -A INPUT ! -s 127.0.0.1 -p tcp -m tcp --dport 4000 -j DROP
```

#### Set your HTTPS certificates
You can use [let's encrypt](https://letsencrypt.org/), and set it up for your system and [nginx](nginx.org) server using the recommended [certbot](https://certbot.eff.org/).

#### Set passwords to access the data
You can use basic .htpaccess protection. For that, install `apache2-utils` and set the password for your users

`sudo apt-get install apache2-utils`
`sudo htpasswd -c /etc/apache2/.htpasswd <username>`

### Serve
- First install `serve`: `npm install -g serve`
- Then serve the app: `serve -s build`

- The static files of `npm run build` are at `build/` folder should be served. For that you can use nginx, with a configuration similar to:

```
server {
    listen 443;
    server_name <your_server_name>;

    # SSL Configuration using letsencrypt and certbot
    ssl on;
    ssl_certificate /etc/letsencrypt/live/<your_server_name>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<your_server_name>/privkey.pem;

    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";

    location /decentralized-science {
        alias <your_path_to_build/_folder>;
    }

    location <path_at_your_/src/config.json> {
        proxy_pass     http://localhost:4000/graphql;
        auth_basic            "Restricted Area";
        auth_basic_user_file  /etc/apache2/.htpasswd;
    }
```

## Using [Bloxgerg](https://bloxberg.org/)'s Blockchain [peer-review-app](https://github.com/bloxberg-org/peer-review-app)

Decentralized Science connects to Bloxberg Blockchain and it's peer reviewing app. In their blockchain, users can register their previous peer reviews, and import their [Publons](https://publons.com/) and [F1000Research](https://f1000research.com/) profiles.

### Database configuration
Following [database configuration instructions](https://github.com/DecentralizedScience/peer-review-app#configure-database-connection), configure your mongodb connection information:

- Copy sample configuration file:
`cp peer-review-app/server/config_template.js peer-review-app/server/config.js`

- Edit the configuration file to include your mongodb connection details, for instance, set `exports.databaseURI` to the default value ` = 'mongodb://localhost:27017'`.

### Running blockchain server

run `npm run bloxberg-server` to start the server

### Enjoy!

Your can access your password protected Decentralized Science Prototype at `https://<your_server_name>/decentralized-science/`

# Prototype
Decentralized science prototype (WIP)

## Requisites

To run and install this application you need:

* [node](https://nodejs.org) and [npm](https://www.npmjs.com/)

## How to run this prototype

To install, run

```
npm install
```

### Run server

#### With mocked data

To start the server, run:

```
npm start --prefix server
```

The server is now running on http://localhost:4000. If you want to change the address the clien should connect to, you can set the host and port configuration at `src/config.json`.


#### With real data

Instead of using mocked data, you can connect to a real OJS database. To connect to a OJS database, copy `server/src/serverConfig.json.example` to `server/src/serverConfig.json` and set the database connection configuration variables `host`, `port`, `user`, `password`, and `database`.

Then, to start the server, run:

```
npm start --prefix server
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
- configure your `src/config.json`file, and set the host to your server name, port to `433` and path to the path you want to use for your server, for instance `DSServer`
- The static files at `build/` folder should also be served. For that you can use nginx, with a configuration similar to:

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

    location /decentralized-science/home {
        alias <your_path_to_build/_folder>;
    }
    location /decentralized-science {
        location /decentralized-science/ {
            proxy_pass     http://localhost:5000;
        }
        root /decentralized-science;
    }

    location <path_at_your_/src/config.json> {
        proxy_pass     http://localhost:4000/;
        auth_basic            "Restricted Area";
        auth_basic_user_file  /etc/apache2/.htpasswd;
    }
```

### Enjoy!

Your can access your password protected Decentralized Science Prototype at `https://<your_server_name>/decentralized-science/`

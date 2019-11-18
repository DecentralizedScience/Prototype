# Prototype
Decentralized science prototype (WIP)

## How to run this prototipe
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

# Prototype
Decentralized science prototype (WIP)

## Steps to get the datamodel
First, Prisma must be installed globally:
```
sudo npm install -g prisma
```
Also Docker must be installed.

Then, initialize Prisma over the database, that you should have locally:
```
prisma init test
```
This launches an intercative wizard. Select the following options:
1. Select **Use existing database**
2. Select **MySQL**
3. Provide the connection details:
   - Select **localhost**
   - Select port **3306**
   - Write the name of the database (e.g. **ojs2**)
   - Enter the database user
   - Enter the password for that user
4. Select **Prisma TypeScript client**

This will create several files instide the directory `test/`. Among them, a `datamodel.prisma` file, containing all the types in the schema. If we try to deploy Prisma over this datamodel, as it is, it will produce several errors, for Prisma requires the types to have an index field, and some of them don't have one.

For now, a workaround is to modify the `datamodel.prisma` file, so it only contains the types we need. These are:
  - authors
  - review_assignment
  - users

The `docker-compose.yml` file must also be modified. Inside the file, there is a field `schema` followed by the name of the database (in this case, *ojs2*). Change the name of the field from `schema` to database. There is also a field `restart`, with value `always`. Change the value to `on-failure`.
  
Once the file is modified, start Prisma and connect it to the database:
```
cd test
docker-compose up -d
```
Prisma is now connected to the database and running on (http://localhost:4466).

To run the Prisma datamodel, run the following command:
```
prisma deploy
```

After waiting for a couple of minutes, everything will be initialized, and the status of the database can be checked at (http://localhost:4466/_admin)

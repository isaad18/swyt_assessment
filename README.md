# Swyt Assessment
### Description
This is a simple website that runs on vuejs and nestjs in the backend, with postgres for the database.
Everything is automated and containarized to be able to run on any machine with a simple command
```docker-compose up --build```
after filling the .env with the variables mentioned in .env.example, please be aware when changing the variables, as for example when you change (POSTGRES_USER) value, make sure to change it inside the (DATABASE_URL) with its corresponding name as written in the values.
provide the port with the value 5432, as the default port for postgres to ensure its running smoothly.

### Features
On this website you can post a product and categorize it, you can search for other products either by name category.
Also, you can view the details of the product by clicking on it where it will show a simple dialog to show its description.
A data base reset will occur everytime docker compose runs to ensure data base is initiated propoerly.

### Tester
A simple test exists, where it checks if the post works properly, and if its validation works.
you can run the test by running this command ```docker exec -it ${CONTAINER_NAME} yarn test:e2e```

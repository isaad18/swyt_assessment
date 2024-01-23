# Swyt Assessment
### Description
This is a simple website that runs on vuejs and nestjs in the backend, with postgres for the database.
Everything is automated and containarized to be able to run on any machine with a simple command
```docker-compose up --build```

### Features
On this website you can post a product and categorize it, you can search for other products either by name category.
Also, you can view the details of the product by clicking on it where it will show a simple dialog to show its description.
A data base reset will occur everytime docker compose runs to ensure data base is initiated propoerly.

### Tester
A simple test exists, where it checks if the post works properly, and if its validation works.
you can run the test by running this command ```docker exec -it ${CONTAINER_NAME} yarn test:e2e```

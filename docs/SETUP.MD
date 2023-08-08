# Starting the project

## Cloning the project

```bash
## Cloning the repository
git clone https://github.com/CinCoders/research-front.git

## Entering the directory
cd research-front
```

## Setting up the project

Create a .env file and set it up using the .env.example in project folder.

```
$ touch .env
```

## Setting up Keycloak

If you wanna use Keycloak as we do, setup the Docker container for it:

```bash
Creating a Keycloak docker container:

## Run the docker image for keycloak
$ docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin --name=keycloak quay.io/keycloak/keycloak:18.0.0 start-dev

```

Then, follow this steps:

- With the Docker container running, access localhost:8080 in your web browser
- Enter the Administration Console
- Create a Realm and name it Intranet
- Create a Client as Research-Front
- Create the Roles, example: Lecturer
- Create a User as any
- Run the Back-end

## Running

```bash
## Installing the npm dependencies
npm install

## Starting the project (development environment)
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Congrats! The project is up and running (locally at least).

## Build

```bash
## Building the project (production environment)
npm run build
```

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

## Production deployment

To deploy the project, base yourself in the Docker Compose file in the [backend repository](https://github.com/CinCoders/research-back).

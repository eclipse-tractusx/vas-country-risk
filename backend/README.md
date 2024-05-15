# Value Added Service - Country Risk Alert

Table of content:

- [Description](#description)
- [Running environments](#running-environments)
- [Helm Chart](#helm-chart)
- [Getting started](#Getting-started)
  - [Prerequisites](#Prerequisites)
  - [Profile Configurations](#Profile-Configurations)
  - [How to run](#How-to-run)
  - [Database Connection Configuration](#Database-Connection-Configuration)
- [Project Structure](#Project-Structure)
- [API sample endpoints](#API-sample-endpoints)


## Description

This project in mainly used as a microservice for the Value Added Service Frontend project. It feeds information from
a database and also from other CatenaX microservices


## Container images

This application provides container images for demonstration purposes.
The base image used, to build this demo application image is `eclipse-temurin:21-jre-alpine`

Docker Hub:

* [eclipse-temurin](https://hub.docker.com/_/eclipse-temurin)
* [21-jre-alpine](https://hub.docker.com/layers/library/eclipse-temurin/21-jre-alpine/images/sha256-02c04793fa49ad5cd193c961403223755f9209a67894622e05438598b32f210e?context=explore)

Source:

* [temurin-build](https://github.com/adoptium/temurin-build)
* [temurin docker repo info](https://github.com/docker-library/repo-info/tree/master/repos/eclipse-temurin)


## Helm chart

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat) The helm chart for installing the Catena-X Value Added Service - Country Risk is available in [vas-country-risk-frontend](https://github.com/eclipse-tractusx/vas-country-risk-frontend).

## Getting started

### Prerequisites

* JDK 17 ( or Higher)
* Maven 'Spring Boot is compatible with Apache Maven 3.5 or above'

### Profile Configurations

In this project there is a variety of different profiles. They can be accessed in the resources folder of the project. The available
profiles are:

* Default - When no environment specified (application.yml)
* Dev - Used in the remote dev environment (application-dev.yml)
* Int - Used in remote int environment (application-int.yml)
* Local - Profile to use on local machine (application-local.yml)
* Prod - application-prd.yml

### How to run

To run the project locally, it must be changed which profile will be used, in this case the profile will be the local.
For that, run the project with the following Environment variable: spring.profiles.active=local

The project can be run locally with the following command: `mvn clean spring-boot:run -Dspring.profiles.active=local`

### Database Connection Configuration

The project is mainly configured to use Postgres as a Database. For this, you need to open a terminal in the project main  
directory and run the following command `docker compose up`. This will mount the database using the docker compose file
in the project. The connection configurations for this database are in the application-local.yml.

See [Installation guide](https://github.com/eclipse-tractusx/vas-country-risk-backend/blob/main/backend/INSTALL.md)

## Project Structure

The root of this project contains mainly Maven Project Files (pom.xml) and some repository configurations. Also there are
at root level some folders containing the Helm Charts configurations.

Once inside the "main" folder, there are two folders. One for the Java files, and a resources folder, which contains the database
changelogs and fake data which populates the liquibase and also the profiles configurations yml's.

Inside the java folder, there is the source code for the project, which is divided in multiple folders to facilitate the development
and follows the mainly used project structure in most Spring Boot projects.

```sh
       └───org
           └───eclipse
               └───tractusx
                   └───valueaddedservice
                       ├───config
                       ├───constants
                       ├───domain
                       │   └───enumeration
                       ├───dto
                       │   └───ShareDTOs
                       ├───interceptors
                       ├───repository
                       ├───service
                       │   ├───csv
                       │   ├───logic
                       │   └───mapper
                       ├───utils
                       └───web
                           └───rest
```

## API sample endpoints

* Swagger UI: `http://localhost:8080/swagger-ui/index.html#/`


## Notice for Docker image

Bellow you can find the information regarding Docker Notice for this application.

* [Vas Country Risk Backend](./DOCKER_NOTICE.md)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.

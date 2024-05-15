# Value Added Service - Country Risk Alert

Table of content:

- [Description](#description)
- [Running environments](#running-environments)
- [Getting started](#Getting-started)
    - [Prerequisites](#Prerequisites)
    - [Profile Configurations](#Profile-Configurations)
    - [How to run](#How-to-run)
    - [Database Connection Configuration](#Database-Connection-Configuration)
- [Project Structure](#Project-Structure)
- [API sample endpoints](#API-sample-endpoints)
    

## Description

This project in mainly used as a microservice for the Value Added Service Frontend project. It feeds information from
an database and also from other CatenaX microservices

## Getting started

### Prerequisites

* JDK 17 ( or Higher)
* Maven

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


## Project Structure

The root of this project contains mainly Maven Project Files (pom.xml) and some repository configurations. Also there are
at root level some folders containing the Helm Charts configurations.

Once inside the "main" folder, there are two folders. One for the Java files, and a resources folder, which contains the database
changelogs and fake data which populates the liquibase and also the profiles configurations yml's.

Inside the java folder, there is the source code for the project, which is divided in multiple folders to facilitate the development
and follows the mainly used project structure in most Spring Boot projects.

```sh
       └───catenax
           └───valueaddedservice
               ├───config
               ├───constants
               ├───domain
               │   └───enumeration
               ├───dto
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

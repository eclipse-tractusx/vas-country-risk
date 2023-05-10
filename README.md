# Value added Services - Frontend 

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat)

This project is a Frontend web application for the value added services project written in React.js

## Description

This project is mainly a dashboard which displays information from the [value added service country risk backend](https://github.com/eclipse-tractusx/vas-country-risk-backend) project. 
This dashboard calculates a risk score per country based on information regarding corruption, political stability, economic risk and social and structural figures.

## What is a Country risk?

Country risk refers to the risk of investing or lending money in a country, arising from possible changes in the business environment that may adversely affect operating profits or the value of assets in the country. For example, financial factors such as currency controls, devaluation or regulatory changes, or stability factors such as mass riots, civil war and other potential events contribute to companies' operational risks. This term is also sometimes referred to as political risk - however, 
country risk is a more general term that generally refers only to risks affecting all companies operating within or involved with a particular country.

## Container images

This application provides container images for demonstration purposes.
The base image used, to build this demo application image is `node:18-alpine` and `nginxinc/nginx-unprivileged:stable-alpine`

Docker Hub:

* [node:18-alpine](https://hub.docker.com/_/node)
* [nginxinc](https://hub.docker.com/r/nginxinc/nginx-unprivileged)

Source:

* [node repo info](https://github.com/docker-library/repo-info/tree/master/repos/node)
* [nginxinc repo info](https://github.com/nginxinc/docker-nginx-unprivileged/pkgs/container/nginx-unprivileged)

## More documentation

For more information and documentation, please refer to [documentation](https://github.com/eclipse-tractusx/vas-country-risk-frontend/tree/main/docs).

## Demo environments

There are two demo environments provided by Catena-X:

* INT: https://country-risk-dashboard.int.demo.catena-x.net/
* DEV: https://country-risk-dashboard.dev.demo.catena-x.net/
* Components: https://portal.dev.demo.catena-x.net/_storybook/
# Getting Started and How to run locally 

Clone the source locally:

```sh
git clone "URL-OF-PROJECT"
cd product-vas-country-risk-frontend
```

To run with the APIs of the local backend part of the project, you need to change the APIs URLs on the .env file!

Do the following command `npm install @emotion/react  @emotion/styled  @mui/icons-material@5.10.6  @mui/material@5.10.7 react-simple-maps cx-portal-shared-components react-scripts` 
to install the application. 

After that the application should be run with
the `npm start` command. 
This will run the application on the following URL: [http://localhost:3000](http://localhost:3000)

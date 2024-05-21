# Changelog

All notable changes to this project (both backend and frontend) will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - [21-05-2024]

### Frontend

#### Added
- Create `NegotiationPage` component to provide a user interface for triggering negotiations, displaying negotiation statuses, and managing catalog items.
- Implement `fetchCatalogItems` and `triggerNegotiation` service functions to interact with backend endpoints for retrieving catalog items and initiating negotiations.
- Introduce dynamic status icons in the negotiation table to reflect the real-time status of each negotiation, enhancing user feedback and interaction.
- Added SnackBar for Report Table and Ratings for error and success messages

#### Changed
- Update `UserInfo` component to conditionally display the negotiation page link in the user menu based on user roles, enhancing role-based access control.
- Modify the negotiation initiation process to reset item statuses to "Pending" before sending requests, providing clearer feedback on ongoing negotiations.
- Refine error handling in the negotiation process to alert users of failures and log errors for debugging purposes.

#### Fixes
- Resolve visual feedback issue where status icons would not reset to default state after re-initiating negotiations.
- Update Report and Table components from catena-x lib
- Configure css with new update components

### Backend

#### Added
- Implement `triggerNegotiation` function in `NegotiationServiceLogic` to handle sequential negotiation requests with external services, enhancing the negotiation process with error handling and response transformation.
- Introduce new DTOs (`NegotiationRequestDTO`, `NegotiationResponseDTO`, `EDRResponseDTO`) to streamline the handling of negotiation data and responses.
- Add utility functions in `EdcEndpointsMappingUtils` for parsing and extracting specific fields from JSON responses, improving data extraction reliability and code maintainability.

#### Changed
- Modify `executeSequentialNegotiationRequests` logic to include additional steps in the negotiation process, ensuring the correct sequence of requests and proper handling of intermediate responses.
- Update error handling across the negotiation process to log detailed error messages and fallback values, improving debugging and reliability.
- Refactor `createNegotiationRequestBody` to dynamically generate request bodies based on input parameters, enhancing flexibility and readability.

#### Fixes
- Address issue with incorrect extraction of `transferProcessId` by adjusting JSON path in `extractTransferProcessId` function.




## [1.3.2] - [2024-04-17]

### Backend

#### Changed
- Changed Mapping from Country to ISOCode
- Fix vulnerability on spring boot web version upgrade to 6.2.3


## [1.3.1] - 2024-02-29

### Backend 

#### Fixes
- Fix vulnerability on postgresql version upgrade to 42.7.2
- Fix vulnerability found upgrade spring boot version to 3.2.3

#### Changed
- Change Spring security configuration and enable csrf configuration

### Frontend 

#### Fix
- Update dependency on vulnerability for @adobe/css-tools and axios
- Fix styles on Save Reports and Upload Ratings
- Fix roles that are shown on Table info
- Fix finding for entering country risk if user is not subscribed

#### Changed
- Updated arc42 documentation to align with the EDC updated Country Risk application.
- Update Readme.md and Install.md

#### Added
- Added Error Page for when user is with right credentials but not subscribed to the App

## [1.3.0] - 2023-12-06

### Backend 

#### Added
- Added mapping for generic Endpoint
- Added mapping for Pool lsa types
- Added edc postman collection

#### Changed
- BPDM endpoints changed for requesting EDC when available
- Logic mapping changed between Gate Pool and Country Risk DTO
- Update header year for TRG on each file

#### Fixes
- Fix vulnerability on spring boot version and upgrade version to 3.1.8

### Frontend 

#### Added
- Added About Page for Legal notice for end user content


## [1.2.3] - 2023-11-30

### Backend

#### Fixes
- Fix vulnerability on ch.qos.logback lib to 1.14.13

## [1.2.2] - 2023-11-30

### Backend

#### Removed
- Removed org.owasp.esapi lib

#### Changed
- Change Unit Test from testRestTemplate to webTestClient since testRestTemplate does not handle UNAUTHORIZED errors

## [1.2.1] - 2023-11-28

### Backend 

#### Changed
- Changed arq42 documentation to be updated to current application
- Update Dependencies md file

#### Fixes
- Fix bug on sharing endpoint authorization
- Fix health check for trivy scan on docker image
- Fix vulnerability find on spring security core 6.1.1
- Fix vulnerability find on spring web flux 3.1.2
- Fix vulnerability with exclusion of bouncycastle lib on spring security
- Fix vulnerability find on owasp antisamy 1.7.3

#### Added
- Added docker registry workflow
- Added dockerhub notice.md
- Added docker notice.md to readme.md

### Frontend 

#### Changed
- Updated arc42 documentation to align with the updated Country Risk application.
- Switched the shell interpreter from `bash` to `sh` in our scripts to enhance portability and reduce dependencies.
- Upgrade node version on Dockerfile
- Upgrade outdated libs
- Upgrade correction for vulnerability find on Veracode for Axios lib
- Increase of the Chart version in the chart.yaml file to version: 3.0.3, version incremented from 1.1.0 to 3.0.3 due to the lack of updates that accompanied the subcharts updates.
  Version released with compatibility and tracking of the referred subcharts.

## [1.2.0] - 2023-10-11

### Backend 

#### Added
- Added project name to Sonar Cloud properties.
- Added Suppliers and Customers fields for logic filtering.
- Added new client ID to get roles from the newly published Country Risk app.
- Added new file for [Standard Api Documentation Controller](docs/swagger/sharing_controller.yml)

#### Changed
- Mapped between API and new Data Model for getting Suppliers and Customers.
- Major Updated libraries:
    - Updated spring boot parent version to 3.1.2
    - org.springframework.boot:spring-boot-starter-web to 3.1.2
    - org.springframework.security:spring-security-web to 6.1.1
- Changed Dependencies file with new library versions.
- Changed Mapping to adapt new Data Model on BPDM Gate
- Enable Hidden endpoints for Sharing Controller
- Change Dtos of Sharing Controllers

#### Fixes
- Upgraded version of spring-boot-autoconfigure to fix vulnerability to 3.1.1.
- Upgraded lib on object mapper after org.zalando:problem-spring-web update.

#### Removed
- Replaced RestTemplate with WebClient for non-blocking HTTP requests.

### Frontend 

#### Added
- Role-based column visibility in tables. 'Supplier' and 'Customer' columns are now hidden or shown based on user roles.
- Asynchronous fetching of roles to ensure they are available before rendering the table.
- Added new vars on the backend charts to pass auth url as dynamic
- Added ability for user to export PDF file in world map dialog view with different information (Ranges, Ratings, Year, Gate)
- Added Eclipse Room to ReadMe documentation

#### Fixed
- Issue where roles could be undefined, causing an error when calling the includes method.
- Fixed logic for role validation when client token is not found

#### Changed
- Changed client id for country risk app registered on portal

## [1.1.2] -  2023-05-17

### Frontend

#### Changed
- Changed sonar token on properties
- Bumped version of Webpack to latest (5.80.0)
- Bumped version of Web-vitals to 3.1.1
- Changed Arc42 and User Guide documentation
- Changed react simple maps d3-color and d3-zoom top fix vulnerability
- Changed react scripts nth-check top fix vulnerability
- Changed transformation on jest to update modules when test runs
- Updated DEPENDENCIES file
- Change structure of helms charts

#### Fixes
- Fixed copyright header in all charts
- Fixed useEffect of getAllDates on DatePicker with an error catcher
- Fixed owner on dockerfile permissions
- Fixed DEPENDENCIES file with newly scanned dependencies version

#### Added
- Added .tractusx metafile defining leading repository
- Added new images on docs folder
- Add git helm chart test work flow
- New Umbrella Helm Chart added


## [1.1.1] -  2023-05-16

### Backend

#### Fixes
- Upgrade version of spring-security-web to fix vul to 6.0.3
- Upgrade version of spring boot to fix vul to 3.0.6
- Update DEPENDENCIES file
- Update Code of Conduct

#### Removed
- Removed Helm Charts folder and sub folders content, helms can be found on leading repository described on Readme.md

### Frontend

#### Changed
- Changed file scripts/inject-dynamic-env.sh adding more dynamic vars into application
- Changed value  .securityContext.runAsUser   on values.yaml to run in the container as the same privileged user created on the dockerfile
- Changed copy command on docker file to a more clean sintaxis combining cp command with chwon command

#### Removed
- Remove env files not used
- Remove images on public folder not used and not needed

#### Fixes
- Fixed $REACT_APP_AUTH_URL from vars  to be reused on many more files-services for api calling using only common path


## [1.1.0] - 2023-04-20

#### Backend 

#### Changed

- Changed test data that shows on dashboard
- Changed sonar token on properties
- Changed h2 database on test to postgres containers
- Changed Dependencies file based on new upgraded dependencies
- Changed Arc42 and User Guide documentation

#### Fixes

- Upgrade version of spring-expression to 6.0.8
- Upgrade version to fix snake yaml vulnerability
- Upgrade Commons upload lib version to fix vulnerability
- Fix Bug for Sonar Long conversion from long native
- Readme updated with new Helm Chart leading repository information
- Upgraded jackson-databind and spring-core
- Fixed dockerfile Jar and Trivy scan path

#### Added

- Added .tractusx metafile with information about leading repository
- Added new images on docs folder

### Frontend 

#### Changed

- Removing fixed hardcoded url and change with dynamic vars
- Added Vars to index.html

#### Added
- Added script for injecting vars on nginx
- Added arq42 documentation
- Added UserGuide

#### Fixes
- Fixed a bug in the Help Dialog regarding broken attachments that we´re missing


#### Changed
- Adjusted frontend components to utilize new backend test configurations
- Enhanced data handling and security in line with backend upgrades

## [1.0.4] - 2023-03-02

### Backend 

#### Fixes

- Fix image that veracode is validating
- Fix Header on charts to be validated with Company group

#### Changed
- Change structure of folders on README.md
- Change Helm chart README.md on current version released

#### Removed
- Dockerfile removing the same EXPOSE block


#### Fixes
- Synced chart and image configurations with backend revisions for consistent security validations

## [1.0.3] - 2023-02-20

### Backend 

#### Added
- Added arq42 documentation
- Added UserGuide


#### Added
- Updated frontend documentation to incorporate backend's new arq42 guidelines and user guide information

## [1.0.2] - 2023-02-20

### Backend 

#### Changed
- Fix hardcoded application secret name on deployment helm chart


#### Fixes
- Updated deployment scripts to reflect backend's helm chart corrections

## [1.0.1] - 2023-02-20

### Backend 

#### Changed

- Fix whitespace handling that removed apiVersion declaration from Helm templates

### Frontend 

#### Changed

- Styling changes on some components according to portal style guidelines;
- Fix whitespace handling that removed apiVersion declaration from Helm templates;

#### Added

- Added user information icon on right top corner and logout option;
- Added Help Button which has documentation explained how to use the application;

#### Fixes

- Bug fix. Country selected manually by the user would not persist when the map dialog was opened;

## [1.0.0] - 2023-01-26

### Backend 

#### Added
- First backend release with complete authentication module setup

### Frontend 

#### Added
- First frontend release featuring landing page and login capabilities

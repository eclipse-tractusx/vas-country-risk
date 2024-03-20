# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - [unreleased]

### Fix
- Update Report and Table components from catena-x lib
- Configure css with new update components

### Added
- Added SnackBar for Report Table and Ratings for error and success messages


## [1.3.1] - [2024-02-29]

### Fix
- Update dependency on vulnerability for @adobe/css-tools and axios
- Fix styles on Save Reports and Upload Ratings
- Fix roles that are shown on Table info
- Fix finding for entering country risk if user is not subscribed

### Changed
- Updated arc42 documentation to align with the EDC updated Country Risk application.
- Update Readme.md and Install.md 

### Added
- Added Error Page for when user is with right credentials but not subscribed to the App


## [1.3.0] - 2023-12-06

### Added 
- Added About Page for Legal notice for end user content

## [1.2.1] - 2023-11-28

### Changed
- Updated arc42 documentation to align with the updated Country Risk application.
- Switched the shell interpreter from `bash` to `sh` in our scripts to enhance portability and reduce dependencies.
- Upgrade node version on Dockerfile
- Upgrade outdated libs
- Upgrade correction for vulnerability find on Veracode for Axios lib
- Increase of the Chart version in the chart.yaml file to version: 3.0.3, version incremented from 1.1.0 to 3.0.3 due to the lack of updates that accompanied the subcharts updates.
  Version released with compatibility and tracking of the referred subcharts.

## [1.2.0] - 2023-10-11

### Added
- Role-based column visibility in tables. 'Supplier' and 'Customer' columns are now hidden or shown based on user roles.
- Asynchronous fetching of roles to ensure they are available before rendering the table.
- Added new vars on the backend charts to pass auth url as dynamic
- Added ability for user to export PDF file in world map dialog view with different information (Ranges, Ratings, Year, Gate)
- Added Eclipse Room to ReadMe documentation

### Fixed
- Issue where roles could be undefined, causing an error when calling the includes method.
- Fixed logic for role validation when client token is not found

### Changed
- Changed client id for country risk app registered on portal

## [1.1.2] -  2023-05-17

### Changed
- Changed sonar token on properties
- Bumped version of Webpack to latest (5.80.0)
- Bumped version of Web-vitals to 3.1.1
- Changed Arc42 and User Guide documentation
- Changed react simple maps d3-color and d3-zoom top fix vulnerability
- Changed react scripts nth-check top fix vulnerability
- Changed transformation on jest to update modules when test runs
- Updated DEPENDENCIES file
- Change structure of helms charts

### Fixes
- Fixed copyright header in all charts
- Fixed useEffect of getAllDates on DatePicker with an error catcher
- Fixed owner on dockerfile permissions
- Fixed DEPENDENCIES file with newly scanned dependencies version

### Added
- Added .tractusx metafile defining leading repository
- Added new images on docs folder
- Add git helm chart test work flow
- New Umbrella Helm Chart added

## [1.1.1] - 2023-03-02

### Changed
- Changed file scripts/inject-dynamic-env.sh adding more dynamic vars into application
- Changed value  .securityContext.runAsUser   on values.yaml to run in the container as the same privileged user created on the dockerfile
- Changed copy command on docker file to a more clean sintaxis combining cp command with chwon command

### Removed
- Remove env files not used
- Remove images on public folder not used and not needed

### Fixes
- Fixed $REACT_APP_AUTH_URL from vars  to be reused on many more files-services for api calling using only common path

## [1.1.0] - 2023-02-22

### Changed

- Removing fixed hardcoded url and change with dynamic vars
- Added Vars to index.html

### Added
- Added script for injecting vars on nginx
- Added arq42 documentation
- Added UserGuide

### Fixes
- Fixed a bug in the Help Dialog regarding broken attachments that we´re missing

## [1.0.1] - 2023-02-21

### Changed

- Styling changes on some components according to portal style guidelines;
- Fix whitespace handling that removed apiVersion declaration from Helm templates;

### Added

- Added user information icon on right top corner and logout option;
- Added Help Button which has documentation explained how to use the application;

### Fixes

- Bug fix. Country selected manually by the user would not persist when the map dialog was opened;

## [1.0.0] - 2023-01-26

### Added

- First Release



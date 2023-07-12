# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - tbr

### Added
- Role-based column visibility in tables. 'Supplier' and 'Customer' columns are now hidden or shown based on user roles.
- Asynchronous fetching of roles to ensure they are available before rendering the table.

### Fixed
- Issue where roles could be undefined, causing an error when calling the includes method.

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



# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
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



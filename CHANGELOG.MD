# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

> Date format: YYYY-MM-DD

> If we have some "Breaking changes" we can mark it in message by `**BREAKING**` preffix, like:  
> `- **BREAKING**: Some message`

-------------

## TODOs
> Todo list for future

- ...

-------------

# 2.2.0 - 2021-06-16
### Added
- set a custom domain property. This is useful for where a business wants to use a custom cname instead of the default 
cloudimage.io URL.

# 2.1.0 - 2020-12-17
### Added

- Added possibility to change url and query string params before applying inside generateURL method. 
Now we can pass processURL and/or processQueryString to the config to control each image. 

# 2.0.8 - 2020-08-01
### Fixed
- correct fallback image size for Img and right Background img size according to DPR

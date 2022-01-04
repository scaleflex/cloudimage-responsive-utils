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
# 2.4.2 - 2021-01-04
### FIXED
- remove hardcoded ci_info query parameter to fix image caching
# 2.4.1 - 2021-12-09
### FIXED
- img-src starts with "//"
# 2.4.0 - 2021-11-08
### ADDED
- possibility to change api version

# 2.4.0-beta.4 - 2021-10-18
### FIXED
- problem with convertToPX function

# 2.4.0-beta.3 - 2021-10-14
### Changed
- better support for SSR (render placeholders with correct sizes via SSR stage)

# 2.3.0 - 2021-06-16
### Added
- new property: 

##### **imageSizeAttributes**

###### Type: **String** | possible values: 'use', 'ignore', 'take-ratio' | Default: **'use'** 

If width and height attributes are set:

**use** - width & height attributes values will be used to calculate image size (according to user's DPR) and **ratio**. 

**take-ratio** - width & height attributes values will be used only to calculate **ratio**.

**ignore** - width & height attributes will be ignored.

If width and height attributes are NOT set, image container size will be detected to calculate result image size (according to user's DPR)

*Note*: If only width or height attributes is set, ratio is going to be taken from ci-ratio image attribute

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

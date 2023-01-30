# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- towncrier release notes start -->

## [2.1.3] - 2023-01-30


### Fixed

- Wrong breadcrumb path when openening document/folder [issue#509](https://github.com/ciur/papermerge/issues/509)
- Empty page (no save button, no form controls) when adding new user/group [issue#513](https://github.com/ciur/papermerge/issues/513)


### Misc

- Upgrade to Ember 4.9 [issue#510](https://github.com/ciur/papermerge/issues/510)


## [2.1.2] - 2023-01-01


### Removed

- Adjust frontend to the backend which now runs without mptt [issue#501](https://github.com/ciur/papermerge/issues/501)


### Fixed

- Pagination should show correct current page [issue#487](https://github.com/ciur/papermerge/issues/487)


## [2.1.1] - 2022-12-24


### Fixed

- Show error message when uploaded file contains an invalid character e.g. '&' [issue#496](https://github.com/ciur/papermerge/issues/496)
- Do not allow folders and document with same title under same parent [issue#498](https://github.com/ciur/papermerge/issues/498)

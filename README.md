# mongoose-xlsx-data-importer

Javascript CLI Utility to convert excel xlsx to json and insert to MongoDB mongoose

# 🚀 Javascript full-stack 🚀

https://github.com/coding-to-music/mongoose-xlsx-data-importer

By Green Pioneer Solutions https://github.com/greenpioneersolutions

https://github.com/greenpioneersolutions/mongoose-xlsx-data-importer

## Environment Values

```java

```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/mongoose-xlsx-data-importer.git
git push -u origin main
# vercel --prod --confirm
```

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![dependencies](https://david-dm.org/greenpioneersolutions/mongoose-xlsx-data-importer.svg)](https://david-dm.org/greenpioneersolutions/mongoose-xlsx-data-importer)
[![npm-issues](https://img.shields.io/github/issues/greenpioneersolutions/mongoose-xlsx-data-importer.svg)](https://github.com/greenpioneersolutions/mongoose-xlsx-data-importer/issues)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[npm-image]: https://img.shields.io/npm/v/mongoose-xlsx-data-importer.svg?style=flat
[npm-url]: https://npmjs.org/package/mongoose-xlsx-data-importer
[downloads-image]: https://img.shields.io/npm/dt/mongoose-xlsx-data-importer.svg?style=flat
[downloads-url]: https://npmjs.org/package/mongoose-xlsx-data-importer

## Mongoose-Xlsx-Data-Importer

CLI for importing xlsx documents into mongodb or into straight json obj. Also you can run xlsx reports based on your db collections. You can create data from scratch and create custom schemas.

Try it out and let us know your thoughts

## Installation

```sh
$ npm i -g mongoose-xlsx-data-importer
```

```sh
mongoose-xlsx-data-importer $ MXDI
? What do you want to do? (Use arrow keys)
❯ Parse XLSX Data to File
  Parse XLSX Data to Mongoose
  Export Mongoose Collection to XLSX
  Check Mongo Connection
  Check Path
  Exit
```

How to write your excel files

```
//NOTE the TAB name is the key to the Mongoose Model Name
people,1_name  = {people:[{name:'jason'}]}
firstname = {firstname:'jason'}
name.first = {name:{first:'jason'}}
```

Gotchas

```
Capitalization - you must keep it consist
Schemas - you must create the schema with all fields if you wish to save all of the data
MLab - Yes you can connect to other servers just make sure your uri is absolutely correct & test with the check connection feature first
Custom Schema - We recommend just leaving the default value null but cause he have noticed odd scenarios with doing anything else
Xlsx tab names - properly name those as the schema names

```

## FAQ's

N/A

## Plan Going Forward so far

- Express Middleware

- Frontend Gui

- Create and save schema files

- Refactor

- Update with Standard JS

## License

The MIT License (MIT)

Copyright (c) 2014-2015 Green Pioneer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

### How to contribute

Support and contributions from the open source community are essential for keeping
Mean Stack JS up to date. We are always looking for the quality contributions and
will be happy to accept your Pull Requests as long as those adhere to some basic rules:

- Please make sure that your contribution fits well in the project's style & concept:
  - JS Standard
  - John Papa angular style guide
  - Pass All Test ( once testing has been fully implement)

### Creating an Issue

Before you create a new Issue:

- Check the [Issues](https://github.com/GreenPioneer/mongoose-xlsx-data-importer/issues) on Github to ensure one doesn't already exist.
- Place use one of these topics in the beginning of your issue title- Contrib, Hotfix, Error, Help or Feature.
- Clearly describe the issue, including the steps to reproduce the issue.
- If it's a new feature, enhancement, or restructure, Explain your reasoning on why you think it should be added, as well as a particular use case.

### Making Changes

- Create a topic branch from the development branch.
- Use `standard` to verify your style - `npm install -g standard` if you dont have it already
- Keep git commit messages clear and appropriate
- Make Sure you have added any tests necessary to test your code.
- Update the Documentation to go along with any changes in functionality / improvements in a separate pull request against the gh-pages branch.

### Submitting the Pull Request

- Push your changes to your topic branch on your fork of the repo.
- Submit a pull request from your topic branch to the development branch
- We use [GitFlow](https://guides.github.com/introduction/flow/)
- Be sure to tag any issues your pull request is taking care of / contributing to.
  - By adding "Closes #xyz" to a commit message will auto close the issue once the pull request is merged in.

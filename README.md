# github-owner-repos [![NPM version](https://img.shields.io/npm/v/github-owner-repos.svg?style=flat)](https://www.npmjs.com/package/github-owner-repos) [![NPM downloads](https://img.shields.io/npm/dm/github-owner-repos.svg?style=flat)](https://npmjs.org/package/github-owner-repos) [![Build Status](https://img.shields.io/travis/doowb/github-owner-repos.svg?style=flat)](https://travis-ci.org/doowb/github-owner-repos)

Get the github repositories for the specified owner or array of owners.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save github-owner-repos
```

## Usage

```js
var ownerRepos = require('github-owner-repos');
```

## API

### [ownerRepos](index.js#L45)

Get all of the repositories for the specified owner or array of owners. Owners may be users or organizations. The result is an object where each key is an owner name and each value is an array of repositories for that owner.

Specify a `filter` function on the options to reduce the number of repositories return.
Specify a `username` and `password` combo or a `token` to be used for authenticating to github
to increase the rate limit on the api. See [github-base](https://github.com/jonschlinkert/github-base) documentation for more information.

**Params**

* `owners` **{String|Array}**: Single or multiple owners.
* `options` **{Object}**: Additional options passed to [github-base](https://github.com/jonschlinkert/github-base) and used for filter.
* `options.filter` **{Function}**: Optional filter function used to filter out returned repos.
* `cb` **{Function}**: Optional callback function that will receive an `err` and `result` parameter. A promise is returned when the callback function is not provided.
* `returns` **{Promise}**: When a callback function is not provided, a promise is returned

**Example**

```js
var options = {
  // only return "source" repositories
  // these are when repo.fork === false
  filter: function(repo) {
    return !repo.fork;
  }
};

ownerRepos('doowb', options, function(err, result) {
  if (err) return console.error(err);
  console.log(result);
  //=> {
  //=>   doowb: [
  //=>     { name: ... },
  //=>     { name: ... },
  //=>     { name: ... }
  //=>   ]
  //=> }
});
```

## About

### Related projects

[github-base](https://www.npmjs.com/package/github-base): Base methods for creating node.js apps that work with the GitHub API. | [homepage](https://github.com/jonschlinkert/github-base "Base methods for creating node.js apps that work with the GitHub API.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/github-owner-repos/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 31, 2016._
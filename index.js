'use strict';

var Github = require('github-base');
var extend = require('extend-shallow');
var co = require('co');

/**
 * Get all of the repositories for the specified owner or array of owners.
 * Owners may be users or organizations. The result is an object where each
 * key is an owner name and each value is an array of repositories for that owner.
 *
 * Specify a `filter` function on the options to reduce the number of repositories return.
 * Specify a `username` and `password` combo or a `token` to be used for authenticating to github
 * to increase the rate limit on the api. See [github-base][] documentation for more information.
 *
 * ```js
 * var options = {
 *   // only return "source" repositories
 *   // these are when repo.fork === false
 *   filter: function(repo) {
 *     return !repo.fork;
 *   }
 * };
 *
 * ownerRepos('doowb', options, function(err, result) {
 *   if (err) return console.error(err);
 *   console.log(result);
 *   //=> {
 *   //=>   doowb: [
 *   //=>     { name: ... },
 *   //=>     { name: ... },
 *   //=>     { name: ... }
 *   //=>   ]
 *   //=> }
 * });
 * ```
 * @param  {String|Array} `owners` Single or multiple owners.
 * @param  {Object} `options` Additional options passed to [github-base][] and used for filter.
 * @param  {Function} `options.filter` Optional filter function used to filter out returned repos.
 * @param  {Function} `cb` Optional callback function that will receive an `err` and `result` parameter. A promise is returned when the callback function is not provided.
 * @return {Promise} When a callback function is not provided, a promise is returned
 * @api public
 */

module.exports = function ownerRepos(owners, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  owners = arrayify(owners);
  var opts = extend({}, options);

  var github = new Github(opts);
  var filter = typeof opts.filter === 'function'
    ? opts.filter
    : function() { return true; };

  var promise = co(function*() {
    return yield owners.reduce(function(acc, owner) {
      acc[owner] = co(function*() {
        var repos = yield getRepos(github, owner);
        return repos.filter(filter);
      });
      return acc;
    }, {});
  });

  if (typeof cb !== 'function') {
    return promise;
  }

  promise.then(function(results) {
    cb(null, results);
  }, cb);
};

/**
 * Helper method for getting repos for a single owner.
 *
 * @param  {Object} `github` The [github-base][] instance being used.
 * @param  {String} `owner` Name of the owner to get.
 * @return {Promise} Promise that will resolve with an array of repositories.
 */

function getRepos(github, owner) {
  return new Promise(function(resolve, reject) {
    github.getAll('/users/:user/repos', {user: owner}, function(err, results) {
      if (err) return reject(err);
      if (results && results.message && /rate limit exceeded/.test(results.message)) {
        return reject(new Error(results.message));
      }
      resolve(results);
    });
  });
}

/**
 * Arrayify
 *
 * @param  {Mixed} `val` A value to be arrayified
 * @return {Array} An array... also an array
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

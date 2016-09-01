'use strict';

require('mocha');
var assert = require('assert');
var githubOwnerRepos = require('./');

describe('github-owner-repos', function() {
  it('should export a function', function() {
    assert.equal(typeof githubOwnerRepos, 'function');
  });

  it('should get repositories for a single owner using a callback', function(cb) {
    githubOwnerRepos('update', function(err, result) {
      if (err) return cb(err);
      try {
        assert(result);
        assert(result.hasOwnProperty('update'));
        assert(Array.isArray(result.update));
        assert(result.update.length !== 0);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });

  it('should get repositories for a single owner using a promise', function(cb) {
    githubOwnerRepos('update')
      .then(function(result) {
        try {
          assert(result);
          assert(result.hasOwnProperty('update'));
          assert(Array.isArray(result.update));
          assert(result.update.length !== 0);
          cb();
        } catch (err) {
          cb(err);
        }
      }, cb);
  });

  it('should get repositories for mulitple owners', function(cb) {
    this.timeout(20000);
    githubOwnerRepos(['doowb', 'update'], function(err, result) {
      if (err) return cb(err);
      try {
        assert(result);
        assert(result.hasOwnProperty('doowb'));
        assert(result.hasOwnProperty('update'));
        assert(Array.isArray(result.doowb));
        assert(Array.isArray(result.update));
        assert(result.update.length !== 0);
        assert(result.doowb.length !== 0);
        cb();
      } catch (err) {
        cb(err);
      }
    });
  });
});

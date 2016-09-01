'use strict';

var ownerRepos = require('../');
var owners = [
  'doowb',
  'generate'
];

var options = {
  // Uncomment the following 2 lines and add your username and password if you run into a rate-limit error.
  // username: '',
  // password: '',
  filter: function(repo) {
    return !repo.fork;
  }
};

ownerRepos(owners, options, function(err, results) {
  if (err) {
    console.error('error', err);
    process.exit(1);
  }
  console.log(JSON.stringify(results, null, 2));
  process.exit();
});

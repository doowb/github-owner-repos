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

  // loop over the results and only get the star counts for the repositories
  results = Object.keys(results).reduce(function(acc, key) {
    var repos = results[key];
    acc[key] = { stars: 0 };
    acc[key].repos = repos.map(function(repo) {
      var stars = repo.stargazers_count || 0;
      acc[key].stars += stars;
      return {name: repo.full_name, stars: stars};
    });
    return acc;
  }, {});

  console.log(JSON.stringify(results, null, 2));
  process.exit();
});

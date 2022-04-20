'use strict';

// https://github.com/pevers/images-scraper/blob/master/src/index.js

var Scraper = require('./google/scraper');

let google = new Scraper();

(async () => {
  const results = await google.scrape('asgdfdsfgd asdhjg', 10); // Or ['banana', 'strawberry'] for multi-queries
  console.log('results', results);
  console.log(results.length, ' results found')

})();



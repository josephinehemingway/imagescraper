'use strict';

// https://github.com/pevers/images-scraper/blob/master/src/index.js

var Scraper = require('./google/scraper');

let google = new Scraper();

async function search(query, limit)  {
  const results = await google.scrape(query, limit); // Or ['banana', 'strawberry'] for multi-queries
  // console.log('results', results);
  console.log(results.length, ' results found')

  console.log(JSON.stringify(results))

  const results_string = JSON.stringify(results)
  return JJSON.stringify(results)
};

search('ocean', 10);


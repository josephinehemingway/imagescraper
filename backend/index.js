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
  return results
};

async function download(selected, searchterm) {
  await google.downloadMultiple(selected, searchterm);
  console.log(selected);
}

var searchterm = 'ocean'

let res = search(searchterm, 10);
res.then(function(result) {
  console.log(searchterm)
  download(result, searchterm);
})



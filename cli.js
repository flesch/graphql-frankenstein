#!/usr/bin/env node

'use strict';

const meow = require('meow');
const frankenstein = require('./');
const { printSchema } = require('graphql');

const frank = meow(`

	Usage
	  $ frankenstein <repository> --labels <labels>

  Options
    --labels, -l   A comma separated list of issue labels.
    --verbose, -v  Print errors instead of failing silently.

	Examples
    $ frankenstein flesch/graphql-frankenstein --labels "#frankenstein"
    $ frank flesch/graphql-frankenstein -l frankenstein,publish
    $ frankenstein flesch/graphql-frankenstein -l publish > schema.graphql

`, { alias: { r:'repo', l:'labels', v:'verbose' } });

const [ repo ] = frank.input;
const { labels = '', verbose = false } = frank.flags;

if (repo) {
  frankenstein(repo, labels.split(',')).then(schema => console.log(printSchema(schema))).catch(e => {
    if (verbose) {
      console.log(e);
    }
  });
} else {
  if (verbose) {
    console.error(`Error: Repository is not defined!`);
  }
}

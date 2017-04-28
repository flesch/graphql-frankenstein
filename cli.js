#!/usr/bin/env node

'use strict';

const meow = require('meow');
const frankenstein = require('./');
const { printSchema } = require('graphql');

const frank = meow(`

	Usage
	  $ frankenstein <repository> --labels <labels>

  Options
    --labels, -l  A comma separated list of issue labels.

	Examples
	  $ frankenstein flesch/graphql-frankenstein --labels "#frankenstein"
    $ frank flesch/graphql-frankenstein -l frankenstein,publish
    $ frankenstein flesch/graphql-frankenstein -l publish > schema.graphql

`, { alias: { r:'repo', l:'labels' } });

const [ repo ] = frank.input;
const { labels = '' } = frank.flags;

if (repo) {
  frankenstein(repo, labels.split(',')).then(schema => console.log(printSchema(schema))).catch(e => console.log());
}

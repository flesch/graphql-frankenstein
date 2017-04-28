'use strict';

const { get } = require('gh-got');
const flatten = require('arr-flatten');
const extractCodeBlocks = require('gfm-code-blocks');
const { buildSchema } = require('graphql');

const frankenstein = (repo, labels = []) => {
  return get(`repos/${repo}/issues`, { query:{ state:'all', labels:labels.join(',') } }).then(({ body:issues }) => {
    const fragments = flatten(issues.map(issue => {
      const codeBlocks = extractCodeBlocks(issue.body).filter(block => /graphql/.test(block.lang));
      return codeBlocks.map(block => block.code);
    }));
    return buildSchema(fragments.join('\n\n'));
  });
};

module.exports = frankenstein;

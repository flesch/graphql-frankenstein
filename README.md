# graphql-frankenstein <img alt="graphql-frankenstein" src="https://cloud.githubusercontent.com/assets/13259/25294561/53dd4cc8-26a5-11e7-94de-8d96eb321def.png" width="100" align="right">

Stitch together GraphQL fenced code blocks inside GitHub issues as an executable schema.

My team is using GitHub Issues to collaborate on different parts of our GraphQL schema — each distinct part of the schema includes a fenced code block, allowing us to build our schema in pieces. See [this repo's issues](https://github.com/flesch/graphql-frankenstein/issues) for an example of how this looks.

**graphql-frankenstein** will grab each `graphql` fenced code block across a repo's issue and build a working schema.

**graphql-frankenstein** only needs 2 things: A repository where your `graphql` issues are defined, and a list of labels to filter those issues (e.g. only build a schema from issues labeled with `#frankenstein` in **flesch/graphql-frankenstein**).

## Installation / Usage

**graphql-frankenstein** can be used as either a dependency in your Node project, or a standalone CLI app.

#### JavaScript

```bash
$ npm install --save graphql-frankenstein
```

```js
const frankenstein = require('graphql-frankenstein');
const { GraphQLSchema } = require('graphql');

frankenstein('flesch/graphql-frankenstein', ['#frankenstein'])
  .then(schema => {

    console.log(schema instanceof GraphQLSchema);

  }).catch(e => console.error(e));
```

#### CLI

```bash
$ npm install --global graphql-frankenstein
```

```bash
$ frankenstein --help

  Usage
    $ frankenstein <repository> --labels <labels>
    $ frank <repository> -l <labels>

  Options
    --labels, -l  A comma separated list of issue labels.

	Examples
      $ frankenstein flesch/graphql-frankenstein --labels "#frankenstein"
      $ frank flesch/graphql-frankenstein -l frankenstein,publish
      $ frankenstein flesch/graphql-frankenstein -l publish > schema.graphql

```

## License

MIT &copy; [John Flesch](https://github.com/flesch)

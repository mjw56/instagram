const { GraphQLSchema } = require('graphql');
const QueryType = require('./schema');

module.exports = new GraphQLSchema({
  query: QueryType,
});
/**
 * Fetch data from GraphQL
 * @param query the graphQL query string
*/
module.exports = async (query) => {
  const { graphql } = require('graphql');
  const schema = require('../shared/graphql');
  
  const data = await graphql(schema, query);
  return data;
}

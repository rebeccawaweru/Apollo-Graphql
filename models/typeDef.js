const gql = require("graphql-tag")

// const typeDefs = gql `
//    type Query {
//     greetings: String
//    }
// `;
const typeDefs = gql `
    type Query {
        greetings: String
        welcome(name:String!):String
    }
`;

module.exports = { typeDefs }

//The type Query is the root of the schema. 
//graphql-tag this allows us write GraphQL queries and mutations as template literals which are then parsed as abstract syntax tree (AST) that represents the query.
//This AST can then be passed to a GraphQL client or server, such as Apollo. It allows us to embed GraphQL queries and mutations directly into our code in a simple and efficient manner.
//ALso to access typeDefs outside the module, typeDefs template was exported using module.exports.
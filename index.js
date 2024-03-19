//ApolloServer = schema types +  resolver
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone");
const {resolvers} = require("./resolvers.js");
const {typeDefs} = require('./models/typeDef.js');

const server = new ApolloServer({ typeDefs, resolvers});

startStandaloneServer(server, {
    listen: { port: 5000},
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
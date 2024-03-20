//ApolloServer = schema types +  resolver
const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require("@apollo/server/standalone");
const {resolvers} = require("./resolvers.js");
const {typeDefs} = require('./models/typeDef.js');

//create connection to database
const MONGO_URI = process.env.MONGO_URI;
const server = new ApolloServer({ typeDefs, resolvers});

mongoose.connect(MONGO_URI)
.then(()=>{console.log("Database connected")})
.catch(err => console.log(err.message))

startStandaloneServer(server, {
    listen: { port: 5000},
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
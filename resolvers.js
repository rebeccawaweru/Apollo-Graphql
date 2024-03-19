//Resolvers are responsible for populating data into schema fields. They are functions that handle data for each field defined in the schema.
const resolvers = {
    Query: {
        greetings: () => "GraphQL is Awesome",
        welcome: (parent, args) => `Hello ${args.name}`
    },
};

module.exports = { resolvers };

//In the code above we created a resolvers function that returns a string when the greetings field is queried.
//The resolver function acts as a GraphQL query handler, they must match a field name defined in the Schema.

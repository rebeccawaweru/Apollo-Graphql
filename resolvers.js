//Resolvers are responsible for populating data into schema fields. They are functions that handle data for each field defined in the schema.
const { Student } = require('./models/Student')
const resolvers = {
    Query: {
        greetings: () => "GraphQL is Awesome",
        welcome: (parent, args) => `Hello ${args.name}`,
        getStudents: async(parent, args) => await Student.find({}),
        student: async (parent, args) => await Student.findById(args.id)
    },
    Mutation: {
        createStudent: async (parent, args) => {
            const { firstName, lastName, age } = args;
            const newStudent = new Student({
                firstName,
                lastName,
                age,
            });
            await newStudent.save();
            return newStudent;
        },
        update: async(parent, args) => {
            const { id } = args;
            const result = await Student.findByIdAndUpdate(id, args);
            if (!result) {
                throw new Error('Error updating student')
            }
            return result;
        },
        delete: async(parent, args) => {
            const {id} = args;
            const result = await Student.findByIdAndDelete(id);
            if (!result) {
                throw new Error('Error deleting student')
            }
            return result
        }
    }
};

module.exports = { resolvers };

//In the code above we created a resolvers function that returns a string when the greetings field is queried.
//The resolver function acts as a GraphQL query handler, they must match a field name defined in the Schema.

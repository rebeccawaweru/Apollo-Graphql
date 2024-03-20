import {gql} from 'graphql-tag'

export const GET_STUDENTS = gql`
query GetStudents {
  getStudents {
    id
    firstName
    lastName
    age
  }
}
`;

export const CREATE_STUDENT = gql`
  mutation createStudent($firstName:String!, $lastName:String!, $age:Int!){
    createStudent(firstName:$firstName, lastName:$lastName, age:$age){
        firstName
        lastName
        age
    }
  }
`

export const UPDATE_STUDENT = gql `
    mutation UpdateStudent($id: ID!, $firstName: String!, $lastName: String!, $age: Int!){
        update(id:$id, firstName:$firstName, lastName:$lastName, age:$age) {
            firstName
            lastName
            age
        }
    }
`

export const DELETE_STUDENT = gql `
    mutation DeleteUser($id: ID!) {
        delete(id: $id){
            id
            firstName
            lastName
            age
        }
    }
`
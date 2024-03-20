import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, useMutation} from '@apollo/client'
import {gql} from 'graphql-tag'
import { CREATE_STUDENT, GET_STUDENTS, UPDATE_STUDENT,DELETE_STUDENT } from './typeDef';


function App() {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT)
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    firstName:'',
    lastName:'',
    age:0
  })
  const handleChange = (e) => {
    const {name, value} = e.target
   setStudent((prevState) => ({...prevState, [name]:value}))
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {data} = await createStudent({
      variables:{
        firstName:student.firstName,
        lastName:student.lastName,
        age:Number(student.age)
      }
    })
    console.log(data)    
  }
  useEffect(()=>{
    if (data) {
      setStudents(data.getStudents)
      console.log(data.getStudents)
    }
  },[data])


  return (
    <div className="App">
    {students.length > 0 ? students.map((s)=>{
        return <div key={s.id}><p>{s.firstName} {s.lastName}</p></div>
    }) : <p>No students found</p>}
    <form onSubmit={handleSubmit}>
    <input type='text' placeholder='first name' name='firstName' onChange={handleChange}/>
    <input type='text' placeholder='last name' name='lastName' onChange={handleChange}/>
    <input type='number' placeholder='age' name='age' onChange={handleChange}/>
    <button type="submit">Add</button>
    </form>
    </div>
  );
}

export default App;

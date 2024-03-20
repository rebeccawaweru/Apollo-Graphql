import { useEffect, useState } from 'react';
import './App.css';
import { useQuery, useMutation} from '@apollo/client'
import { CREATE_STUDENT, GET_STUDENTS, UPDATE_STUDENT,DELETE_STUDENT } from './typeDef';


function App() {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [createStudent] = useMutation(CREATE_STUDENT)
  const [updateStudent] = useMutation(UPDATE_STUDENT)
  const [deleteStudent] = useMutation(DELETE_STUDENT)
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
  const handleUpdate = async(id)=>{
    const {data} = await updateStudent({
      variables:{
        id,
        firstName:"Abel",
        lastName:"Marite",
        age:60
      },
      refetchQueries:[{ query: GET_STUDENTS}]
    })
    console.log(data)
  }
  const handleDelete = async(id) => {
      const {data} = await deleteStudent({
        variables:{ id },
        refetchQueries:[{ query: GET_STUDENTS}]
      })
      console.log(data)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {data} = await createStudent({
      variables:{
        firstName:student.firstName,
        lastName:student.lastName,
        age:Number(student.age)
      },
      refetchQueries:[{ query: GET_STUDENTS}]
    })
    console.log(data)   
    setStudent({ firstName: '', lastName: '', age: '' });  
  }
  useEffect(()=>{
    if (data) {
      setStudents(data.getStudents)
    }
  },[data])


  return (
    <div className="App">
    {data && data.getStudents.length > 0 ? data.getStudents.map((s)=>{
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center"}} key={s.id}><p>{s.firstName} {s.lastName}</p><button onClick={()=>handleUpdate(s.id)}>Edit</button> <button onClick={()=>handleDelete(s.id)}>Delete</button></div>
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

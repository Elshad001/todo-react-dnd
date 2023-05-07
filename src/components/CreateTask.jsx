import React, { useState } from 'react'
import { v4 as uuidv4} from 'uuid'


const CreateTask = ({tasks,setTasks}) => {
  const [task,setTask]= useState({
     id:'',
     name:'',
     status:'todo'
  });

console.log(task)

const handleSubmit=(e)=>
{
  e.preventDefault();

  

  setTasks((prev)=>
  {
    const list=[...prev,task];
    return list
  });

setTask({
  id:'',
  name:'',
  status:'todo',
})


};

  return (
    <div className='create'>
      <form onSubmit={handleSubmit} className='form'>
        <input 
           placeholder='Write your task...'
           className='create-input'
           type='text'
           value={task.name}
            onChange={(e)=>setTask({...task,id: uuidv4(),name:e.target.value})}
         />
        <button className='create-btn'>Create</button>
      </form>
    </div>
  )
}

export default CreateTask

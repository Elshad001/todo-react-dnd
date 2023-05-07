import React, { useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {TiDeleteOutline} from 'react-icons/ti'
const ListTasks = ({ tasks, setTasks }) => {

  console.log(tasks)

  const [todos, setTodos] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [closed, setClosed] = useState([])

  useEffect(() => {

    const fTodos = tasks.filter((task) => task.status === 'todo');
    const fInProgress = tasks.filter((task) => task.status === 'inprogress');
    const fClosed = tasks.filter((task) => task.status === 'closed');

    setTodos(fTodos)
    setInProgress(fInProgress)
    setClosed(fClosed)

  }, [tasks])

  const statuses = ['todo', 'inprogress', 'closed']

  return (
    <div className='lists'>
      {statuses.map((status, index) => <Section key={index} status={status}
        tasks={tasks} setTasks={setTasks}
        todos={todos} inProgress={inProgress} closed={closed}
      />)}
    </div>
  )
}

export default ListTasks


const Section = ({ status,tasks,setTasks,todos,inProgress,closed }) => {
  
  const [{isOver},drop] = useDrop(()=>
  ({
    accept:'task',
    drop:(item)=>addItemToSection(item.id),
    collect:(monitor)=>
    ({
      isOver:!!monitor.isOver(),
    })

  }))

  let text="Todo"
  let tasksToMap=todos

  if(status === 'inprogress')
  {
    text= "Doing"
    tasksToMap=inProgress
  }

  if(status === 'closed')
  {
    text= "Done"
    tasksToMap=closed
  }

  const addItemToSection=(id)=>{

   setTasks((prev)=>{

      const mTasks=prev.map(t =>{
        if(t.id===id){
          return {...t,status:status}
        }
        return t
      })
      return mTasks;
   });
  }

  return(
     <div ref={drop} className='task-box'>
      <Header text={text} count={tasksToMap.length}/>
      {tasksToMap.length >0 && tasksToMap.map(task=> <Task 
      key={task.id}
      task={task}
      tasks={tasks}
      setTasks={setTasks}
      />)}
      </div>
  ) 
}

const Header = ({ text,bg,count }) => {
  return <div className={`${bg} header-list`}>{text}
  <div>{count}</div>
  </div>
}

const Task = ({task,tasks,setTasks}) => {

  const [{isDragging},drag] = useDrag(()=>
  ({
    type:'task',
    item:{id:task.id},
    collect:(monitor)=>
    ({
      isDragging:!!monitor.isDragging(),
    })

  }))


const handleRemove=(id)=>
{
  console.log(id)
  const fTasks = tasks.filter(t=>t.id!==id)
  setTasks(fTasks)
}


  return (
  <div className='task'
  ref={drag}
    >
    <p className='task-content'>{task.name}</p>
    <TiDeleteOutline className='del-icon' onClick={()=>handleRemove(task.id)}/>
  </div>
  )
}
import React,{useState} from 'react'
import CreateTask from './components/CreateTask';
import ListTasks from './components/ListTasks'
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const[tasks,setTasks]=useState([]);

  return (
    
        <DndProvider backend={HTML5Backend}>
          <div>
            <CreateTask tasks={tasks} setTasks={setTasks}/>
            <ListTasks tasks={tasks} setTasks={setTasks}/>
          </div>
        </DndProvider>
  )
}

export default App

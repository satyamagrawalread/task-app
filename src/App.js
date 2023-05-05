import React, { useState, useEffect } from 'react';
import './animate.css';
import './App.css';
import { AiOutlinePlus, AiFillMinusSquare } from 'react-icons/ai'

import TaskList from './features/task-list';
import TaskForm from './features/task-form';


// const DEFAULT_STATE = [
//   { id: 1, title: "Learn React", completed: false, category: "wip" },
//   { id: 2, title: "Master JavaScript", completed: true, category: "complete" },
//   { id: 3, title: "Master Node.js", completed: false, category: "wip" },
//   { id: 4, title: "Master Angular", completed: false, category: "wip" },
//   { id: 5, title: "Learn Full Stack", completed: false, category: "wip" },
// ];
const format = {
  id: 1, title: "Learn React", completed: false, category: "wip" 
}


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [form, showTaskForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskForEdit, setTaskForEdit] = useState({})
  const [taskSize, setTaskSize] = useState(() => {
    const saved = localStorage.getItem("taskSize");
    const initialValue = JSON.parse(saved);
    console.log("My initial value", saved);
    return initialValue || 0;
  })

  useEffect(() => {
    // storing input name
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // storing input name
    localStorage.setItem("taskSize", JSON.stringify(taskSize));
  }, [taskSize]);


  const onShowTaskForm = () => {
    showTaskForm(prev => !prev);
    //showTaskForm(!form);
  }

  const onDragStart = (e, id) => {
    console.log("onDragStart: ", id);
    e.dataTransfer.setData("text/plain", id);
  }

  const onDragOver = (e) => {
    e.preventDefault();
    console.log("onDrapOver...");
  }

  const onDrop = (e, cat) => {
    console.log("Dropped: ", cat);
    console.log(e.dataTransfer.getData("text/plain"));
    let id = e.dataTransfer.getData("text/plain");
    let updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed;
        task.category = cat;
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  // Handle Delete task
  const handleDelete = (id) => {
    console.log(id);
    let inc = 0;
    let updatedTasks = tasks.filter((task) => {
      if (task.id != id) {
        inc+=1;
        task.id = inc;
        return task;
      }
    })
    setTaskSize(inc);
    console.log("My Updated Tasks", updatedTasks);
    setTasks(updatedTasks);
    console.log("Task updated");
    console.log(ui);
  }

  // Handle Edit task
  const handleEdit = (task) => {
    setTaskForEdit(task);
    setIsEditing(!isEditing);
    onShowTaskForm();
  }
  const onEditTask = (title, detail, date) => {
    const updatedTasks = tasks.map((task) => {
      if(taskForEdit!="" && task.id==taskForEdit.id) {
        task.title = title;
        task.detail = detail;
        task.date = date;
      }
      return task;
    })
    setTasks(updatedTasks);
    setIsEditing(!isEditing);
    setTaskForEdit("")
    onShowTaskForm();
  }

    
  const onAddTask = (title, detail, date) => {
    let newTask = {
      id: taskSize+1,
      title: title,
      detail: detail,
      date: date,
      completed: false,
      category: "wip"
    }
    setTaskSize(taskSize+1);
    setTasks([...tasks, newTask]);
    onShowTaskForm();
  }

  

  let ui = {
    wip: [],
    complete: [],
    inc: 1
  }

  tasks.forEach((t) => {
    ui[t.category].push(t);
  });
  console.log(tasks);

  return (
    <div className="container-fluid">
      <div className="row">
        <TaskForm show={form} onHide={onShowTaskForm}
          onNewTask={onAddTask} onEditTask={onEditTask} edit={isEditing} taskForEdit={taskForEdit} setTaskForEdit={setTaskForEdit} />
      </div>
      <div className="row">
        <h2 className="app-header">
          TASK APP
          <AiOutlinePlus style={{ color: "white" }} onClick={onShowTaskForm} />
        </h2>
        <div className="col-md-9"
          onDragOver={onDragOver}
          onDrop={(e) => { onDrop(e, "wip") }}>
          <div className="wrapper">
            <TaskList tasks={ui.wip} onDragStart={onDragStart} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>

        <div className='col-md-9 completed-section droppable'
          onDragOver={onDragOver}
          onDrop={(e) => { onDrop(e, "complete") }}>
          <div className='row'>
            <h6 className='completed-header mb-0'>COMPLETE</h6>
          </div>
          <div className='wrapper'>
            <TaskList tasks={ui.complete} onDragStart={onDragStart} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
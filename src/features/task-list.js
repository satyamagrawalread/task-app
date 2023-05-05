import React from 'react';
import { AiFillMinusSquare, AiFillEdit } from 'react-icons/ai';

export default function TaskList({tasks, onDragStart, handleDelete, handleEdit}) {
    // const [isEditing, setIsEditing] = useState(false);
    return tasks.map((task) => {
    // let classNames= `${task.completed ? "complete": "incomplete"}`;
      return (
        <div key={task.id} className={`task wip`}
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}>
            <div className='task-list-1'>

              <h5>{task.title}</h5>
              <AiFillMinusSquare onClick={() => handleDelete(task.id)}/>
              <AiFillEdit onClick={() => handleEdit(task)}/>
              <div>
                <h6>{task.detail}</h6>
              </div>
              <div>
                <h6>{task.date}</h6>
              </div>
            </div>
            <h5>{task.category}</h5>
        </div>
      )
    })
  }
  
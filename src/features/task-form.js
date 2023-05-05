import React, {useState} from 'react';

function TaskForm({show, onHide, onNewTask, onEditTask, edit, taskForEdit, setTaskForEdit}) {
  const dynammicModalClass = () => (show ? { display: 'block' } : '');
  const [taskTitle, setTitle] = useState("");
  const [taskDetail, setDetail] = useState("");
  const [taskDate, setDate] = useState("");

  // console.log("My title", taskForEdit.title);
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    if(edit) {
      onEditTask(taskForEdit.title, taskForEdit.detail, taskForEdit.date);
    }
    else {
      onNewTask(taskTitle, taskDetail, taskDate);
    }
    setTitle("");
    setDetail("");
    setDate("");
  }
  // const title = edit ? taskForEdit.title : "";
  
  if (!show) return null;
  return (
    // <div className="modal animated rotateIn"  
    //   style={dynammicModalClass()}>
    //   <div className="modal-dialog modal-dialog-centered">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">NEW TASK</h5>
    //         <button onClick={onHide}type="button" 
    //           className="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //      </div>
    //      <div className="modal-body">
    //         <form onSubmit={onFormSubmit}>
    //           <div className="form-group">
    //             <label htmlFor="title">Task Title</label>
    //             <input className="form-control" id="title"
    //               type="text" onChange={(e) => setTitle(e.target.value)} />
    //           </div>
    //           <button type="submit" className="btn btn-primary">SAVE</button>
    //         </form>
    //      </div>
    //     </div>
    //   </div>
    // </div>

    <div className='modal animated rotateIn'>
      <div className='task-form-col-1'>
        <div className='task-form-row-1'>
        <h5 className="modal-title">NEW TASK</h5>
        <button onClick={onHide}type="button" 
          className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className='task-form-row-2'>
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
              <label htmlFor="title">Task Title &nbsp;&nbsp;</label>
              <input className="form-control" id="title"
              type="text" autoFocus={true} value={edit ? taskForEdit.title : taskTitle} onChange={(e) => {
                if(edit) {
                  const updated = taskForEdit;
                  updated.title = e.target.value;
                  setTaskForEdit(updated);
                }
                setTitle(e.target.value)
              }} />
          </div>
          <div>
          <label htmlFor="detail">Task Detail</label>
              <input className="form-control" id="detail"
              type="text" value={edit ? taskForEdit.detail : taskDetail} onChange={(e) => {
                if(edit) {
                  const updated = taskForEdit;
                  updated.detail = e.target.value;
                  setTaskForEdit(updated);
                }
                setDetail(e.target.value)
              }} />
          </div>
          <div>
          <label htmlFor="date">Task Date &nbsp;</label>
              <input className="form-control" id="date"
              type="date" value={edit ? taskForEdit.date : taskDate} onChange={(e) => {
                if(edit) {
                  const updated = taskForEdit;
                  updated.date = e.target.value;
                  setTaskForEdit(updated);
                }
                setDate(e.target.value)
              }} />
          </div>
              <button type="submit" className="btn btn-primary">{edit ? "EDIT" : "SAVE"}</button>
            </form>
        </div>
      </div>
    </div>
    
  )
}

export default TaskForm;
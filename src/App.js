import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import union from "./assets/Union.png";
import iicon from "./assets/i.png";
import edit from "./assets/edit.png";
import cross from "./assets/cross.png";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [task, setTask] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [editIndex, setEditIndex] = useState();
  const [editing, setEditing] = useState(false);

  const addTaskMethod = () => {
    if (editing) {
      if (title && description) {
        task[editIndex] = { title: title, description: description };
        setTask(task);
        setTitle("");
        setDescription("");
        setEditIndex(null);
        setEditing(false);
      }
    } else {
      if (title && description) {
        setTask([...task, { title: title, description: description }]);
        setTitle("");
        setDescription("");
      }
    }
  };
  const handleIButton = (item, index) => {
    setEditIndex(index);
    setTitle("");
    setDescription("");
  };

  const editTaskMethod = (item, index) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditing(true);
  };
  const deleteTaskMethod = (item, index) => {
    if(window.confirm("Delete this task ?")){
      task.splice(index, 1);
      setTask(task);
      setEditIndex(null);
      setEditing(false);
      setTitle("");
      setDescription("");
    }
    
  };
  return (
    <>
      <div className="main_div">
        <div className="App d-flex justify-content-center flex-column align-items-center">
          <div className="section_1 w-100">
            <h3 className="s1_h2">GYIZER</h3>
            <p className="s1_p">TODO APP</p>
          </div>

          <div className="section_2 w-100">
            <div className="inputFields">
              <input
                class="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title..."
              />
              {!editing ? (
                <input
                  class="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Input..."
                />
              ) : (
                <textarea
                  rows={3}
                  class="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Input..."
                />
              )}
            </div>
            <button className="btn_cls" onClick={(e) => addTaskMethod()}>
              {editing ? (
                <span class="text-white">Update</span>
              ) : (
                <img src={union} width="20px" height="20px" alt="union" />
              )}
            </button>
          </div>
          <div className="section_3 d-flex flex-wrap ">
            {task[0] ? (
              task.map((item, index) => (
                <div class="text-white d-flex justify-content-between align-items-center containerTask">
                  <div class="w-75">
                    <h5 class="titletext">{item?.title}</h5>
                    <div class="titletext">{item?.description}</div>
                  </div>
                  {editIndex != index ? (
                    <div
                      class="smButton"
                      onClick={() => handleIButton(item, index)}
                    >
                      <img src={iicon} alt="info" />
                    </div>
                  ) : (
                    <div class="d-flex ">
                      <div
                        class="smButton me-2"
                        onClick={() => editTaskMethod(item, index)}
                      >
                        <img src={edit} alt="info" />
                      </div>
                      <div
                        class="smButton"
                        onClick={() => deleteTaskMethod(item, index)}
                      >
                        <img src={cross} alt="info" />
                      </div>
                    </div>
                  )}
                </div>
              
              ))
            ) : (
              <div class="notaskdiv">
                <span></span>
                <h4 class="text-white">No Tasks</h4>
                <span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

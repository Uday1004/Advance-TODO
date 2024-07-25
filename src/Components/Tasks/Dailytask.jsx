import React, { useState, useEffect } from "react";
import { db } from "../Firesebase/Firebase";
import { ref, set, get, push, remove } from "firebase/database";
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';
import { CheckOutline } from "@rsuite/icons";

function DailyTasks() {
  const [dailyTask, setDailyTask] = useState("");
  const [dailyTasks, setDailyTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [popupTask, setPopupTask] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const dailyTasksRef = ref(db, "dailyTasks");
        const snapshot = await get(dailyTasksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDailyTasks(
            Object.entries(data).map(([id, task]) => ({ id, ...task }))
          );
        } else {
          console.log("No daily tasks available");
        }
      } catch (error) {
        console.error("Error fetching daily tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddDailyTask = () => {
    const dailyTasksRef = ref(db, "dailyTasks");
    const newTaskRef = push(dailyTasksRef);
    set(newTaskRef, { task: dailyTask })
      .then(() => {
        setDailyTasks([...dailyTasks, { id: newTaskRef.key, task: dailyTask }]);
        setDailyTask("");
        console.log("Daily task added successfully");
        alert("Task added to your Daily Tasks");
      })
      .catch((error) => {
        console.error("Error adding daily task", error);
      });
  };

  const handleDeleteTask = (id) => {
    const taskRef = ref(db, `dailyTasks/${id}`);
    remove(taskRef)
      .then(() => {
        setDailyTasks(dailyTasks.filter((task) => task.id !== id));
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  const handleEditTask = (id, task) => {
    setEditingIndex(id);
    setEditingTask(task);
  };

  const handleBlur = (id) => {
    if (editingIndex !== null) {
      const taskRef = ref(db, `dailyTasks/${id}`);
      set(taskRef, { task: editingTask })
        .then(() => {
          setDailyTasks(
            dailyTasks.map((task) =>
              task.id === id ? { id, task: editingTask } : task
            )
          );
          setEditingIndex(null);
          setEditingTask("");
          console.log("Task edited successfully");
        })
        .catch((error) => {
          console.error("Error editing task", error);
        });
    }
  };

  const handleCheckTask = (id) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div
      className="container  col mx-auto d-flex flex-column"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "0.25rem",
        width: "23rem",
        maxWidth: "25rem",
        height: "70vh",
        position: "relative",
        marginTop: "-10rem", // Adjust marginTop to space from the top
        marginBottom: "1rem",
      }}
    >
      <h5 className="mb-4">My Daily Tasks</h5>
      <div
        className="task-list px-1 flex-grow-1"
        style={{
          height: "calc(100% - 4rem)",
          overflowY: "auto",
          marginBottom: "1rem",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <ul className="list-group" style={{ padding: "0", margin: "0" }}>
          {dailyTasks.map(({ id, task }) => (
            <li
              key={id}
              className="list-group-item d-flex flex-column justify-content-between align-items-start"
              style={{
                padding: "0.5rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "0.25rem",
                marginBottom: "0.5rem",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <div className="d-flex align-items-center w-100">
                <button
                  className={`btn btn-sm mr-2 ${checkedTasks[id] ? 'btn-outline-danger' : 'btn-outline-success'}`}
                  onClick={() => handleCheckTask(id)}
                >
                   {checkedTasks[id] ? <CloseIcon/>:<CheckOutline/>}
                </button>
                {editingIndex === id ? (
                  <input
                    type="text"
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    onBlur={() => handleBlur(id)}
                    autoFocus
                    className="form-control mr-2"
                    style={{ flex: "1" }}
                  />
                ) : (
                  <span
                    className="task-text"
                    style={{
                      flex: "1",
                      cursor: "pointer",
                      margin: "0px 7px",
                    }}
                    onClick={() => setPopupTask(task)}
                  >
                    <p
                      style={{
                        textDecoration: checkedTasks[id]
                          ? "line-through"
                          : "none",
                        color: checkedTasks[id] ? "#a1a1a1" : "inherit",
                        fontWeight:'bold'
                      }}
                    >
                      {task}
                    </p>
                  </span>
                )}
              </div>
              {editingIndex !== id && (
                <div className="mt-2 d-flex justify-content-between w-100">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleEditTask(id, task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteTask(id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <footer
        className="form-group d-flex align-items-center mb-2 mt-2"
        style={{ position: "relative", width: "100%" }}
      >
        <input
          type="text"
          name="text"
          value={dailyTask}
          onChange={(e) => setDailyTask(e.target.value)}
          placeholder="Write your daily task"
          className="form-control"
          style={{ flex: "1" }}
        />
        <button
          className="btn btn-outline-primary"
          onClick={handleAddDailyTask}
          style={{ marginLeft: "10px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </footer>
      {popupTask && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "0.25rem",
          }}
        >
          <p>{popupTask}</p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPopupTask(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DailyTasks;

import React, { useState, useEffect } from "react";
import { db } from "../Firesebase/Firebase";
import { ref, set, get, push, remove } from "firebase/database";

function DailyTasks() {
  const [dailyTask, setDailyTask] = useState("");
  const [dailyTasks, setDailyTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [popupTask, setPopupTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const dailyTasksRef = ref(db, "dailyTasks");
        const snapshot = await get(dailyTasksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDailyTasks(Object.entries(data).map(([id, task]) => ({ id, ...task })));
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
        setDailyTasks(dailyTasks.filter(task => task.id !== id));
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
          setDailyTasks(dailyTasks.map(task => (task.id === id ? { id, task: editingTask } : task)));
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
    // Implement task check logic here (e.g., mark as completed)
  };

  return (
    <div className="container p-5 col mx-4 d-flex flex-column" style={{ border: "1px solid black", width: "auto", height: "30rem", position: "relative" }}>
      <h5 className="mb-4">My Daily Tasks</h5>
      <div className="task-list flex-grow-1" style={{ height: "100%", overflowY: "auto", marginBottom: "1rem", WebkitOverflowScrolling: "touch" }}>
        <ul className="list-group" style={{ padding: "0", margin: "0" }}>
          {dailyTasks.map(({ id, task }) => (
            <li key={id} className="list-group-item d-flex justify-content-between align-items-center" style={{ padding: "0.5rem", border: "1px solid #ddd", borderRadius: "0.25rem", width: "18rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              <button className="btn btn-outline-success btn-sm mr-2" onClick={() => handleCheckTask(id)}>
                ✓
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
                  style={{ flex: "1", cursor: "pointer", margin: "0px 7px" }}
                  onClick={() => setPopupTask(task)}
                >
                  {task}
                </span>
              )}
              {editingIndex !== id && (
                <>
                  <button className="btn btn-outline-secondary btn-sm mr-2" onClick={() => handleEditTask(id, task)}>
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteTask(id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-group d-flex align-items-center" style={{ position: "absolute", bottom: "10px", width: "18.5rem" }}>
        <input type="text" name="text" value={dailyTask} onChange={(e) => setDailyTask(e.target.value)} placeholder="Write your daily task" className="form-control" style={{ flex: "1" }} />
        <button className="btn btn-outline-primary" onClick={handleAddDailyTask} style={{ marginLeft: "10px" }}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
      {popupTask && (
        <div className="popup" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "1rem", border: "1px solid #ddd", borderRadius: "0.25rem" }}>
          <p>{popupTask}</p>
          <button className="btn btn-outline-secondary" onClick={() => setPopupTask(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default DailyTasks;

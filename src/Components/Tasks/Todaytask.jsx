import React, { useState, useEffect } from "react";
import { db } from "../Firesebase/Firebase";
import { ref, set, get, push, remove } from "firebase/database";

function TodayTasks() {
  const [todayTask, setTodayTask] = useState("");
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const todayTasksRef = ref(db, "todayTasks");
        const snapshot = await get(todayTasksRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setTodayTasks(Object.entries(data).map(([key, task]) => ({ key, task: task.task, timestamp: task.timestamp })));
        } else {
          console.log("No today's tasks available");
        }
      } catch (error) {
        console.error("Error fetching today's tasks", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      todayTasks.forEach(({ key, timestamp }) => {
        if (now - timestamp > 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
          const taskRef = ref(db, `todayTasks/${key}`);
          remove(taskRef).then(() => {
            setTodayTasks(prevTasks => prevTasks.filter(task => task.key !== key));
          }).catch(error => console.error("Error removing task", error));
        }
      });
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, [todayTasks]);

  const handleAddTodayTask = () => {
    const todayTasksRef = ref(db, "todayTasks");
    const newTaskRef = push(todayTasksRef); // Use push to generate a unique key
    const timestamp = Date.now();
    set(newTaskRef, { task: todayTask, timestamp })
      .then(() => {
        setTodayTasks([...todayTasks, { key: newTaskRef.key, task: todayTask, timestamp }]);
        setTodayTask("");
        console.log("Today's task added successfully");
        alert("Task added to your Today Tasks");
      })
      .catch((error) => {
        console.error("Error adding today's task", error);
      });
  };

  return (
    <div className="container p-5 col mx-4 d-flex flex-column" style={{ border: "1px solid black", width: "24rem", height: "30rem", position: "relative" }}>
      <h5 className="mb-4">Today's Tasks</h5>
      <div className="task-list flex-grow-1" style={{ height: "100%", overflowY: "auto", marginBottom: "1rem", WebkitOverflowScrolling: "touch" }}>
        <ul className="list-group" style={{ padding: "0", margin: "0" }}>
          {todayTasks.map((task, index) => (
            <li key={index} className="list-group-item" style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "1rem", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "0.25rem" }}>
              {task.task}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-group d-flex align-items-center" style={{ position: "absolute", bottom: "10px", width: "18.5rem  " }}>
        <input type="text" name="text" value={todayTask} onChange={(e) => setTodayTask(e.target.value)} placeholder="Write your daily task" className="form-control" style={{ flex: "1" }} />
        <button className="btn btn-outline-primary" onClick={handleAddTodayTask} style={{ marginLeft: "10px" }}>
          <i className="fa fa-plus"></i> 
        </button>
      </div>
    </div>
  );
}

export default TodayTasks;

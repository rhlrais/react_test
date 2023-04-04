import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Dashboard = () => {
  let navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(-1);
  const [taskText, setTaskText] = useState("");
  const [taskEdittext, setTaskEditText] = useState("");

  const addTask = () => {
    if (taskText) {
      const _tasks = [...tasks];
      _tasks.push(taskText);
      setTasks(_tasks);
      setTaskText("");
    }
  };

  const editTask = (index) => {
    const _tasks = [...tasks];
    _tasks[index] = taskEdittext;
    setTasks(_tasks);
    setTaskToEditIndex(index);
    setTaskText("");
  };

  const updateTask = (index) => {
    const _tasks = [...tasks];
    _tasks[index] = taskEdittext;
    setTasks(_tasks);
    setTaskToEditIndex(-1);
    setTaskText("");
  };

  const deleteTask = (index) => {
    const _tasks = [...tasks];
    _tasks.splice(index, 1);
    setTasks(_tasks);
  };

  const renderList = () => {
    return tasks?.map((task, index) => (
      <div style={{ display: "inline-block" }}>
        {index != taskToEditIndex ? (
          <p>{task}</p>
        ) : (
          <div>
            <input
              type="text"
              name="task"
              style={{ marginTop: "30px" }}
              required
              // value={taskEdittext}
              onChange={(e) => setTaskEditText(e.target.value)}
            />
          </div>
        )}
        {index != taskToEditIndex ? (
          <button onClick={() => editTask(index)}>Edit</button>
        ) : (
          <button onClick={() => updateTask(index)}>Edit</button>
        )}
        <button onClick={() => deleteTask(index)}>Delete</button>
      </div>
    ));
  };

  return (
    <div clahssName="App-header">
      <h3>My Dashboard</h3>

      <input
        type="text"
        name="task"
        required
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />

      <button onClick={addTask}>add new task</button>

      <div style={{ display: "grid" }}>{renderList()}</div>
    </div>
  );
};
export default Dashboard;

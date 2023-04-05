import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../../component/button";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEditIndex, setTaskToEditIndex] = useState(-1);
  const [taskText, setTaskText] = useState("");
  const [taskEdittext, setTaskEditText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("isUserLoggedIn"))) {
      navigate("/");
    }
  }, []);
  const addTask = () => {
    try {
      if (taskText) {
        const _tasks = [...tasks];
        _tasks.push(taskText);
        setTasks(_tasks);
        setTaskText("");
      } else {
        alert("Please enter some task");
      }
    } catch (error) {
      console.log(error);
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
    return (
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task, index) => (
            <tr key={index}>
              <td>
                {index !== taskToEditIndex ? (
                  task
                ) : (
                  <input
                    type="text"
                    name="task"
                    style={{ marginTop: "30px" }}
                    required
                    onChange={(e) => setTaskEditText(e.target.value)}
                  />
                )}
              </td>
              <td
                style={{ paddingTop: index !== taskToEditIndex ? 0 : "24px" }}
              >
                {index !== taskToEditIndex ? (
                  <button onClick={() => editTask(index)}>Edit</button>
                ) : (
                  <button onClick={() => updateTask(index)}>Update</button>
                )}
                <button onClick={() => deleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div clahssName="App">
      <h3>My Dashboard</h3>

      <CustomButton
        style={{ position: "absolute", right: "20px", top: "20px" }}
        onClick={() => {
          localStorage.setItem("isUserLoggedIn", false);
          navigate("/");
        }}
        title={"Logout"}
      ></CustomButton>

      <input
        type="text"
        name="task"
        required
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />

      <CustomButton onClick={addTask} title={"add new task"}></CustomButton>
      {/* <button onClick={addTask}>add new task</button> */}
      {renderList()}
    </div>
  );
};
export default Dashboard;

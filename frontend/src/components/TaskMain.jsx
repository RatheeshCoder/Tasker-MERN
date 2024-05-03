import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskModal from "./TaskModal";
import editImg from "../assets/edit.png";
import deleteImg from "../assets/delete.png";
import addImg from "../assets/add.png";
import { Sidebar } from "./Sidebar";

const TaskMain = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskCategories, setEditTaskCategories] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const initialCheckedTasks = tasks
      .filter((task) => task.completed)
      .map((task) => task._id);
    setCheckedTasks(initialCheckedTasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (taskName, taskCategories) => {
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        name: taskName,
        categories: taskCategories,
      });
      fetchTasks();
      setShowModal(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (taskId, taskName, taskCategories) => {
    setEditTaskId(taskId);
    setEditTaskName(taskName);
    setEditTaskCategories(taskCategories);
    setShowModal(true);
  };

  const editTask = async (newName, newCategories) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${editTaskId}`, {
        name: newName,
        categories: newCategories,
      });
      fetchTasks();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        completed: !completed,
      });
      fetchTasks();
      if (!completed) {
        setCheckedTasks([...checkedTasks, taskId]);
      } else {
        setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = () => {
    let filtered = tasks;
    if (categoryFilter !== "All") {
      filtered = filtered.filter((task) => task.categories === categoryFilter);
    }
    switch (filter) {
      case "done":
        return filtered.filter((task) => task.completed);
      case "notDone":
        return filtered.filter((task) => !task.completed);
      default:
        const incompleteTasks = filtered.filter((task) => !task.completed);
        const completedTasks = filtered.filter((task) => task.completed);
        return [...incompleteTasks, ...completedTasks];
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Home":
        return "red";
      case "School":
        return "green";
      case "Training":
        return "gray";
      case "Other":
        return "blue";
      default:
        return "black"; 
    }
  };

  return (
    <section className="main-page">
      <Sidebar
        handleFilter={setFilter}
        handleCategoryFilter={setCategoryFilter}
      />
      <section className="Task-main">
        <div className="title">
          <h1>All Your Tasks</h1>
        </div>

        <div className="nav">
          <div className="content">Tasks List</div>
          <div className="filter">
            <button onClick={() => setFilter("All")}>All</button>
            <button onClick={() => setFilter("done")}>Done</button>
            <button onClick={() => setFilter("notDone")}>Not Done</button>
          </div>
        </div>

        <div className="task-manager">
          <div className="task-list">
            <ul>
              {filteredTasks().map((task) => (
                <li
                  key={task._id}
                  className={checkedTasks.includes(task._id) ? "checked" : ""}
                >
                  <div className="checkbox">
                    <div className="round">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleCheckboxChange(task._id, task.completed)
                        }
                      />
                    </div>
                  </div>

                  <div className="task-content">
                    <h1>{task.name}</h1>
                    <h2>
                      <span
                        style={{
                          backgroundColor: getCategoryColor(task.categories),
                        }}
                      ></span>
                      {task.categories}
                    </h2>
                  </div>
                  <div className="action-btn">
                    <button
                      onClick={() =>
                        handleEditTask(task._id, task.name, task.categories)
                      }
                    >
                      <img src={editImg} alt="edit" />
                    </button>

                    <button onClick={() => handleDeleteTask(task._id)}>
                      <img src={deleteImg} alt="delete" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="add-task">
            <button onClick={() => setShowModal(true)}>
              <img src={addImg} alt="add" /> Add Task
            </button>
          </div>
        </div>

        {showModal && (
          <TaskModal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            onSave={editTaskId ? editTask : handleAddTask}
            taskName={editTaskId ? editTaskName : ""}
            taskCategories={editTaskId ? editTaskCategories : ""}
          />
        )}
      </section>
    </section>
  );
};

export default TaskMain;

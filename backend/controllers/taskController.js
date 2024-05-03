// controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const task = new Task({
    name: req.body.name,
    categories: req.body.categories,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task properties if provided in the request body
    if (req.body.name) {
      task.name = req.body.name;
    }
    if (req.body.categories) {
      task.categories = req.body.categories;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Delete a task
exports.deleteTask =  async (req, res) => {
    try {
      const { id } = req.params;
      await Task.deleteOne({ _id: id });
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
  };


// controllers/taskController.js

// Update a task (including completion status)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task properties if provided in the request body
    if (req.body.name) {
      task.name = req.body.name;
    }
    if (req.body.categories) {
      task.categories = req.body.categories;
    }
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


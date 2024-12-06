require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose'); // Correct import for mongoose

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/tasksRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.log('Error connecting to the database:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', taskRoutes); 

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
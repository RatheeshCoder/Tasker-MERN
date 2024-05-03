require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const taskRoutes = require('./routes/tasksRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

//new users
app.use('/api/users', userRoutes);


//login users
app.use('/api/users', userRoutes);

app.use('/api', taskRoutes);




// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Task } from './models/task.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbUrl = 'mongodb://localhost:27017/task2do';
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.post('/add', (req, res) => {
  const { title, description, dueDate } = req.body;
  Task.create({ title, description, dueDate })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json(err));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;
  Task.findByIdAndUpdate(id, { title, description, dueDate, completed }, { new: true })
    .then(updatedTask => res.json(updatedTask))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  Task.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

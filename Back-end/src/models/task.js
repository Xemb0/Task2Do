
// ./models/task.js

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

export { Task };

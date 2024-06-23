const mongoose = require('mongoose');

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
  },
  catagory:{
    type: String,
    trim: true
  },
  tag: {
      type: String,
      trim: true
  }
});


module.exports = mongoose.model('Task', taskSchema);

import React, { useState } from 'react';
import './TaskModal.css';

const TaskModal = ({ showModal, closeModal, addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    const newTask = {
      title: taskName,
      description: taskDescription,
      dueDate: dueDate,
      id: Date.now(), // Generate a unique ID for the task
    };
    addTask(newTask);
    setTaskName('');
    setTaskDescription('');
    setDueDate('');
    closeModal();
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

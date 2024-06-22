import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import TaskIcon from '@mui/icons-material/Assignment';
import PlanningIcon from '@mui/icons-material/CalendarToday';
import GlobalIcon from '@mui/icons-material/Language';
import AnalyticsIcon from '@mui/icons-material/Assessment';
import FinanceIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import TaskModal from './TaskModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
  const [showNames, setShowNames] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState({ today: [], week: [], monthYear: [] });
  const [taskCategory, setTaskCategory] = useState('');

  const toggleNames = () => {
    setShowNames(!showNames);
  };

  const handleAddTask = (category) => {
    setTaskCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskCategory]: [...prevTasks[taskCategory], newTask],
    }));
  };

  const deleteTask = (category, taskId) => {
    const updatedTasks = tasks[category].filter((task) => task.id !== taskId);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: updatedTasks,
    }));
  };

  const editTask = (category, updatedTask) => {
    const updatedTasks = tasks[category].map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: updatedTasks,
    }));
  };

  return (
    <div className="home">
      <div className={`sidebar ${!showNames ? 'hide-names' : ''}`}>
        <nav>
          <div className="sidebar-title">
            <button className="toggle-button" onClick={toggleNames}>
              ☰
            </button>
            {showNames && <h2>Task Manager</h2>}
          </div>
          <ul>
            <li>
              <Link to="/dashboard">
                <DashboardIcon className="sidebar-icon" />
                {showNames && 'Dashboard'}
              </Link>
            </li>
            <li>
              <Link to="/message">
                <MessageIcon className="sidebar-icon" />
                {showNames && 'Message'}
              </Link>
            </li>
            <li>
              <Link to="/tasks">
                <TaskIcon className="sidebar-icon" />
                {showNames && 'Tasks'}
              </Link>
            </li>
            <li>
              <Link to="/planning">
                <PlanningIcon className="sidebar-icon" />
                {showNames && 'Planning'}
              </Link>
            </li>
            <li>
              <Link to="/global">
                <GlobalIcon className="sidebar-icon" />
                {showNames && 'Global'}
              </Link>
            </li>
            <li>
              <Link to="/analytics">
                <AnalyticsIcon className="sidebar-icon" />
                {showNames && 'Analytics'}
              </Link>
            </li>
            <li>
              <Link to="/finance">
                <FinanceIcon className="sidebar-icon" />
                {showNames && 'Finance'}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user-icon">
          <PersonIcon className="img" />
        </div>
      </div>
      <div className="main">
        <div className="title-bar">
          <h2>Task-2Do</h2>
          <div className="user-panel">
            <SettingsIcon className="user-icon" />
            <LogoutIcon className="user-icon" />
          </div>
        </div>
        <div className="task-columns">
          <div className="task-column today">
            <div className="add-task-button" onClick={() => handleAddTask('today')}>
              <AddIcon className="add-icon" />
              <span>Add Task</span>
            </div>
            <h3>Today</h3>
            <div className="tasks">
              {tasks.today.map((task) => (
                <div className="task-item" key={task.id}>
                  <div className="task-title">{task.title}</div>
                  <div className="task-actions">
                    <EditIcon className="task-action-icon" onClick={() => handleEditTask('today', task)} />
                    <DeleteIcon className="task-action-icon" onClick={() => deleteTask('today', task.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="task-column this-week">
            <div className="add-task-button" onClick={() => handleAddTask('week')}>
              <AddIcon className="add-icon" />
              <span>Add Task</span>
            </div>
            <h3>This Week</h3>
            <div className="tasks">
              {tasks.week.map((task) => (
                <div className="task-item" key={task.id}>
                  <div className="task-title">{task.title}</div>
                  <div className="task-actions">
                    <EditIcon className="task-action-icon" onClick={() => handleEditTask('week', task)} />
                    <DeleteIcon className="task-action-icon" onClick={() => deleteTask('week', task.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="task-column this-month-year">
            <div className="add-task-button" onClick={() => handleAddTask('monthYear')}>
              <AddIcon className="add-icon" />
              <span>Add Task</span>
            </div>
            <h3>This Month and This Year</h3>
            <div className="tasks">
              {tasks.monthYear.map((task) => (
                <div className="task-item" key={task.id}>
                  <div className="task-title">{task.title}</div>
                  <div className="task-actions">
                    <EditIcon className="task-action-icon" onClick={() => handleEditTask('monthYear', task)} />
                    <DeleteIcon className="task-action-icon" onClick={() => deleteTask('monthYear', task.id)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TaskModal showModal={showModal} closeModal={closeModal} addTask={addTask} editTask={editTask} />
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

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
    axios.post('http://localhost:3001/add', newTask)
      .then(response => {
        const savedTask = response.data;
        setTasks((prevTasks) => ({
          ...prevTasks,
          [taskCategory]: [...prevTasks[taskCategory], savedTask],
        }));
        setShowModal(false);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (category, taskId) => {
    axios.delete(`http://localhost:3001/delete/${taskId}`)
      .then(() => {
        const updatedTasks = tasks[category].filter((task) => task.id !== taskId);
        setTasks((prevTasks) => ({
          ...prevTasks,
          [category]: updatedTasks,
        }));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const editTask = (category, updatedTask) => {
    axios.put(`http://localhost:3001/edit/${updatedTask.id}`, updatedTask)
      .then(response => {
        const updatedTasks = tasks[category].map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks((prevTasks) => ({
          ...prevTasks,
          [category]: updatedTasks,
        }));
      })
      .catch(error => console.error('Error editing task:', error));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        const tasks = response.data;
        const today = tasks.filter(task => isToday(task.dueDate));
        const week = tasks.filter(task => isThisWeek(task.dueDate));
        const monthYear = tasks.filter(task => isThisMonthOrYear(task.dueDate));
        setTasks({ today, week, monthYear });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const isToday = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate.toDateString() === today.toDateString();
  };

  const isThisWeek = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() - today.getDay() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  };

  const isThisMonthOrYear = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
    return (taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear()) || taskDate.getFullYear() === today.getFullYear();
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
            <LogoutIcon className="user-icon" to="/login" />
          </div>
        </div>
        <div className="task-columns">
          <div className="task-column">
            <h3>Today</h3>
            <button className="add-task-button" onClick={() => handleAddTask('today')}>
              <AddIcon />
            </button>
            {tasks.today.map(task => (
              <div className="task" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button onClick={() => editTask('today', task)}><EditIcon /></button>
                <button onClick={() => deleteTask('today', task.id)}><DeleteIcon /></button>
              </div>
            ))}
          </div>
          <div className="task-column">
            <h3>This Week</h3>
            <button className="add-task-button" onClick={() => handleAddTask('week')}>
              <AddIcon />
            </button>
            {tasks.week.map(task => (
              <div className="task" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button onClick={() => editTask('week', task)}><EditIcon /></button>
                <button onClick={() => deleteTask('week', task.id)}><DeleteIcon /></button>
              </div>
            ))}
          </div>
          <div className="task-column">
            <h3>This Month and This Year</h3>
            <button className="add-task-button" onClick={() => handleAddTask('monthYear')}>
              <AddIcon />
            </button>
            {tasks.monthYear.map(task => (
              <div className="task" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <button onClick={() => editTask('monthYear', task)}><EditIcon /></button>
                <button onClick={() => deleteTask('monthYear', task.id)}><DeleteIcon /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <TaskModal onClose={closeModal} onSave={addTask} />}
    </div>
  );
};

export default Home;

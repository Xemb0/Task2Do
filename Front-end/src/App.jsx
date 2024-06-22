import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import About from './About';
import Login from './Login';
import Dashboard from './components/DashBoard';
import Message from './components/Massage';
import Tasks from './components/Task';
import Planning from './components/Planning';
import Global from './components/Global';
import Analytics from './components/Analytics';
import Finance from './components/Finance';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/message', element: <Message /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/planning', element: <Planning /> },
  { path: '/global', element: <Global /> },
  { path: '/analytics', element: <Analytics /> },
  { path: '/finance', element: <Finance /> },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

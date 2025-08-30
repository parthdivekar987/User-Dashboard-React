import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUsers = async () => {
        try {
          setLoading(true);
          const response = await fetch("https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUsers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading users...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>User Management Dashboard</h1>
        <nav>
        
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/users" 
            className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}
          >
            User List
          </NavLink>
          <NavLink to="/users/new" className="button-primary">Add User +</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard users={users} />} />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/new" element={<CreateUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
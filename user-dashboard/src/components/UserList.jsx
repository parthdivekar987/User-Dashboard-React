import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import placeholderAvatar from '../assets/placeholder-avatar.png';
import gauravAvatar from '../assets/placeholder-avatar1.png';

const UserDetailModal = ({ user, onClose }) => {
  if (!user) {
    return null;
  }

  const avatarSrc = user.name.toLowerCase() === 'gaurav' ? gauravAvatar : (user.avatar || placeholderAvatar);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Details</h2>
        <img src={avatarSrc} alt={`${user.name}'s avatar`} className="modal-avatar" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const UserList = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredAndSortedUsers = useMemo(() => {
    let sortableUsers = [...users];

    if (searchTerm) {
      sortableUsers = sortableUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    sortableUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortableUsers;
  }, [users, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredAndSortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

  return (
    <section className="user-list">
      <div className="controls-header">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Link to="/users/new" className="button-primary">
          Add User +
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
              <th>Email</th>
              <th onClick={() => handleSort('createdAt')}>
                Joined Date {sortConfig.key === 'createdAt' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <tr key={user.id} onClick={() => handleRowClick(user)}>
                  <td>
                    <img 
                      src={user.name.toLowerCase() === 'gaurav' ? gauravAvatar : (user.avatar || placeholderAvatar)} 
                      alt={`${user.name}'s avatar`} 
                      className="avatar-preview" 
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
    </section>
  );
};

export default UserList;


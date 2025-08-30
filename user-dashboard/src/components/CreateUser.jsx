import React from 'react';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  return (
    <div className="create-user-container">
      <h2>Create a New User</h2>
      <p>This is where the form to add a new user will go.</p>
      <Link to="/users" className="button-secondary">Back to User List</Link>
    </div>
  );
};

export default CreateUser;

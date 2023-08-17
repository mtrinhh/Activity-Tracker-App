import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
      username: username
    };

    console.log(user);

    try {
      const existingUsers = await axios.get('/api/users');
      const isUserExists = existingUsers.data.some(u => u.username === user.username);

      if (isUserExists) {
        setMessage('User already exists!')
        console.log('User already exists!')
      } else {
        const res = await axios.post('/api/users/add', user);
        console.log(res.data);
        setMessage('User added!');
        console.log('User added!');
        setUsername('');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h3>Create New User</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
